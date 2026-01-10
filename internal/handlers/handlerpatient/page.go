package handlerpatient

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/gdrive/document"
	"github.com/fugleadvokatene/bino/internal/generic"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
	"github.com/fugleadvokatene/bino/internal/templbase"
)

type page struct {
	DB *db.Database
}

func (h *page) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

	id, err := request.GetPathID(r, "patient")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	patientData, err := h.DB.Q.GetPatientWithSpecies(ctx, sql.GetPatientWithSpeciesParams{
		ID:         id,
		LanguageID: commonData.Lang32(),
	})
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	preferred, nonPreferred, err := h.DB.GetSpeciesForUser(ctx, commonData.User.AppuserID, commonData.Language.ID)
	speciesList := generic.SliceToSlice(
		append(preferred, nonPreferred...),
		func(in model.Species) templbase.Option {
			return templbase.Option{
				Value: fmt.Sprintf("%d", in.ID),
				Label: in.Name,
			}
		},
	)

	commonData.Subtitle = patientData.Name

	homes, err := h.DB.Q.GetHomes(ctx)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	eventData, err := h.DB.Q.GetEventsForPatient(ctx, patientData.ID)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	events := generic.SliceToSlice(eventData, func(r sql.GetEventsForPatientRow) model.Event {
		return model.Event{
			ID:        r.ID,
			PatientID: r.PatientID,
			HomeID:    r.HomeID,
			Note:      r.Note,
			EventID:   r.EventID,
			Status:    r.Status,
			AppuserID: r.AppuserID,
			HomeName:  r.HomeName,
			UserName:  r.UserName,
			AvatarUrl: r.AvatarUrl,
			TimeRel:   commonData.Language.FormatTimeRel(r.Time.Time),
			TimeAbs:   commonData.Language.FormatTimeAbs(r.Time.Time),
			Time:      r.Time.Time,
			User: model.User{
				ID:           r.AppuserID,
				Name:         r.UserName,
				AvatarURL:    r.AvatarUrl.String,
				HasAvatarURL: r.AvatarUrl.Valid,
				Email:        "",
			},
			Home: model.Home{
				ID:   r.HomeID,
				Name: r.HomeName,
			},
		}
	})

	var journal document.Document
	var journalMeta JournalMetadata
	if row, err := h.DB.Q.GetJournalJSON(ctx, patientData.GoogleID.String); err == nil {
		if err := json.Unmarshal(row.Json, &journal); err != nil {
			generic.Clear(&journal)
		}
		journalMeta.Updated = row.Updated.Time
		journalMeta.FolderID = row.ParentGoogleID.String
		journalMeta.FolderName = row.ParentGoogleName.String
	}

	PatientPage(
		ctx,
		commonData,
		patientData.ToModel(),
		model.SliceToModel(homes),
		events,
		speciesList,
		&journal,
		journalMeta,
	).Render(ctx, w)
}

type JournalMetadata struct {
	Updated    time.Time
	FolderID   string
	FolderName string
}
