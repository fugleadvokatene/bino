package capabilities

import (
	"slices"

	"github.com/fugleadvokatene/bino/internal/model"
)

var RequiredAccessLevel = map[model.Cap]model.AccessLevel{
	model.CapLoggedIn:              model.AccessLevelNone,
	model.CapViewAllActivePatients: model.AccessLevelNone,
	model.CapViewAllFormerPatients: model.AccessLevelNone,
	model.CapViewAllHomes:          model.AccessLevelNone,
	model.CapViewAllUsers:          model.AccessLevelNone,
	model.CapViewCalendar:          model.AccessLevelNone,
	model.CapSearch:                model.AccessLevelNone,
	model.CapSetOwnPreferences:     model.AccessLevelNone,

	model.CapCheckInPatient:       model.AccessLevelRehabber,
	model.CapManageOwnPatients:    model.AccessLevelRehabber,
	model.CapManageOwnHomes:       model.AccessLevelRehabber,
	model.CapCreatePatientJournal: model.AccessLevelRehabber,
	model.CapViewGDriveSettings:   model.AccessLevelRehabber,
	model.CapManageAllPatients:    model.AccessLevelRehabber,
	model.CapUploadFile:           model.AccessLevelRehabber,

	model.CapViewAdminTools: model.AccessLevelCoordinator,
	model.CapManageAllHomes: model.AccessLevelCoordinator,
	model.CapManageSpecies:  model.AccessLevelCoordinator,
	model.CapUseImportTool:  model.AccessLevelCoordinator,
	model.CapEditWiki:       model.AccessLevelCoordinator,

	model.CapManageUsers:        model.AccessLevelAdmin,
	model.CapDeleteUsers:        model.AccessLevelAdmin,
	model.CapInviteToGDrive:     model.AccessLevelAdmin,
	model.CapInviteToBino:       model.AccessLevelAdmin,
	model.CapDebug:              model.AccessLevelAdmin,
	model.CapManageFeatureFlags: model.AccessLevelAdmin,
	model.CapHardDeletePatient:  model.AccessLevelAdmin,
}

var AccessLevelToCapabilities = func() (out struct {
	None        []model.Cap
	Rehabber    []model.Cap
	Coordinator []model.Cap
	Admin       []model.Cap
}) {
	for cap, al := range RequiredAccessLevel {
		switch al {
		case model.AccessLevelNone:
			out.None = append(out.None, cap)
		case model.AccessLevelRehabber:
			out.Rehabber = append(out.Rehabber, cap)
		case model.AccessLevelCoordinator:
			out.Coordinator = append(out.Coordinator, cap)
		case model.AccessLevelAdmin:
			out.Admin = append(out.Admin, cap)
		}
	}
	slices.Sort(out.None)
	slices.Sort(out.Rehabber)
	slices.Sort(out.Coordinator)
	slices.Sort(out.Admin)
	return out
}()
