package main

import (
	"encoding/json"
	"fmt"

	"github.com/fugleadvokatene/bino/internal/enums"
	"github.com/fugleadvokatene/bino/internal/view"
)

func FormID(prefix, field string, id int32) string {
	return fmt.Sprintf("%s%s-%d", prefix, field, id)
}

// ---- Home

func (h Home) ToHomeView() view.Home {
	return view.Home{
		ID:       h.ID,
		Capacity: h.Capacity,
		Name:     h.Name,
		Note:     h.Note,
	}
}

// ---- Patient

func (in GetCurrentPatientsForHomeRow) ToPatientView() view.Patient {
	return view.Patient{
		ID:      in.ID,
		Status:  in.Status,
		Name:    in.Name,
		Species: in.SpeciesName,
	}
}

func (in GetFormerPatientsRow) ToPatientView() view.Patient {
	return view.Patient{
		ID:                    in.ID,
		Status:                in.Status,
		Name:                  in.Name,
		Species:               in.Species,
		TimeCheckin:           in.TimeCheckin.Time,
		TimeCheckout:          in.TimeCheckout.Time,
		SuggestedJournalURL:   in.SuggestedJournalUrl.String,
		SuggestedJournalTitle: in.SuggestedJournalTitle.String,
	}
}

func (in GetPatientWithSpeciesRow) ToPatientView() view.Patient {
	return view.Patient{
		ID:                    in.ID,
		Status:                in.Status,
		Name:                  in.Name,
		Species:               in.SpeciesName,
		JournalURL:            in.JournalUrl.String,
		TimeCheckin:           in.TimeCheckin.Time,
		TimeCheckout:          in.TimeCheckout.Time,
		SuggestedJournalURL:   in.SuggestedJournalUrl.String,
		SuggestedJournalTitle: in.SuggestedJournalTitle.String,
	}
}

func (in GetActivePatientsRow) ToPatientView() view.Patient {
	return view.Patient{
		ID:                    in.ID,
		Species:               in.Species,
		Name:                  in.Name,
		Status:                in.Status,
		JournalURL:            in.JournalUrl.String,
		TimeCheckin:           in.TimeCheckin.Time,
		TimeCheckout:          in.TimeCheckout.Time,
		SuggestedJournalURL:   in.SuggestedJournalUrl.String,
		SuggestedJournalTitle: in.SuggestedJournalTitle.String,
	}
}

// ---- User

func (user GetAppusersRow) ToUserView() view.User {
	return view.User{
		ID:           user.ID,
		Name:         user.DisplayName,
		Email:        user.Email,
		AvatarURL:    user.AvatarUrl.String,
		HasAvatarURL: user.AvatarUrl.Valid,
		AccessLevel:  enums.AccessLevel(user.AccessLevel),
	}
}

func (user Appuser) ToUserView() view.User {
	return view.User{
		ID:           user.ID,
		Name:         user.DisplayName,
		Email:        user.Email,
		AvatarURL:    user.AvatarUrl.String,
		HasAvatarURL: user.AvatarUrl.Valid,
		AccessLevel:  enums.AccessLevel(user.AccessLevel),
	}
}

func (user GetUserRow) ToUserView() view.User {
	return view.User{
		ID:           user.ID,
		Name:         user.DisplayName,
		Email:        user.Email,
		AvatarURL:    user.AvatarUrl.String,
		HasAvatarURL: user.AvatarUrl.Valid,
		AccessLevel:  enums.AccessLevel(user.AccessLevel),
	}
}

// ---- Invitation

func (inv GetInvitationsRow) ToInvitationView() view.Invitation {
	return view.Invitation{
		ID:          inv.ID,
		Email:       inv.Email.String,
		Expires:     inv.Expires.Time,
		Created:     inv.Created.Time,
		AccessLevel: enums.AccessLevel(inv.AccessLevel),
		HomeID:      inv.Home.Int32,
		HomeName:    inv.HomeName.String,
	}
}

// ---- Preferred species

func (in GetPreferredSpeciesForHomeRow) ToSpeciesView() view.Species {
	return view.Species{
		ID:        in.SpeciesID,
		Name:      in.Name,
		Preferred: true,
	}
}

func (in GetSpeciesWithLanguageRow) ToSpeciesView(preferred bool) view.Species {
	return view.Species{
		ID:        in.SpeciesID,
		Name:      in.Name,
		Preferred: preferred,
	}
}

// ---- Period

func (in HomeUnavailable) ToPeriodView() view.Period {
	return view.Period{
		ID:     in.ID,
		HomeID: in.HomeID,
		From:   view.DateViewFromPGDate(in.FromDate),
		To:     view.DateViewFromPGDate(in.ToDate),
		Note:   in.Note.String,
	}
}

// ---- Match

func (in *SearchBasicRow) ToMatchView() view.Match {
	headerRuns := view.ParseHeadline(in.HeaderHeadline)
	bodyRuns := view.ParseHeadline(in.BodyHeadline)

	return view.Match{
		URL:           in.AssociatedUrl.String,
		Type:          enums.MatchType(in.Ns),
		HeaderRuns:    headerRuns,
		BodyFragments: view.SplitFragments(bodyRuns),
		ExtraData:     in.ExtraData.String,
		Rank:          in.Rank,
	}
}

func (in *SearchAdvancedRow) ToMatchView(q string) view.Match {
	headerRuns := view.ParseHeadline(in.HeaderHeadline)
	if !hasHit(headerRuns) {
		headerRuns = view.HighlightFallback(in.Header, q)
	}

	bodyRuns := view.ParseHeadline(in.BodyHeadline)
	if !hasHit(bodyRuns) {
		bodyRuns = view.HighlightFallback(in.Body, q)
	}

	return view.Match{
		URL:           in.AssociatedUrl.String,
		Type:          enums.MatchType(in.Ns),
		HeaderRuns:    headerRuns,
		BodyFragments: view.SplitFragments(bodyRuns),
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

func hasHit(runs []view.HighlightRun) bool {
	for _, r := range runs {
		if r.Hit {
			return true
		}
	}
	return false
}

func parseJSON[T any](extraData string) *T {
	var out T
	if err := json.Unmarshal([]byte(extraData), &out); err != nil {
		return nil
	}
	return &out
}

// ---- File

func (in *File) ToFileView() view.File {
	return view.File{
		ID:                   in.ID,
		Creator:              in.Creator,
		Accessibility:        enums.FileAccessibility(in.Accessibility),
		Created:              in.Created.Time,
		UUID:                 in.Uuid,
		OriginalFilename:     in.Filename,
		PresentationFilename: in.PresentationFilename,
		MIMEType:             in.Mimetype,
		Size:                 in.Size,
	}
}

// ---- Wiki

func (in *WikiPage) ToWikiLinkView() view.WikiLink {
	return view.WikiLink{
		ID:    in.ID,
		Title: in.Title,
	}
}

func (in *GetWikiMainPageRow) ToWikiPageView() view.WikiPage {
	return view.WikiPage{
		ID:      in.ID,
		Title:   in.Title,
		Content: string(in.Content),
	}
}

func (in *GetLastWikiRevisionRow) ToWikiPageView() view.WikiPage {
	return view.WikiPage{
		ID:      in.ID,
		Title:   in.Title,
		Content: string(in.Content),
	}
}
