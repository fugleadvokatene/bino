package gdrive

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log/slog"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/gdrive/document"
	"github.com/fugleadvokatene/bino/internal/generic"
	"google.golang.org/api/docs/v1"
	"google.golang.org/api/drive/v3"
	"google.golang.org/api/option"
)

const (
	updatesSectionHeader = "Bino"
)

type Client struct {
	Drive        *drive.Service
	Docs         *docs.Service
	DB           *db.Database
	DriveBase    string
	debugDir     string // JournalEditDebugDir from config; empty = disabled
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
		debugDir:  config.JournalEditDebugDir,
	}, nil
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

	var parentID string
	if len(f.Parents) > 0 {
		parentID = f.Parents[0]
	}

	return Item{
		ID:           f.Id,
		Name:         f.Name,
		Valid:        true,
		Permissions:  permissions,
		ModifiedTime: modifiedTime,
		CreatedTime:  createdTime,
		Trashed:      f.Trashed,
		ParentID:     parentID,
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
		Fields("id, name, capabilities, parents")

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

func (g *Client) GetDocument(id string) (*docs.Document, error) {
	call := g.Docs.Documents.Get(id).
		SuggestionsViewMode("PREVIEW_WITHOUT_SUGGESTIONS").
		IncludeTabsContent(true)

	return call.Do()
}

func (g *Client) CreateDocument(conf DivisionConfig, vars TemplateVars) (Item, error) {
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

func (g *Client) GetRawDocument(id string) (*docs.Document, error) {
	call := g.Docs.Documents.Get(id).
		SuggestionsViewMode("PREVIEW_WITHOUT_SUGGESTIONS").
		IncludeTabsContent(true)

	return call.Do()
}

func (g *Client) EditJournal(id string, edited *document.GDocsDocument) error {
	live, fetchErr := g.GetRawDocument(id)
	if fetchErr != nil {
		if g.debugDir != "" {
			g.dumpEditAttempt(id, nil, edited, nil, fetchErr)
		}
		return fmt.Errorf("fetching live doc: %w", fetchErr)
	}

	reqs := document.DocumentPatchRequests(live, edited)

	if len(reqs) == 0 {
		if g.debugDir != "" {
			g.dumpEditAttempt(id, live, edited, reqs, nil)
		}
		return nil
	}

	_, batchErr := g.Docs.Documents.BatchUpdate(id, &docs.BatchUpdateDocumentRequest{
		Requests: reqs,
	}).Do()

	if g.debugDir != "" {
		g.dumpEditAttempt(id, live, edited, reqs, batchErr)
	}

	return batchErr
}

// dumpEditAttempt writes debugging artifacts for a single EditJournal attempt
// into a timestamped subdirectory of g.debugDir.
func (g *Client) dumpEditAttempt(id string, live *docs.Document, edited *document.GDocsDocument, reqs []*docs.Request, attemptErr error) {
	ts := time.Now().Format("20060102-150405.000")
	dir := filepath.Join(g.debugDir, fmt.Sprintf("%s-%s", ts, id))
	if err := os.MkdirAll(dir, 0o755); err != nil {
		slog.Warn("EditJournal debug: cannot create dir", "dir", dir, "err", err)
		return
	}

	writeJSON := func(name string, v any) {
		data, err := json.MarshalIndent(v, "", "  ")
		if err != nil {
			slog.Warn("EditJournal debug: marshal failed", "file", name, "err", err)
			return
		}
		if err := os.WriteFile(filepath.Join(dir, name), data, 0o644); err != nil {
			slog.Warn("EditJournal debug: write failed", "file", name, "err", err)
		}
	}

	if live != nil {
		writeJSON("live.json", live)
	}
	if edited != nil {
		writeJSON("edited.json", edited)
	}
	if reqs != nil {
		writeJSON("requests.json", reqs)
	}
	if attemptErr != nil {
		_ = os.WriteFile(filepath.Join(dir, "error.txt"), []byte(attemptErr.Error()), 0o644)
	}

	slog.Info("EditJournal debug dump written", "dir", dir, "requests", len(reqs))
}

func (g *Client) InsertTextAt(id string, index int64, text string) error {
	updateCall := g.Docs.Documents.BatchUpdate(id, &docs.BatchUpdateDocumentRequest{
		Requests: []*docs.Request{
			{
				InsertText: &docs.InsertTextRequest{
					Location: &docs.Location{
						Index: index,
					},
					Text: text,
				},
			},
		},
	})

	_, err := updateCall.Do()
	return err
}
