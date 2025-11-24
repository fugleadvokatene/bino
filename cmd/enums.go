//go:generate go tool go-enum --no-iota --values
package main

// All enums defined in one file since go-enum gets kinda slow
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

// ENUM(AvailableIndefinitely, AvailableUntil, UnavailableUntil, UnavailableIndefinitely)
type Availability int

// ENUM(
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
//	StatusChanged                  = 11, // Associated ID is status
//	Deleted                        = 12,
//	NameChanged                    = 13,
//	JournalCreated                 = 14,
//	JournalAttached                = 15,
//	JournalDetached                = 16,
//
// )
type Event int32

// ENUM(
//
//	Info = 0,
//	Success = 1,
//	Warning = 2,
//	Error = 3,
//
// )
type FB int32

// ENUM(Personal=0, Internal=1, Public=2)
type FileAccessibility int32

// ENUM(
//
//	GetFile,
//	InviteUser,
//	CreateJournal,
//	ListFiles,
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

// ENUM(journal, patient)
type MatchType string

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
