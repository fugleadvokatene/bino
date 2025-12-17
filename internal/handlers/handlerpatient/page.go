package handlerpatient

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/generic"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
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

	commonData.Subtitle = patientData.Name

	var home *model.Home
	if patientData.CurrHomeID.Valid {
		homeResult, err := h.DB.Q.GetHome(ctx, patientData.CurrHomeID.Int32)
		if err != nil {
			handlererror.Error(w, r, err)
			return
		}
		h := homeResult.ToModel()
		home = &h
	}

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
			ID:           r.ID,
			PatientID:    r.PatientID,
			HomeID:       r.HomeID,
			Note:         r.Note,
			EventID:      r.EventID,
			AssociatedID: r.AssociatedID,
			AppuserID:    r.AppuserID,
			HomeName:     r.HomeName,
			UserName:     r.UserName,
			AvatarUrl:    r.AvatarUrl,
			TimeRel:      commonData.Language.FormatTimeRel(r.Time.Time),
			TimeAbs:      commonData.Language.FormatTimeAbs(r.Time.Time),
			Time:         r.Time.Time,
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

	PatientPage(ctx, commonData, model.PatientPage{
		Patient: patientData.ToModel(),
		Home:    home,
		Homes: generic.SliceToSlice(homes, func(home sql.Home) model.Home {
			return home.ToModel()
		}),
		Events: events,
	}).Render(ctx, w)
}
