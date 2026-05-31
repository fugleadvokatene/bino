package handlerpatient

import (
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/request"
)

func PatientButtons(commonData *request.CommonData, patientID int32, journalURL string) []request.FeedbackButton {
	buttons := []request.FeedbackButton{
		{
			Label: commonData.Language.DashboardGoToPatientPage,
			Class: "btn-success",
			URL:   model.PatientURL(patientID),
		},
	}
	if journalURL != "" {
		buttons = append(buttons, request.FeedbackButton{
			Label: commonData.Language.DashboardGoToJournal,
			Class: "btn-success",
			URL:   journalURL,
		})
	}
	return buttons
}
