package handlerimport

import (
	"context"
	"fmt"
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
)

type post struct {
	DB *db.Database
}

func (h *post) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

	result := ParseForm(r, h.DB)
	if result.OK {
		var patientsRequiringJournal []int32
		_ = h.DB.Transaction(ctx, func(ctx context.Context, db *db.Database) error {
			addPatientParams := sql.AddPatientsParams{}
			for _, patient := range result.Patients {
				addPatientParams.CurrHomeID = append(addPatientParams.CurrHomeID, patient.HomeID)
				addPatientParams.Species = append(addPatientParams.Species, patient.SpeciesID)
				addPatientParams.Status = append(addPatientParams.Status, int32(model.StatusAdmitted))
				addPatientParams.JournalUrl = append(addPatientParams.JournalUrl, patient.URL)
				addPatientParams.Name = append(addPatientParams.Name, patient.Name)

			}

			if ids, err := db.Q.AddPatients(ctx, addPatientParams); err != nil {
				result.Notes = []string{fmt.Sprintf("Error adding patients: %v", err)}
				return err
			} else {
				result.Notes = []string{fmt.Sprintf("Added %d patients", len(ids))}
				addPatientRegisteredEventsParams := sql.AddPatientRegisteredEventsParams{
					EventID:   int32(model.EventIDRegistered),
					AppuserID: commonData.User.AppuserID,
				}
				for i, id := range ids {
					addPatientRegisteredEventsParams.PatientID = append(addPatientRegisteredEventsParams.PatientID, id)
					addPatientRegisteredEventsParams.HomeID = append(addPatientRegisteredEventsParams.HomeID, result.Patients[i].HomeID)
					result.Notes = append(result.Notes, fmt.Sprintf("New patient: %s", model.PatientURL(id)))
					if result.Patients[i].URL == "" {
						patientsRequiringJournal = append(patientsRequiringJournal, id)
					}
				}
				if err := db.Q.AddPatientRegisteredEvents(ctx, addPatientRegisteredEventsParams); err != nil {
					result.Notes = []string{fmt.Sprintf("Error adding registration events for patients: %v", err)}
					return err
				}
			}
			return nil
		})
	}

	if err := commonData.Cookies.Set("import-request", "json", &result); err != nil {
		request.LogR(r, "setting import-request cookie: %v", err)
	}

	request.Redirect(w, r, "/import")
}
