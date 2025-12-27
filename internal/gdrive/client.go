package gdrive

import (
	"context"
	"errors"
	"fmt"
	"regexp"
	"strings"
	"time"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/gdrive/document"
	"github.com/fugleadvokatene/bino/internal/generic"
	"google.golang.org/api/docs/v1"
	"google.golang.org/api/drive/v3"
	"google.golang.org/api/option"
)

var (
	ReImages = regexp.MustCompile(`<data:image/[a-zA-Z]+;base64,[^>]+>`)
	ReUnbold = regexp.MustCompile(`\*\*(.*?)\*\*`)
)

const (
	updatesSectionHeader = "Bino"
)

type Client struct {
	Drive     *drive.Service
	Docs      *docs.Service
	DB        *db.Database
	DriveBase string
}

func NewClient(ctx context.Context, config Config, db *db.Database) (*Client, error) {
	drive, err := drive.NewService(ctx, option.WithCredentialsFile(config.ServiceAccountKeyLocation))
	if err != nil {
		return nil, fmt.Errorf("creating Drive service: %w", err)
	}

	docs, err := docs.NewService(ctx, option.WithCredentialsFile(config.ServiceAccountKeyLocation))
	if err != nil {
		return nil, fmt.Errorf("creating Docs service: %w", err)
	}

	return &Client{
		Drive:     drive,
		Docs:      docs,
		DB:        db,
		DriveBase: config.DriveBase,
	}, nil
}

func UserCanShare(ctx context.Context, item Item, email string) bool {
	for _, p := range item.Permissions {
		if p.Email == email {
			return p.CanWrite()
		}
	}

	return false
}

func GDriveItemFromFile(f *drive.File, p *drive.PermissionList) Item {
	if f == nil {
		return Item{}
	}
	var permissions []Permission
	if p != nil {
		permissions = generic.SliceToSlice(p.Permissions, func(p *drive.Permission) Permission {
			return Permission{
				DisplayName: p.DisplayName,
				Email:       p.EmailAddress,
				Role:        p.Role,
			}
		})
	}

	modifiedTime, _ := time.Parse(time.RFC3339, f.ModifiedTime)
	createdTime, _ := time.Parse(time.RFC3339, f.CreatedTime)

	return Item{
		ID:           f.Id,
		Name:         f.Name,
		Valid:        true,
		Permissions:  permissions,
		ModifiedTime: modifiedTime,
		CreatedTime:  createdTime,
		Trashed:      f.Trashed,
	}
}

func (g *Client) fileToItem(file *drive.File) (Item, error) {
	call := g.Drive.Permissions.List(file.Id).Fields("permissions(displayName, emailAddress, role)")

	if g.DriveBase != "" {
		call = call.
			SupportsAllDrives(true)
	}

	pl, err := call.Do()
	if err != nil {
		return Item{}, err
	}
	item := GDriveItemFromFile(file, pl)

	return item, nil
}

func (g *Client) GetFile(id string) (Item, error) {
	call := g.Drive.Files.Get(id).
		Fields("id, name, capabilities")

	if g.DriveBase != "" {
		call = call.
			SupportsAllDrives(true)
	}

	f, err := call.Do()
	if err != nil {
		return Item{}, err
	}

	return g.fileToItem(f)
}

func (g *Client) GetDocument(id string) (document.Document, error) {
	call := g.Docs.Documents.Get(id).
		SuggestionsViewMode("PREVIEW_WITHOUT_SUGGESTIONS").
		IncludeTabsContent(true)

	doc, err := call.Do()
	if err != nil {
		return document.Document{}, err
	}

	return document.New(doc)
}

func (g *Client) CreateDocument(conf ConfigInfo, vars TemplateVars) (Item, error) {
	copyCall := g.Drive.Files.Copy(conf.TemplateItem.ID, &drive.File{
		Name:    vars.ApplyToString(conf.TemplateItem.Name),
		Parents: []string{conf.JournalFolder.ID},
	})

	if g.DriveBase != "" {
		copyCall = copyCall.
			SupportsAllDrives(true)
	}

	f, err := copyCall.Do()
	if err != nil {
		return Item{}, fmt.Errorf("creating copy: %w", err)
	}

	updateCall := g.Docs.Documents.BatchUpdate(f.Id, vars.ReplaceRequests())
	_, err = updateCall.Do()
	if err != nil {
		deleteCall := g.Drive.Files.Delete(f.Id)

		if g.DriveBase != "" {
			deleteCall = deleteCall.
				SupportsAllDrives(true)
		}

		deleteErr := deleteCall.Do()
		if deleteErr != nil {
			return Item{}, errors.Join(err, deleteErr)
		}

		return Item{}, err
	}

	return g.fileToItem(f)
}

func (g *Client) AppendUpdates(id string, updates []JournalUpdate) error {
	insertedText := strings.Join(generic.SliceToSlice(updates, func(in JournalUpdate) string {
		return fmt.Sprintf("%s: %s", in.Timestamp.Format(time.DateOnly), in.Text)
	}), "\n")

	// Get it
	getCall := g.Docs.Documents.Get(id)
	doc, err := getCall.Do()
	if err != nil {
		return fmt.Errorf("reading doc: %w", err)
	}

	// Get the body contents
	var body *docs.Body
	if len(doc.Tabs) > 0 {
		body = doc.Tabs[0].DocumentTab.Body
	} else {
		body = doc.Body
	}
	appendIndex := findAppendIndex(body.Content)

	// Apply update
	updateCall := g.Docs.Documents.BatchUpdate(id, &docs.BatchUpdateDocumentRequest{
		Requests: []*docs.Request{
			{
				InsertText: &docs.InsertTextRequest{
					Location: &docs.Location{
						Index: appendIndex,
					},
					Text: insertedText,
				},
			},
		},
	})
	if _, err := updateCall.Do(); err != nil {
		return fmt.Errorf("updating docuemnt: %w", err)
	}
	return nil
}

func findAppendIndex(doc []*docs.StructuralElement) int64 {
	const (
		stateFindSectionHeader = 0
		stateFindNextHeader    = 1
	)
	state := stateFindSectionHeader
	var finalIndex int64
	for _, elem := range doc {
		finalIndex = elem.EndIndex

		// Skip if not a paragraph
		if elem.Paragraph == nil {
			continue
		}
		paragraph := elem.Paragraph

		// Skip if not a heading
		pStyle := paragraph.ParagraphStyle
		if pStyle == nil || !strings.HasPrefix(pStyle.NamedStyleType, "HEADING") {
			continue
		}

		// Skip if empty
		if len(paragraph.Elements) == 0 {
			continue
		}
		firstElem := paragraph.Elements[0]

		// Skip if not a text run
		if firstElem.TextRun == nil {
			continue
		}

		// Get heading text
		textRun := strings.TrimSpace(firstElem.TextRun.Content)

		switch state {
		case stateFindSectionHeader:
			if textRun == updatesSectionHeader {
				state = stateFindNextHeader
			}
		case stateFindNextHeader:
			return elem.StartIndex - 1
		}
	}
	return finalIndex
}
