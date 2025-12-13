package capabilities

import (
	"slices"

	"github.com/fugleadvokatene/bino/internal/enums"
)

var RequiredAccessLevel = map[enums.Cap]enums.AccessLevel{
	enums.CapViewAllActivePatients: enums.AccessLevelNone,
	enums.CapViewAllFormerPatients: enums.AccessLevelNone,
	enums.CapViewAllHomes:          enums.AccessLevelNone,
	enums.CapViewAllUsers:          enums.AccessLevelNone,
	enums.CapViewCalendar:          enums.AccessLevelNone,
	enums.CapSearch:                enums.AccessLevelNone,
	enums.CapSetOwnPreferences:     enums.AccessLevelNone,

	enums.CapCheckInPatient:       enums.AccessLevelRehabber,
	enums.CapManageOwnPatients:    enums.AccessLevelRehabber,
	enums.CapManageOwnHomes:       enums.AccessLevelRehabber,
	enums.CapCreatePatientJournal: enums.AccessLevelRehabber,
	enums.CapViewGDriveSettings:   enums.AccessLevelRehabber,
	enums.CapManageAllPatients:    enums.AccessLevelRehabber,
	enums.CapUploadFile:           enums.AccessLevelRehabber,

	enums.CapViewAdminTools: enums.AccessLevelCoordinator,
	enums.CapManageAllHomes: enums.AccessLevelCoordinator,
	enums.CapManageSpecies:  enums.AccessLevelCoordinator,
	enums.CapUseImportTool:  enums.AccessLevelCoordinator,
	enums.CapEditWiki:       enums.AccessLevelCoordinator,

	enums.CapManageUsers:    enums.AccessLevelAdmin,
	enums.CapDeleteUsers:    enums.AccessLevelAdmin,
	enums.CapInviteToGDrive: enums.AccessLevelAdmin,
	enums.CapInviteToBino:   enums.AccessLevelAdmin,
	enums.CapDebug:          enums.AccessLevelAdmin,
}

var AccessLevelToCapabilities = func() (out struct {
	None        []enums.Cap
	Rehabber    []enums.Cap
	Coordinator []enums.Cap
	Admin       []enums.Cap
}) {
	for cap, al := range RequiredAccessLevel {
		switch al {
		case enums.AccessLevelNone:
			out.None = append(out.None, cap)
		case enums.AccessLevelRehabber:
			out.Rehabber = append(out.Rehabber, cap)
		case enums.AccessLevelCoordinator:
			out.Coordinator = append(out.Coordinator, cap)
		case enums.AccessLevelAdmin:
			out.Admin = append(out.Admin, cap)
		}
	}
	slices.Sort(out.None)
	slices.Sort(out.Rehabber)
	slices.Sort(out.Coordinator)
	slices.Sort(out.Admin)
	return out
}()
