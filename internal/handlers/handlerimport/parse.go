package handlerimport

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/gdrive/url"
	"github.com/fugleadvokatene/bino/internal/generic"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
	"github.com/jackc/pgx/v5/pgtype"
)

type ImportRequest struct {
	CreateJournals string
	Patients       []ImportPatient
	OK             bool
	Notes          []string
	Txt            string
}

type ImportPatient struct {
	Name      string
	HomeID    int32
	SpeciesID int32
	URL       string
}

func ParseForm(r *http.Request, db *db.Database) ImportRequest {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

	out := ImportRequest{}

	txt, err := request.GetFormValue(r, "txt")
	if err != nil {
		out.Notes = append(out.Notes, err.Error())
		return out
	}
	out.Txt = txt

	lines := generic.SliceToSlice(strings.Split(strings.TrimSpace(txt), "\n"), strings.TrimSpace)
	for i, line := range lines {
		fields := generic.SliceToSlice(strings.Split(line, ","), strings.TrimSpace)
		if n := len(fields); n < 2 || n > 4 {
			out.Notes = append(out.Notes, fmt.Sprintf("line %d: expect 2-4 fields, have %d", i, n))
			return out
		}
		patientName := fields[0]
		if patientName == "" {
			out.Notes = append(out.Notes, fmt.Sprintf("line %d: empty patient name", i))
			return out
		}
		speciesName := fields[1]
		if speciesName == "" {
			out.Notes = append(out.Notes, fmt.Sprintf("line %d: empty species name", i))
			return out
		}
		homeName := ""
		if len(fields) >= 3 {
			homeName = fields[2]
		} else {
			homeName = commonData.User.PreferredHome.Name
			if homeName == "" {
				out.Notes = append(out.Notes, fmt.Sprintf("line %d: no home name set, and you don't have a preferred home set", i))
				return out
			}
		}
		journalURL := ""
		if len(fields) >= 4 {
			journalURL = url.JournalRegex.FindString(fields[3])
			if journalURL == "" {
				out.Notes = append(out.Notes, fmt.Sprintf("line %d: '%s' doesn't seem like a journal URL", i, fields[3]))
			}
		}

		homes, err := db.Q.GetHomeByName(ctx, homeName)
		if err != nil {
			out.Notes = append(out.Notes, fmt.Sprintf("line %d: no home named '%s'", i, homeName))
			return out
		}
		if len(homes) != 1 {
			out.Notes = append(out.Notes, fmt.Sprintf("line %d: expected exactly 1 home named '%s', got %d", i, homeName, len(homes)))
			return out
		}
		homeID := homes[0].ID
		species, err := db.Q.GetSpeciesByName(ctx, speciesName)
		if err != nil {
			out.Notes = append(out.Notes, fmt.Sprintf("line %d: no species named '%s'", i, speciesName))
			return out
		}
		// NOTE: this will fail if the name is the same in multiple languages
		if len(species) != 1 {
			out.Notes = append(out.Notes, fmt.Sprintf("line %d: expected exactly 1 species named '%s', got %d", i, speciesName, len(species)))
			return out
		}
		speciesID := species[0]

		if rows, err := db.Q.GetCurrentPatientsForHome(ctx, sql.GetCurrentPatientsForHomeParams{
			CurrHomeID: pgtype.Int4{Int32: homeID, Valid: true},
			LanguageID: commonData.Lang32(),
		}); err == nil {
			for _, row := range rows {
				if row.Name == patientName && row.SpeciesID == speciesID {
					out.Notes = append(out.Notes, fmt.Sprintf("line %d: %s already has a %s named %s", i, homeName, speciesName, patientName))
					return out
				}
			}
		}

		if journalURL == "" {
			out.Notes = append(out.Notes, fmt.Sprintf("line %d: will create a new journal for %s", i, patientName))
		} else {
			if patients, err := db.Q.GetPatientsByJournalURL(ctx, journalURL); err == nil && len(patients) > 0 {
				out.Notes = append(out.Notes, fmt.Sprintf("line %d: there is already a registered patient with this journal URL: %s", i, model.PatientURL(patients[0])))
				return out
			}
			out.Notes = append(out.Notes, fmt.Sprintf("line %d: will attach journal URL '%s' to %s", i, journalURL, patientName))
		}

		out.Notes = append(out.Notes, fmt.Sprintf("line %d: will create patient named '%s' with species ID=%d, home ID=%d", i, patientName, speciesID, homeID))

		out.Patients = append(out.Patients, ImportPatient{
			Name:      patientName,
			SpeciesID: speciesID,
			HomeID:    homeID,
			URL:       journalURL,
		})
	}

	out.OK = true
	return out
}
