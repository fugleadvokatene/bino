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
	}
}

// ---- Patient

func (in GetCurrentPatientsForHomeRow) ToModel() model.Patient {
	return model.Patient{
		ID:                    in.ID,
		Status:                in.Status,
		Name:                  in.Name,
		Species:               in.SpeciesName,
		TimeCheckin:           in.TimeCheckin.Time,
		TimeCheckout:          in.TimeCheckout.Time,
		SuggestedJournalURL:   in.SuggestedJournalUrl.String,
		SuggestedJournalTitle: in.SuggestedJournalTitle.String,
		CurrentHomeID:         in.CurrHomeID.Int32,
		HasCurrentHome:        in.CurrHomeID.Valid,
		JournalPending:        in.JournalPending,
	}
}

func (in GetFormerPatientsRow) ToModel() model.Patient {
	return model.Patient{
		ID:                    in.ID,
		Status:                in.Status,
		Name:                  in.Name,
		Species:               in.Species,
		TimeCheckin:           in.TimeCheckin.Time,
		TimeCheckout:          in.TimeCheckout.Time,
		SuggestedJournalURL:   in.SuggestedJournalUrl.String,
		SuggestedJournalTitle: in.SuggestedJournalTitle.String,
		CurrentHomeID:         in.CurrHomeID.Int32,
		HasCurrentHome:        in.CurrHomeID.Valid,
		JournalPending:        in.JournalPending,
	}
}

func (in GetPatientWithSpeciesRow) ToModel() model.Patient {
	return model.Patient{
		ID:                    in.ID,
		Status:                in.Status,
		Name:                  in.Name,
		Species:               in.SpeciesName,
		JournalURL:            in.JournalUrl.String,
		TimeCheckin:           in.TimeCheckin.Time,
		TimeCheckout:          in.TimeCheckout.Time,
		SuggestedJournalURL:   in.SuggestedJournalUrl.String,
		SuggestedJournalTitle: in.SuggestedJournalTitle.String,
		CurrentHomeID:         in.CurrHomeID.Int32,
		HasCurrentHome:        in.CurrHomeID.Valid,
		JournalPending:        in.JournalPending,
	}
}

func (in GetActivePatientsRow) ToModel() model.Patient {
	return model.Patient{
		ID:                    in.ID,
		Species:               in.Species,
		Name:                  in.Name,
		Status:                in.Status,
		JournalURL:            in.JournalUrl.String,
		TimeCheckin:           in.TimeCheckin.Time,
		TimeCheckout:          in.TimeCheckout.Time,
		SuggestedJournalURL:   in.SuggestedJournalUrl.String,
		SuggestedJournalTitle: in.SuggestedJournalTitle.String,
		CurrentHomeID:         in.CurrHomeID.Int32,
		HasCurrentHome:        in.CurrHomeID.Valid,
		JournalPending:        in.JournalPending,
	}
}

// ---- User

func (user GetAppusersRow) ToModel() model.User {
	return model.User{
		ID:           user.ID,
		Name:         user.DisplayName,
		Email:        user.Email,
		AvatarURL:    user.AvatarUrl.String,
		HasAvatarURL: user.AvatarUrl.Valid,
		AccessLevel:  model.AccessLevel(user.AccessLevel),
	}
}

func (user Appuser) ToModel() model.User {
	return model.User{
		ID:           user.ID,
		Name:         user.DisplayName,
		Email:        user.Email,
		AvatarURL:    user.AvatarUrl.String,
		HasAvatarURL: user.AvatarUrl.Valid,
		AccessLevel:  model.AccessLevel(user.AccessLevel),
	}
}

func (user GetUserRow) ToModel() model.User {
	return model.User{
		ID:           user.ID,
		Name:         user.DisplayName,
		Email:        user.Email,
		AvatarURL:    user.AvatarUrl.String,
		HasAvatarURL: user.AvatarUrl.Valid,
		AccessLevel:  model.AccessLevel(user.AccessLevel),
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
		URL:           in.AssociatedUrl.String,
		Type:          model.MatchType(in.Ns),
		HeaderRuns:    headerRuns,
		BodyFragments: model.SplitFragments(bodyRuns),
		ExtraData:     in.ExtraData.String,
		Rank:          in.Rank,
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
		URL:           in.AssociatedUrl.String,
		Type:          model.MatchType(in.Ns),
		HeaderRuns:    headerRuns,
		BodyFragments: model.SplitFragments(bodyRuns),
		ExtraData:     in.ExtraData.String,
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
		Creator:              in.Creator,
		Accessibility:        model.FileAccessibility(in.Accessibility),
		Created:              in.Created.Time,
		UUID:                 in.Uuid,
		OriginalFilename:     in.Filename,
		PresentationFilename: in.PresentationFilename,
		MIMEType:             in.Mimetype,
		Size:                 in.Size,
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
		Title:   fmt.Sprintf("%s: %s", gefcr.PatientName, language.FormatEvent(gefcr.EventID, gefcr.AssociatedID)),
		URL:     model.PatientURL(gefcr.PatientID),
		Display: "list-item",
	}
}

// ---- File Wiki association

func (in *GetFileWikiAssociationsAccessibleByUserRow) ToModel() model.FileWikiAssociation {
	return model.FileWikiAssociation{
		FileID:    in.FileID,
		WikiID:    in.WikiID,
		WikiTitle: in.Title,
	}
}

// ---- File Patient association

func (in *GetFilePatientAssociationsAccessibleByUserRow) ToModel() model.FilePatientAssociation {
	return model.FilePatientAssociation{
		FileID:      in.FileID,
		PatientID:   in.PatientID,
		PatientName: in.Name,
	}
}

// --- File variant

func (in *ImageVariant) ToModel() model.ImageVariant {
	return model.ImageVariant{
		FileID:    in.FileID,
		VariantID: model.FileVariantID(in.Variant),
		Filename:  in.Filename,
		Mimetype:  in.Mimetype,
		Size:      in.Size,
		Width:     in.Width,
		Height:    in.Height,
	}
}
