package sql

import (
	"encoding/json"
	"fmt"

	"github.com/fugleadvokatene/bino/internal/calendar"
	"github.com/fugleadvokatene/bino/internal/language"
	"github.com/fugleadvokatene/bino/internal/model"
)

// ---- Home

func (h Home) ToModel() model.Home {
	return model.Home{
		ID:       h.ID,
		Capacity: h.Capacity,
		Name:     h.Name,
		Note:     h.Note,
		Division: h.Division,
	}
}

// ---- Patient

func (in GetCurrentPatientsForHomeRow) ToModel() model.Patient {
	return model.Patient{
		ID:     in.ID,
		Status: in.Status,
		Name:   in.Name,
		Species: model.Species{
			ID:   in.SpeciesID,
			Name: in.SpeciesName,
		},
		TimeCheckin:           in.TimeCheckin.Time,
		TimeCheckout:          in.TimeCheckout.Time,
		SuggestedGoogleID:     in.SuggestedGoogleID.String,
		SuggestedJournalTitle: in.SuggestedJournalTitle.String,
		CurrentHomeID:         in.CurrHomeID.Int32,
		HasCurrentHome:        in.CurrHomeID.Valid,
		JournalPending:        in.JournalPending,
	}
}

func (in GetFormerPatientsRow) ToModel() model.Patient {
	return model.Patient{
		ID:     in.ID,
		Status: in.Status,
		Name:   in.Name,
		Species: model.Species{
			Name: in.Species,
		},
		TimeCheckin:           in.TimeCheckin.Time,
		TimeCheckout:          in.TimeCheckout.Time,
		SuggestedGoogleID:     in.SuggestedGoogleID.String,
		SuggestedJournalTitle: in.SuggestedJournalTitle.String,
		CurrentHomeID:         in.CurrHomeID.Int32,
		HasCurrentHome:        in.CurrHomeID.Valid,
		JournalPending:        in.JournalPending,
	}
}

func (in GetPatientWithSpeciesRow) ToModel() model.Patient {
	return model.Patient{
		ID:     in.ID,
		Status: in.Status,
		Name:   in.Name,
		Species: model.Species{
			ID:   in.SpeciesID,
			Name: in.SpeciesName,
		},
		GoogleID:              in.GoogleID.String,
		TimeCheckin:           in.TimeCheckin.Time,
		TimeCheckout:          in.TimeCheckout.Time,
		SuggestedGoogleID:     in.SuggestedGoogleID.String,
		SuggestedJournalTitle: in.SuggestedJournalTitle.String,
		CurrentHomeID:         in.CurrHomeID.Int32,
		HasCurrentHome:        in.CurrHomeID.Valid,
		JournalPending:        in.JournalPending,
	}
}

func (in GetActivePatientsRow) ToModel() model.Patient {
	return model.Patient{
		ID: in.ID,
		Species: model.Species{
			Name: in.Species,
		},
		Name:                  in.Name,
		Status:                in.Status,
		GoogleID:              in.GoogleID.String,
		TimeCheckin:           in.TimeCheckin.Time,
		TimeCheckout:          in.TimeCheckout.Time,
		SuggestedGoogleID:     in.SuggestedGoogleID.String,
		SuggestedJournalTitle: in.SuggestedJournalTitle.String,
		CurrentHomeID:         in.CurrHomeID.Int32,
		HasCurrentHome:        in.CurrHomeID.Valid,
		JournalPending:        in.JournalPending,
	}
}

// ---- Patient event

func (in GetEventsRow) ToModel(lang *language.Language) model.Event {
	return model.Event{
		ID:          in.ID,
		PatientID:   in.PatientID,
		HomeID:      in.HomeID,
		Note:        in.Note,
		EventID:     in.EventID,
		Status:      in.Status,
		AppuserID:   in.AppuserID,
		HomeName:    in.HomeName,
		UserName:    in.UserName,
		PatientName: in.PatientName,
		AvatarUrl:   in.AvatarUrl,
		TimeRel:     lang.FormatTimeRel(in.Time.Time),
		TimeAbs:     lang.FormatTimeAbs(in.Time.Time),
		Time:        in.Time.Time,
		User: model.User{
			ID:           in.AppuserID,
			Name:         in.UserName,
			AvatarURL:    in.AvatarUrl.String,
			HasAvatarURL: in.AvatarUrl.Valid,
			Email:        "",
		},
		Home: model.Home{
			ID:   in.HomeID,
			Name: in.HomeName,
		},
	}
}

// ---- User

func (user Appuser) ToModel() model.User {
	return model.User{
		ID:           user.ID,
		Name:         user.DisplayName,
		Email:        user.Email,
		AvatarURL:    user.AvatarUrl.String,
		HasAvatarURL: user.AvatarUrl.Valid,
		AccessLevel:  model.AccessLevel(user.AccessLevel),
		LanguageID:   user.LanguageID.Int32,
		HomeID:       user.HomeID.Int32,
	}
}

// ---- Invitation

func (inv GetInvitationsRow) ToModel() model.Invitation {
	return model.Invitation{
		ID:          inv.ID,
		Email:       inv.Email.String,
		Expires:     inv.Expires.Time,
		Created:     inv.Created.Time,
		AccessLevel: model.AccessLevel(inv.AccessLevel),
		HomeID:      inv.Home.Int32,
		HomeName:    inv.HomeName.String,
	}
}

// ---- Preferred species

func (in GetPreferredSpeciesForHomeRow) ToModel() model.Species {
	return model.Species{
		ID:        in.SpeciesID,
		Name:      in.Name,
		Preferred: true,
	}
}

func (in GetSpeciesWithLanguageRow) ToModel(preferred bool) model.Species {
	return model.Species{
		ID:        in.SpeciesID,
		Name:      in.Name,
		Preferred: preferred,
	}
}

// ---- Period

func (in HomeUnavailable) ToModel() model.Period {
	return model.Period{
		ID:     in.ID,
		HomeID: in.HomeID,
		From:   model.DateViewFromPGDate(in.FromDate),
		To:     model.DateViewFromPGDate(in.ToDate),
		Note:   in.Note.String,
	}
}

// ---- Match

func (in *SearchBasicRow) ToModel() model.Match {
	headerRuns := model.ParseHeadline(in.HeaderHeadline)
	bodyRuns := model.ParseHeadline(in.BodyHeadline)

	return model.Match{
		GoogleID:         in.GoogleID,
		ParentGoogleID:   in.ParentGoogleID.String,
		ParentGoogleName: in.ParentFolderName.String,
		PatientID:        in.PatientID.Int32,
		HeaderRuns:       headerRuns,
		BodyFragments:    model.SplitFragments(bodyRuns),
		Rank:             in.Rank,
	}
}

func (in *SearchAdvancedRow) ToModel(q string) model.Match {
	headerRuns := model.ParseHeadline(in.HeaderHeadline)
	if !hasHit(headerRuns) {
		headerRuns = model.HighlightFallback(in.Header, q)
	}

	bodyRuns := model.ParseHeadline(in.BodyHeadline)
	if !hasHit(bodyRuns) {
		bodyRuns = model.HighlightFallback(in.Body, q)
	}

	return model.Match{
		GoogleID:      in.GoogleID,
		HeaderRuns:    headerRuns,
		BodyFragments: model.SplitFragments(bodyRuns),
		Rank:          in.Rank,
		RankParts: map[string]float32{
			"FTSBody":     in.RFtsBody,
			"FTSHeader":   in.RFtsHeader,
			"Recency":     in.RRecency,
			"ILIKEBody":   in.RIlikeBody,
			"ILIKEHeader": in.RIlikeHeader,
			"SimBody":     in.RSimBody,
			"SimHeader":   in.RSimHeader,
		},
	}
}

func hasHit(runs []model.HighlightRun) bool {
	for _, r := range runs {
		if r.Hit {
			return true
		}
	}
	return false
}

func ParseJSON[T any](extraData string) *T {
	var out T
	if err := json.Unmarshal([]byte(extraData), &out); err != nil {
		return nil
	}
	return &out
}

// ---- File

func (in *File) ToModel() model.File {
	return model.File{
		ID:                   in.ID,
		Created:              in.Created.Time,
		UUID:                 in.Uuid,
		OriginalFilename:     in.Filename,
		PresentationFilename: in.PresentationFilename,
		MIMEType:             in.Mimetype,
		Size:                 in.Size,
		SHA256:               in.Sha256,
	}
}

// ---- Wiki

func (in *WikiPage) ToModel() model.WikiLink {
	return model.WikiLink{
		WikiID: in.ID,
		Title:  in.Title,
	}
}

func (in *GetWikiMainPageRow) ToModel() model.WikiPage {
	return model.WikiPage{
		ID:      in.ID,
		Title:   in.Title,
		Content: string(in.Content),
	}
}

func (in *GetLastWikiRevisionRow) ToModel() model.WikiPage {
	return model.WikiPage{
		ID:      in.ID,
		Title:   in.Title,
		Content: string(in.Content),
	}
}

func (gupirr GetUnavailablePeriodsInRangeRow) ToModel(language *language.Language) calendar.Event {
	return calendar.Event{
		ID:      fmt.Sprintf("unavailable/%d", gupirr.ID),
		AllDay:  true,
		Start:   gupirr.FromDate.Time.Format(calendar.TimeFormatFullCalendar),
		End:     gupirr.ToDate.Time.Format(calendar.TimeFormatFullCalendar),
		Title:   language.HomeIsUnavailable(gupirr.Name, gupirr.Note.String),
		URL:     string(model.HomeURL(gupirr.HomeID)),
		Display: "block",
	}
}

func (gefcr GetEventsForCalendarRow) ToModel(language *language.Language) calendar.Event {
	t := gefcr.Time.Time.Format(calendar.TimeFormatFullCalendar)
	return calendar.Event{
		ID:      fmt.Sprintf("patientevent/%d", gefcr.ID),
		AllDay:  false,
		Start:   t,
		End:     t,
		Title:   fmt.Sprintf("%s: %s", gefcr.PatientName, language.FormatEvent(gefcr.EventID, gefcr.Status)),
		URL:     model.PatientURL(gefcr.PatientID),
		Display: "list-item",
	}
}

// ---- File Wiki association

func (in *GetFileWikiAssociationsRow) ToModel() model.FileWikiAssociation {
	return model.FileWikiAssociation{
		FileID:    in.FileID,
		WikiID:    in.WikiID,
		WikiTitle: in.Title,
	}
}

// ---- File Patient association

// --- Image variant

func (in *ImageVariant) ToModel() model.ImageVariant {
	return model.ImageVariant{
		FileID:    in.FileID,
		VariantID: model.FileVariantID(in.Variant),
		Filename:  in.Filename,
		Mimetype:  in.Mimetype,
		Size:      in.Size,
		SHA256:    in.Sha256,
		Width:     in.Width,
		Height:    in.Height,
	}
}

// ---- Stats

func (in StatPatientGetCurrentSpeciesDistributionRow) ToModel() model.SpeciesCountRow {
	return model.SpeciesCountRow{
		Species: in.Name,
		Count:   int(in.Count),
	}
}

// ---- Division

func (in Division) ToModel() model.Division {
	return model.Division{
		ID:                  in.ID,
		Name:                in.Name,
		JournalFolderID:     in.JournalFolderID.String,
		JournalFolderName:   in.JournalFolderName.String,
		TemplateJournalID:   in.TemplateJournalID.String,
		TemplateJournalName: in.TemplateJournalName.String,
	}
}
