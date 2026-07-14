package capabilities

import (
	"slices"

	"github.com/fugleadvokatene/bino/internal/model"
)

var RequiredAccessLevel = map[model.Cap]model.AccessLevel{
	model.CapLoggedIn:              model.AccessLevelObserver,
	model.CapViewAllActivePatients: model.AccessLevelObserver,
	model.CapViewAllFormerPatients: model.AccessLevelObserver,
	model.CapViewAllHomes:          model.AccessLevelObserver,
	model.CapViewAllUsers:          model.AccessLevelObserver,
	model.CapViewCalendar:          model.AccessLevelObserver,
	model.CapSearch:                model.AccessLevelObserver,
	model.CapSetOwnPreferences:     model.AccessLevelObserver,
	model.CapLive:                  model.AccessLevelObserver,
	model.CapViewEventLog:          model.AccessLevelObserver,

	model.CapCheckInPatient:       model.AccessLevelRehabber,
	model.CapManageOwnPatients:    model.AccessLevelRehabber,
	model.CapManageOwnHomes:       model.AccessLevelRehabber,
	model.CapCreatePatientJournal: model.AccessLevelRehabber,
	model.CapManageAllPatients:    model.AccessLevelRehabber,
	model.CapUploadFile:           model.AccessLevelRehabber,
	model.CapManageSpecies:        model.AccessLevelRehabber,

	model.CapViewAdminTools: model.AccessLevelCoordinator,
	model.CapUseImportTool:  model.AccessLevelCoordinator,
	model.CapViewUserAdmin:  model.AccessLevelCoordinator,
	model.CapInviteToGDrive: model.AccessLevelCoordinator,
	model.CapInviteToBino:   model.AccessLevelCoordinator,
	model.CapManageUsers:    model.AccessLevelCoordinator,

	model.CapViewGDriveSettings:  model.AccessLevelAdmin,
	model.CapManageAllHomes:      model.AccessLevelAdmin,
	model.CapDeleteUsers:         model.AccessLevelAdmin,
	model.CapDebug:               model.AccessLevelAdmin,
	model.CapManageFeatureFlags:  model.AccessLevelAdmin,
	model.CapHardDeletePatient:   model.AccessLevelAdmin,
	model.CapSetIndexerState:     model.AccessLevelAdmin,
	model.CapViewSysLog:          model.AccessLevelAdmin,
	model.CapManageTaskTemplates: model.AccessLevelAdmin,
}

var AccessLevelToCapabilities = func() (out struct {
	Observer    []model.Cap
	Rehabber    []model.Cap
	Coordinator []model.Cap
	Admin       []model.Cap
}) {
	for cap, al := range RequiredAccessLevel {
		switch al {
		case model.AccessLevelObserver:
			out.Observer = append(out.Observer, cap)
		case model.AccessLevelRehabber:
			out.Rehabber = append(out.Rehabber, cap)
		case model.AccessLevelCoordinator:
			out.Coordinator = append(out.Coordinator, cap)
		case model.AccessLevelAdmin:
			out.Admin = append(out.Admin, cap)
		}
	}
	slices.Sort(out.Observer)
	slices.Sort(out.Rehabber)
	slices.Sort(out.Coordinator)
	slices.Sort(out.Admin)
	return out
}()
