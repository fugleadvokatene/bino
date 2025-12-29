//go:generate go tool go-enum --no-iota --values
package model

import "strings"

// All view defined in one file since go-enum gets kinda slow
// when scanning many files.

// ENUM(
//
//	None        = 0,
//	Rehabber    = 1,
//	Coordinator = 2,
//	Admin       = 3,
//
// )
type AccessLevel int32

// ENUM(
// AvailableIndefinitely,
// AvailableUntil,
// UnavailableUntil,
// UnavailableIndefinitely,
// )
type Availability int

// ENUM(
// LoggedIn,
// ViewAllActivePatients,
// ViewAllFormerPatients,
// ViewAllHomes,
// ViewAllUsers,
// ViewCalendar,
// Search,
// SetOwnPreferences,
// CheckInPatient,
// ManageOwnPatients,
// ManageAllPatients,
// ManageOwnHomes,
// ManageAllHomes,
// CreatePatientJournal,
// ManageSpecies,
// ManageUsers,
// DeleteUsers,
// ViewAdminTools,
// ViewGDriveSettings,
// InviteToGDrive,
// InviteToBino,
// UseImportTool,
// Debug,
// UploadFile,
// EditWiki,
// ManageFeatureFlags,
// HardDeletePatient,
// Live,
// SetIndexerState,
// )
type Cap int32

// ENUM(
//
//	Unknown                        = 0,
//	Registered                     = 1,
//	Adopted                        = 3,
//	Released                       = 4,
//	TransferredToOtherHome         = 5,
//	TransferredOutsideOrganization = 6,
//	Died                           = 7,
//	Euthanized                     = 8,
//	StatusChanged                  = 11,
//	Deleted                        = 12,
//	NameChanged                    = 13,
//	JournalCreated                 = 14,
//	JournalAttached                = 15,
//	JournalDetached                = 16,
//	SpeciesChanged 				   = 17,
//
// )
type EventID int32

// ENUM(
//
//	Info = 0,
//	Success = 1,
//	Warning = 2,
//	Error = 3,
//
// )
type FB int32

func (fbt FB) CSSClass() string {
	return "feedback-" + strings.ToLower(fbt.String())
}

// ENUM(
//
//	GetFile,
//	InviteUser,
//	CreateJournal,
//	ListFiles,
//	UpdateJournal,
//	GetDocument,
//	GetIndexerState,
//	SetIndexerState,
//
// )
type GDriveTaskRequestID int

// ENUM(
//
//	NO = 1,
//	EN = 2,
//
// )
type LanguageID int32

// ENUM(
//
//	Unknown                        = 0,
//	Admitted                       = 2,
//	Released                       = 3,
//	Dead                           = 4,
//	Euthanized                     = 5,
//	TransferredOutsideOrganization = 6,
//	Adopted                        = 7,
//	Deleted                        = 8,
//
// )
type Status int32

// ENUM(
//
//	YYYY,
//	MM,
//	DD,
//	Name,
//	Species,
//	BinoURL,
//
// )
type Template string

// ENUM(None = 0, Newer, Older)
type TimePreference int

// ENUM(
//
//	Unknown,
//	Hello,
//	JournalCreated,
//
// )
type LiveEventType string

// ENUM(
//
//	Original,
//	Large,
//	Medium,
//	Small,
//
// )
type FileVariantID string

func (fvid FileVariantID) IsMiniature() bool {
	return fvid == FileVariantIDLarge || fvid == FileVariantIDMedium || fvid == FileVariantIDSmall
}

// ENUM(
// MachineDiskSizeGB      = 0,
// MachineDiskAvailableGB = 1,
// MachineDiskUsedGB      = 2,
// MachineLoadPercent     = 10,
// MachineMemSizeMB       = 20,
// MachineMemUsedMB       = 21,
// MachineMemAvailableMB  = 22,
// ProcNGoroutines        = 40,
// ProcMemAllocatedMB     = 41,
// ProcVRAMReservedMB     = 42,
// )
type DebugStatKey int16

// ENUM(
// Google   = 0,
// Bino     = 1,
// Evernote = 2,
// )
type JournalOriginID int16
