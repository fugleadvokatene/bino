package language

import (
	"fmt"
	"time"

	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/jackc/pgx/v5/pgtype"
)

type Language struct {
	ID          model.LanguageID
	Emoji       string
	SelfName    string
	Weekdays    map[time.Weekday]string
	Months      map[time.Month]string
	GDriveRoles map[string]string

	AccessLevel  string
	AccessLevels map[model.AccessLevel]string

	AdminDisplayName            string
	AdminEmailAddress           string
	AdminInviteToBino           string
	AdminManageEvents           string
	AdminManageGoogleDrive      string
	AdminManageHomes            string
	AdminManageSpecies          string
	AdminManageStatuses         string
	AdminManageInvites          string
	AdminManageUsers            string
	AdminScrubUserData          string
	AdminScrubUserDataConfirm   string
	AdminNukeUser               string
	AdminNukeUserConfirm        string
	AdminAbortedDueToWrongEmail string
	AdminUserDeletionFailed     string
	AdminUserWasDeleted         string
	AdminExistingUsers          string
	AdminInviteUsers            string
	AdminInviteExpires          string
	AdminPendingInvitations     string
	AdminInvitationFailed       string
	AdminInvitationOKNoEmail    string
	AdminInviteCode             string
	AdminRoot                   string
	AdminDebug                  string

	AuthLogOut string

	Calendar string

	CheckinCheckInPatient  string
	CheckinIHaveThePatient string
	CheckinPatientName     string
	CheckinLegend          string
	CheckinYouAreHomeless  string

	DashboardNoPatientsInHome      string
	DashboardGoToJournal           string
	DashboardGoToPatientPage       string
	DashboardCheckOut              string
	DashboardSearch                string
	DashboardSearchExplanation     string
	DashboardSearchFilter          string
	DashboardSearchShowMine        string
	DashboardSearchShowFull        string
	DashboardSearchShowUnavailable string
	DashboardSelectHome            string
	DashboardSelectCheckout        string
	DashboardSelectSpecies         string
	DashboardNonPreferredSpecies   string
	DashboardOtherHome             string

	YouCanAlso         string
	ViewFormerPatients string
	Or                 string
	SearchInJournals   string

	ErrorPageHead         string
	ErrorPageInstructions string
	ErrorSettingLanguage  string

	EventList string

	FFAdmin  string
	FFCreate string

	FilesUploadHeader        string
	FilesPleaseWait          string
	FilesThatYouHaveUploaded string

	FooterPrivacy    string
	FooterTOS        string
	FooterSourceCode string

	FormerPatients string

	GDriveBaseDir                          string
	GDriveSelectFolder                     string
	GDriveSelectFolderInstruction          string
	GDriveSelectedFolder                   string
	GDriveReloadFolders                    string
	GDriveTemplate                         string
	GDrivePermissionsForBaseDir            string
	GDrivePermissionsForBaseDirInstruction string
	GDriveDisplayName                      string
	GDriveEmail                            string
	GDriveRole                             string
	GDriveFoundBinoUser                    string
	GDriveBinoUsersMissingWritePermission  string
	GDriveEmailInBino                      string
	GDriveGiveAccess                       string
	GDriveLoadFoldersFailed                string
	GDriveBaseDirUpdated                   string
	GDriveTemplateUpdated                  string
	GDriveUserInvited                      string
	GDriveCreateJournalForPatient          string
	GDriveFindJournalForPatient            string
	GDriveSelectExistingJournalInstruction string
	GDriveNoJournalForPatient              string
	GDriveCreateJournalFailed              string
	GDriveJournalNotFound                  string
	GDriveTemplateFile                     string
	GDriveExtraDirs                        string
	GDriveSuggestedJournal                 string
	GDriveAcceptSuggestedJournal           string
	GDriveDeclineSuggestedJournal          string

	GenericAdd          string
	GenericAge          string
	GenericAvatar       string
	GenericCancel       string
	GenericConfirm      string
	GenericDelete       string
	GenericDetails      string
	GenericEmail        string
	GenericFrom         string
	GenericTo           string
	GenericGoBack       string
	GenericHome         string
	GenericJournal      string
	GenericLatin        string
	GenericMove         string
	GenericMoveTo       string
	GenericName         string
	GenericNone         string
	GenericNever        string
	GenericNote         string
	GenericNotFound     string
	GenericSettings     string
	GenericSpecies      string
	GenericStatus       string
	GenericUpdate       string
	GenericFailed       string
	GenericSuccess      string
	GenericMessage      string
	GenericURL          string
	GenericSearch       string
	GenericSave         string
	GenericUnauthorized string
	GenericEdit         string
	GenericUser         string
	GenericEnabled      string

	HomesArchiveHome                string
	HomesAddToHome                  string
	HomesAddUserToHome              string
	HomesCreateHome                 string
	HomesCreateHomeNote             string
	HomesEmptyHome                  string
	HomesHomeName                   string
	HomesRemoveFromCurrent          string
	HomesViewHomes                  string
	HomesUnassignedUsers            string
	HomesPatients                   string
	HomesUsers                      string
	HomeCapacity                    string
	HomeCapacityInstruction         string
	HomePreferredSpecies            string
	HomePreferredSpeciesInstruction string
	HomeAvailability                string
	HomePeriodInvalid               string
	HomeAvailableIndefinitely       string
	HomeUnavailableIndefinitely     string
	HomeUnavailableFromInstruction  string
	HomeUnavailableToInstruction    string
	HomeNameWasUpdated              string

	ImportHeader   string
	ImportPatients string

	LanguageUpdateFailed string

	NotFoundPageHead         string
	NotFoundPageInstructions string

	PatientRegisteredTime string
	PatientCheckedOutTime string
	PatientEventTime      string
	PatientEventEvent     string
	PatientEventNote      string
	PatientEventUser      string
	PatientEventHome      string
	PatientWasDeleted     string
	PatientEdit           string

	UserHomes      string
	UserIsHomeless string

	SearchModeBasic           string
	SearchModeAdvanced        string
	SearchFilterCreated       string
	SearchFilterClear         string
	SearchTimePreference      string
	SearchTimePreferenceNone  string
	SearchTimePreferenceNewer string
	SearchTimePreferenceOlder string

	NavbarCalendar  string
	NavbarDashboard string

	WikiHeader string

	Status map[model.Status]string
	Event  map[model.EventID]string

	CapabilitiesExplanation       string
	CapabilitiesYourAccessLevelIs string
	Capabilities                  map[model.Cap]string
	CapabilitiesLink              string
	CapabilitiesHeader            string

	UnavailablePeriods              string
	AddUnavailablePeriodInstruction string
}

func (l *Language) HomeMultipleUsers(n int) string {
	switch l.ID {
	case model.LanguageIDNO:
		all := "alle"
		if n == 2 {
			all = "begge"
		}
		return fmt.Sprintf("Det er %d brukere koblet til dette rehabhjemmet (se under). Disse innstillingene vil gjelde for %s.", n, all)
	case model.LanguageIDEN:
		fallthrough
	default:
		all := "all"
		if n == 2 {
			all = "both"
		}
		return fmt.Sprintf("There are %d users in this rehab home (see below). These settings will be applied to %s of them.", n, all)
	}
}

func (l *Language) ShowingFirstToLastOfN(first, last, n int32) string {
	switch l.ID {
	case model.LanguageIDNO:
		return fmt.Sprintf("Viser %d-%d av %d", first, last, n)
	case model.LanguageIDEN:
		fallthrough
	default:
		return fmt.Sprintf("Showing %d-%d of %d", first, last, n)
	}
}

func (l *Language) CheckinSuccessful(name string) string {
	switch l.ID {
	case model.LanguageIDNO:
		return fmt.Sprintf("%s er sjekket inn.", name)
	case model.LanguageIDEN:
		fallthrough
	default:
		return fmt.Sprintf("%s was checked in successfully.", name)
	}
}

func (l *Language) HomeUnavailableUntil(dv model.Date) string {
	switch l.ID {
	case model.LanguageIDNO:
		if dv.Year > time.Now().Year()+2 {
			return fmt.Sprintf("Utilgjengelig på ubestemt tid.")
		}
		return fmt.Sprintf("Utilgjengelig til og med den %d. %s %d.", dv.Day, l.Months[dv.Month], dv.Year)
	case model.LanguageIDEN:
		fallthrough
	default:
		if dv.Year > time.Now().Year()+2 {
			return fmt.Sprintf("Unavailable until further notice.")
		}
		return fmt.Sprintf("Unavailable until %s %d %d.", l.Months[dv.Month], dv.Day, dv.Year)
	}
}

func (l *Language) HomeAvailableUntil(dv model.Date) string {
	switch l.ID {
	case model.LanguageIDNO:
		return fmt.Sprintf("Blir utilgjengelig den %d. %s %d.", dv.Day, l.Months[dv.Month], dv.Year)
	case model.LanguageIDEN:
		fallthrough
	default:
		return fmt.Sprintf("Becomes unavailable from %s %d %d.", l.Months[dv.Month], dv.Day, dv.Year)
	}
}

func (l *Language) AvailabilityString(up []model.Period) (model.Availability, string) {
	availability, dv := model.AvailabilityDate(up)
	switch availability {
	case model.AvailabilityAvailableIndefinitely:
		return availability, l.HomeAvailableIndefinitely
	case model.AvailabilityAvailableUntil:
		return availability, l.HomeAvailableUntil(dv)
	case model.AvailabilityUnavailableIndefinitely:
		return availability, l.HomeUnavailableIndefinitely
	case model.AvailabilityUnavailableUntil:
		return availability, l.HomeUnavailableUntil(dv)
	}
	return availability, l.HomeAvailableIndefinitely
}

func (l *Language) HomeIsUnavailable(name string, note string) string {
	switch l.ID {
	case model.LanguageIDNO:
		if note != "" {
			note = fmt.Sprintf(" (%s)", note)
		}
		return fmt.Sprintf("%s er utilgjengelig%s", name, note)
	case model.LanguageIDEN:
		fallthrough
	default:
		if note != "" {
			note = fmt.Sprintf(" (%s)", note)
		}
		return fmt.Sprintf("%s is unavailable%s", name, note)
	}
}

func (l *Language) TODO(s string) string {
	return s
}

var NO = &Language{
	ID:       model.LanguageIDNO,
	Emoji:    "🇳🇴",
	SelfName: "Norsk",
	Weekdays: map[time.Weekday]string{
		time.Monday:    "mandag",
		time.Tuesday:   "tirsdag",
		time.Wednesday: "onsdag",
		time.Thursday:  "torsdag",
		time.Friday:    "fredag",
		time.Saturday:  "lørdag",
		time.Sunday:    "søndag",
	},
	Months: map[time.Month]string{
		time.January:   "januar",
		time.February:  "februar",
		time.March:     "mars",
		time.April:     "april",
		time.May:       "mai",
		time.June:      "juni",
		time.July:      "juli",
		time.August:    "august",
		time.September: "september",
		time.October:   "oktober",
		time.November:  "november",
		time.December:  "desember",
	},
	GDriveRoles: map[string]string{
		"owner":         "Full tilgang (eier)",
		"organizer":     "Full tilgang, kan endre tilganger",
		"fileOrganizer": "Full tilgang til innhold",
		"writer":        "Kan opprette og redigere journaler",
		"commenter":     "Kan kommentere på journaler",
		"reader":        "Kan lese journaler",
	},

	AccessLevel: "Tilgangsnivå",
	AccessLevels: map[model.AccessLevel]string{
		model.AccessLevelAdmin:       "Administrator",
		model.AccessLevelCoordinator: "Koordinator",
		model.AccessLevelRehabber:    "Rehabilitør",
		model.AccessLevelNone:        "Bruker",
	},

	AdminDisplayName:            "Navn",
	AdminEmailAddress:           "Epostaddresse",
	AdminInviteToBino:           "Inviter til Bino",
	AdminManageEvents:           "Konfigurer hendelsestyper",
	AdminManageGoogleDrive:      "Konfigurer Google Drive",
	AdminManageHomes:            "Konfigurer rehabhjem",
	AdminManageSpecies:          "Konfigurer arter",
	AdminManageStatuses:         "Konfigurer statuser",
	AdminManageInvites:          "Administrer invitasjoner",
	AdminManageUsers:            "Administrer brukere",
	AdminScrubUserData:          "Slett brukerdata",
	AdminScrubUserDataConfirm:   "Skriv inn brukerens email-addresse for å bekrefte at du vil slette brukerdataen",
	AdminNukeUser:               "Tilintetgjør bruker",
	AdminNukeUserConfirm:        "Skriv inn brukerens email-addresse for å bekrefte at du vil tilintetgjøre brukeren (dette sletter også alt innhold brukeren har opprettet)",
	AdminAbortedDueToWrongEmail: "Feil email-addresse innskrevet. Handlingen ble avbrutt.",
	AdminUserDeletionFailed:     "Kunne ikke slette brukeren. Kontakt administrator.",
	AdminUserWasDeleted:         "Brukeren ble slettet.",
	AdminExistingUsers:          "Brukere i Bino",
	AdminInviteUsers:            "Inviter brukere",
	AdminInviteExpires:          "Utløper",
	AdminPendingInvitations:     "Utsendte invitasjoner",
	AdminInvitationFailed:       "Kunne ikke invitere brukeren. Kontakt administrator.",
	AdminInvitationOKNoEmail:    "Eposten ble lagt til i listen, men det er ikke sendt ut en epost. Send personen en lenke til forsiden og be dem om å opprette en bruker.",
	AdminInviteCode:             "Kode",
	AdminRoot:                   "Verktøy",
	AdminDebug:                  "Debug",

	AuthLogOut: "Logg ut",

	Calendar: "Kalender",

	CheckinCheckInPatient:  "Sjekk inn pasient",
	CheckinIHaveThePatient: "Pasienten er her",
	CheckinPatientName:     "Pasientens navn",
	CheckinLegend:          "Ny pasient",
	CheckinYouAreHomeless:  "Du kan ikke sjekke inn pasienter ennå fordi du ikke er koblet til et rehabhjem.",

	DashboardNoPatientsInHome:      "Ingen pasienter",
	DashboardGoToJournal:           "Til journal i GDrive",
	DashboardGoToPatientPage:       "Til pasientside",
	DashboardCheckOut:              "Sjekk ut",
	DashboardSearch:                "Søk på pasienter",
	DashboardSearchExplanation:     "Skriv i tekstboksten under for å finne pasienter basert på navn eller art.",
	DashboardSearchFilter:          "Filtrer rehabhjem",
	DashboardSearchShowMine:        "Vis mitt rehabhjem",
	DashboardSearchShowFull:        "Vis fulle rehabhjem",
	DashboardSearchShowUnavailable: "Vis utilgjengelige rehabhjem",
	DashboardSelectHome:            "Velg",
	DashboardSelectCheckout:        "Velg status",
	DashboardSelectSpecies:         "Velg art",
	DashboardNonPreferredSpecies:   "Andre arter",
	DashboardOtherHome:             "Andre rehabhjem",

	YouCanAlso:         "Du kan også",
	ViewFormerPatients: "se tidligere pasienter",
	Or:                 "eller",
	SearchInJournals:   "søke i journaler",

	ErrorPageHead:         "Feilmelding",
	ErrorPageInstructions: "Det skjedde noe feil under lasting av siden. Feilen har blitt logget og vil bli undersøkt. Send melding til administrator for hjelp. Den tekniske feilmeldingen følger under.",
	ErrorSettingLanguage:  "Kunne ikke oppdatere språk",

	EventList: "Siste hendelser",

	FFAdmin:  "Konfigurer feature flags",
	FFCreate: "Lag nytt feature flag",

	FilesUploadHeader:        "Last opp filer",
	FilesPleaseWait:          "Laster opp filer...",
	FilesThatYouHaveUploaded: "Filer du har lastet opp",

	FooterPrivacy:    "Personvern",
	FooterTOS:        "Bruksvilkår",
	FooterSourceCode: "Kildekode",

	FormerPatients: "Tidligere pasienter",

	GDriveSelectFolder:                     "Velg mappe",
	GDriveSelectedFolder:                   "Valgt",
	GDriveSelectFolderInstruction:          "Her kan du velge hvilken mappe nye journaler skal opprettes i.",
	GDriveReloadFolders:                    "Hent mapper fra Google Drive på nytt",
	GDriveTemplate:                         "Mal",
	GDrivePermissionsForBaseDir:            "Tilganger til journalmappen",
	GDrivePermissionsForBaseDirInstruction: "Her kan du se hvem som har tilgang til journalmappen, og sammenligne med tilganger i Bino.",
	GDriveDisplayName:                      "Brukernavn i Google Drive",
	GDriveEmail:                            "Email",
	GDriveRole:                             "Tilganger",
	GDriveFoundBinoUser:                    "Bino-konto",
	GDriveBinoUsersMissingWritePermission:  "Disse brukerne mangler tilgang til å opprette journaler i den valgte mappen:",
	GDriveEmailInBino:                      "Email i Bino",
	GDriveGiveAccess:                       "Gi skrivetilgang",
	GDriveLoadFoldersFailed:                "Kunne ikke laste inn mapper fra Google Drive",
	GDriveUserInvited:                      "Brukeren ble invitert til mappen",
	GDriveCreateJournalForPatient:          "Lag ny journal",
	GDriveFindJournalForPatient:            "Finn eksisterende journal",
	GDriveSelectExistingJournalInstruction: "Eller velg en eksisterende journal i Google Drive:",
	GDriveNoJournalForPatient:              "Det er ikke koblet noen journal til pasienten.",
	GDriveCreateJournalFailed:              "Pasienten ble lagt til, men kunne ikke opprette pasientjournal i Google Drive",
	GDriveJournalNotFound:                  "Pasienten er lagt til, men kunne ikke finne matchende journal i Google Drive",
	GDriveTemplateFile:                     "Nye journaler bruker denne malen:",
	GDriveBaseDir:                          "Nye journaler vil bli opprettet i denne mappen:",
	GDriveExtraDirs:                        "I tillegg er journaler i disse mappene inkludert i søk:",
	GDriveSuggestedJournal:                 "Forslag",
	GDriveAcceptSuggestedJournal:           "Bruk foreslått",
	GDriveDeclineSuggestedJournal:          "Ikke bruk",

	GenericAdd:          "Legg til",
	GenericAge:          "Alder",
	GenericAvatar:       "Profilbilde",
	GenericCancel:       "Avbryt",
	GenericConfirm:      "Bekreft",
	GenericDelete:       "Slett",
	GenericDetails:      "Detaljer",
	GenericEmail:        "Email",
	GenericFrom:         "Fra",
	GenericTo:           "Til",
	GenericGoBack:       "Tilbake",
	GenericHome:         "Rehabhjem",
	GenericJournal:      "Journal",
	GenericLatin:        "Latin",
	GenericMove:         "Flytt",
	GenericMoveTo:       "Flytt til",
	GenericName:         "Navn",
	GenericNone:         "Ingen",
	GenericNever:        "Aldri",
	GenericNote:         "Notis",
	GenericNotFound:     "Ikke funnet",
	GenericSettings:     "Innstillinger",
	GenericSpecies:      "Art",
	GenericStatus:       "Status",
	GenericUpdate:       "Oppdater",
	GenericFailed:       "Noe gikk galt. Kontakt administrator.",
	GenericSuccess:      "Handlingen ble utført.",
	GenericMessage:      "Melding",
	GenericURL:          "URL",
	GenericSearch:       "Søk",
	GenericSave:         "Lagre",
	GenericUnauthorized: "Du har ikke lov til å gjøre dette",
	GenericEdit:         "Rediger",
	GenericUser:         "Bruker",
	GenericEnabled:      "Slått på",

	HomesAddToHome:                  "Legg til",
	HomesArchiveHome:                "Arkiver rehabhjem",
	HomesCreateHome:                 "Opprett nytt rehabhjem",
	HomesCreateHomeNote:             "Navnet er som regel navnet på en person, men det kan være flere personer i ett rehabhjem.",
	HomesEmptyHome:                  "Det er ingen brukere i dette rehabhjemmet.",
	HomesHomeName:                   "Rehabhjem",
	HomesRemoveFromCurrent:          "Fjern fra dette rehabhjemmet",
	HomesUnassignedUsers:            "Brukere som ikke er koblet til noe rehabhjem",
	HomesViewHomes:                  "Rehabhjem",
	HomesPatients:                   "Pasienter",
	HomesUsers:                      "Brukere",
	HomeCapacity:                    "Kapasitet",
	HomeCapacityInstruction:         "Skriv inn hvor mange pasienter du har kapasitet til å ta, slik at andre vet om du har plass til flere eller trenger avlasting.",
	HomePreferredSpecies:            "Favoritt-arter",
	HomePreferredSpeciesInstruction: "Velg hvilke arter som kommer øverst på lista når du skal sjekke inn en pasient. Den aller øverste er den som blir forhåndsvalgt. Dra og slipp for å sortere.",
	HomeAvailability:                "Tilgjengelighet",
	HomePeriodInvalid:               "Perioden er ugyldig.",
	HomeAvailableIndefinitely:       "Tilgjengelig.",
	HomeUnavailableIndefinitely:     "Utilgjengelig på ubestemt tid.",
	HomeUnavailableFromInstruction:  "Datoen du blir utilgjengelig.",
	HomeUnavailableToInstruction:    "Siste dato du er utilgjengelig. La stå tom hvis du er utilgjengelig på ubestemt tid.",
	HomeNameWasUpdated:              "Endret navn på rehabhjemmet.",

	ImportHeader:   "Importverktøy",
	ImportPatients: "Importer pasienter",

	LanguageUpdateFailed: "Kunne ikke oppdatere språk",

	NotFoundPageHead:         "Ikke funnet",
	NotFoundPageInstructions: "Siden ble ikke funnet. Se feilmelding:",

	NavbarCalendar:  "Kalender",
	NavbarDashboard: "Hovedside",

	WikiHeader: "Wiki",

	PatientRegisteredTime: "Registrert",
	PatientCheckedOutTime: "Sjekket ut",
	PatientEventTime:      "Tidspunkt",
	PatientEventEvent:     "Hendelse",
	PatientEventNote:      "Notis",
	PatientEventUser:      "Endret av",
	PatientEventHome:      "Rehabhjem",
	PatientWasDeleted:     "Pasienten ble slettet.",
	PatientEdit:           "Endre",

	UserHomes:      "Tilkoblede rehabhjem",
	UserIsHomeless: "Ingen tilkoblede rehabhjem",

	SearchModeBasic:           "Raskt",
	SearchModeAdvanced:        "Avansert",
	SearchFilterCreated:       "Dato",
	SearchFilterClear:         "Fjern",
	SearchTimePreference:      "Prioriter eldre/nyere resultater",
	SearchTimePreferenceNone:  "Nei",
	SearchTimePreferenceOlder: "Eldre",
	SearchTimePreferenceNewer: "Nyere",

	Status: map[model.Status]string{
		model.StatusUnknown:                        "Ukjent",
		model.StatusAdmitted:                       "I rehab",
		model.StatusAdopted:                        "Adoptert",
		model.StatusReleased:                       "Sluppet fri",
		model.StatusTransferredOutsideOrganization: "Overført til annet tiltak",
		model.StatusDead:                           "Død",
		model.StatusEuthanized:                     "Avlivet",
		model.StatusDeleted:                        "Feilregistrert",
	},

	Event: map[model.EventID]string{
		model.EventIDUnknown:                        "Ukjent",
		model.EventIDRegistered:                     "Registrert",
		model.EventIDAdopted:                        "Adoptert",
		model.EventIDReleased:                       "Sluppet fri",
		model.EventIDTransferredToOtherHome:         "Overført",
		model.EventIDTransferredOutsideOrganization: "Overført til annen organisasjon",
		model.EventIDDied:                           "Døde",
		model.EventIDEuthanized:                     "Avlivet",
		model.EventIDStatusChanged:                  "Endret status",
		model.EventIDDeleted:                        "Slettet",
		model.EventIDNameChanged:                    "Endret navn",
		model.EventIDJournalCreated:                 "Opprettet journal i Google Drive",
		model.EventIDJournalAttached:                "Koblet til journal i Google Drive",
		model.EventIDJournalDetached:                "Koblet fra journal i Google Drive",
		model.EventIDSpeciesChanged:                 "Endret art",
	},

	CapabilitiesLink:              "Les om brukertilganger i Bino",
	CapabilitiesHeader:            "Brukertilganger",
	CapabilitiesYourAccessLevelIs: "Ditt tilgangsnivå er: ",
	CapabilitiesExplanation:       "Her er det brukere med forskjellig tilgangsnivå kan gjøre: ",
	Capabilities: map[model.Cap]string{
		model.CapViewAllActivePatients: "Se alle pasienter som er i rehab",
		model.CapViewAllFormerPatients: "Se alle pasienter som har vært i rehab",
		model.CapViewAllHomes:          "Se alle rehabhjem",
		model.CapViewAllUsers:          "Se alle brukere",
		model.CapViewCalendar:          "Se kalenderen",
		model.CapSearch:                "Søke i journaler",
		model.CapSetOwnPreferences:     "Sette egne preferanser for språk o.l.",
		model.CapCheckInPatient:        "Sjekke inn pasienter",
		model.CapManageOwnPatients:     "Endre informasjon om egne pasienter",
		model.CapManageAllPatients:     "Redigere alle pasienter",
		model.CapManageOwnHomes:        "Endre informasjon om eget rehabhjem",
		model.CapManageAllHomes:        "Endre informasjon om alle rehabhjem",
		model.CapCreatePatientJournal:  "Opprette nye pasientjournaler i Google Drive",
		model.CapManageSpecies:         "Endre listen over arter",
		model.CapManageUsers:           "Endre informasjon om andre brukere",
		model.CapDeleteUsers:           "Slette brukere",
		model.CapViewAdminTools:        "Se liste over adminverktøy",
		model.CapViewGDriveSettings:    "Se Google Drive-innstillinger",
		model.CapInviteToGDrive:        "Invitere brukere til Google Drive-mappen fra Bino",
		model.CapInviteToBino:          "Invitere nye brukere til Bino",
	},

	UnavailablePeriods:              "Utilgjengelig i følgende perioder:",
	AddUnavailablePeriodInstruction: "Fyll inn skjemaet for å fortelle andre at du blir utilgjengelig i en periode:",
}

var EN = &Language{
	ID:       model.LanguageIDEN,
	Emoji:    "🇬🇧",
	SelfName: "English",
	Weekdays: map[time.Weekday]string{
		time.Monday:    time.Monday.String(),
		time.Tuesday:   time.Tuesday.String(),
		time.Wednesday: time.Wednesday.String(),
		time.Thursday:  time.Thursday.String(),
		time.Friday:    time.Friday.String(),
		time.Saturday:  time.Saturday.String(),
		time.Sunday:    time.Sunday.String(),
	},
	Months: map[time.Month]string{
		time.January:   time.January.String(),
		time.February:  time.February.String(),
		time.March:     time.March.String(),
		time.April:     time.April.String(),
		time.May:       time.May.String(),
		time.June:      time.June.String(),
		time.July:      time.July.String(),
		time.August:    time.August.String(),
		time.September: time.September.String(),
		time.October:   time.October.String(),
		time.November:  time.November.String(),
		time.December:  time.December.String(),
	},
	GDriveRoles: map[string]string{
		"owner":         "Owner",
		"organizer":     "Admin, can set permissions",
		"fileOrganizer": "Content administrator",
		"writer":        "Can create and edit journals",
		"commenter":     "Can comment on journals",
		"reader":        "Can read journals",
	},

	AccessLevel: "Access level",

	AccessLevels: map[model.AccessLevel]string{
		model.AccessLevelAdmin:       "Administrator",
		model.AccessLevelCoordinator: "Coordinator",
		model.AccessLevelRehabber:    "Rehabilitator",
		model.AccessLevelNone:        "User",
	},

	AdminDisplayName:            "Name",
	AdminEmailAddress:           "Email address",
	AdminInviteToBino:           "Invite to Bino",
	AdminManageEvents:           "Manage event types",
	AdminManageGoogleDrive:      "Configure Google Drive",
	AdminManageHomes:            "Manage rehab homes",
	AdminManageSpecies:          "Manage species",
	AdminManageStatuses:         "Manage statuses",
	AdminManageInvites:          "Invitations",
	AdminManageUsers:            "Manage users",
	AdminScrubUserData:          "Delete user data",
	AdminScrubUserDataConfirm:   "Write the user's email address to confirm that you want to scrub all user data for this user",
	AdminNukeUser:               "Destroy user",
	AdminNukeUserConfirm:        "Write the user's email address to confirm that you want to destroy the user record (this also removes all content created by the user)",
	AdminAbortedDueToWrongEmail: "Wrong email address. The action was cancelled.",
	AdminUserDeletionFailed:     "Failed to delete the user. Contact site administrator.",
	AdminUserWasDeleted:         "The user was deleted.",
	AdminExistingUsers:          "Bino users",
	AdminInviteUsers:            "Invite new users",
	AdminInviteExpires:          "Expires",
	AdminPendingInvitations:     "Pending invitations",
	AdminInvitationFailed:       "Failed to invite user. Contact site administrator.",
	AdminInvitationOKNoEmail:    "The user was added to the list of invited user. No email was sent; send them a link to the main page and ask them to log in.",
	AdminInviteCode:             "Code",
	AdminRoot:                   "Tools",
	AdminDebug:                  "Debug",

	AuthLogOut: "Log out",

	Calendar: "Kalender",

	CheckinCheckInPatient:  "Check in",
	CheckinIHaveThePatient: "The patient is here",
	CheckinPatientName:     "Name of the patient",
	CheckinLegend:          "New patient",
	CheckinYouAreHomeless:  "You can't check in patients yet because you're not connected to a rehab home.",

	DashboardNoPatientsInHome:      "No patients",
	DashboardGoToJournal:           "Go to journal in GDrive",
	DashboardGoToPatientPage:       "Go to patient page",
	DashboardCheckOut:              "Checkout",
	DashboardSearch:                "Search for patients",
	DashboardSearchExplanation:     "Write in the text box below to find patients based on name or species.",
	DashboardSearchFilter:          "Filter homes",
	DashboardSearchShowMine:        "Show my home",
	DashboardSearchShowFull:        "Show full homes",
	DashboardSearchShowUnavailable: "Show unavailable homes",
	DashboardSelectHome:            "Select",
	DashboardSelectCheckout:        "Select status",
	DashboardSelectSpecies:         "Select species",
	DashboardNonPreferredSpecies:   "Other species",
	DashboardOtherHome:             "Other homes",

	YouCanAlso:         "You can also",
	ViewFormerPatients: "view former patients",
	Or:                 "or",
	SearchInJournals:   "search in journals",

	ErrorPageHead:         "Error",
	ErrorPageInstructions: "An error occurred while loading the page. The error has been logged and will be investigated. Send a message to the site admin for help. The technical error message is as follows.",
	ErrorSettingLanguage:  "Failed to update language",

	EventList: "Last events",

	FFAdmin:  "Configure feature flags",
	FFCreate: "Create feature flag",

	FilesUploadHeader:        "Upload files",
	FilesPleaseWait:          "Uploading...",
	FilesThatYouHaveUploaded: "Files you have uploaded",

	FooterPrivacy:    "Privacy",
	FooterTOS:        "Terms of Service",
	FooterSourceCode: "Source code",

	FormerPatients: "Former patients",

	GDriveSelectFolder:                     "Select folder",
	GDriveSelectedFolder:                   "Selected",
	GDriveSelectFolderInstruction:          "Select the folder in which new patient journals will be created.",
	GDriveReloadFolders:                    "Reload folders from Google Drive",
	GDriveTemplate:                         "Choose template",
	GDrivePermissionsForBaseDir:            "Journal folder permissions",
	GDrivePermissionsForBaseDirInstruction: "Check who has permissions to the folder, and compare with the permissions in Bino.",
	GDriveDisplayName:                      "Username in Google Drive",
	GDriveEmail:                            "Email",
	GDriveRole:                             "Role",
	GDriveFoundBinoUser:                    "Bino account",
	GDriveBinoUsersMissingWritePermission:  "These users do not have access to create new journals in the selected folder:",
	GDriveEmailInBino:                      "Email address in Bino",
	GDriveGiveAccess:                       "Give write-access",
	GDriveLoadFoldersFailed:                "Failed to load folders from Google Drive",
	GDriveBaseDirUpdated:                   "Google Drive journal folder was updated. Remember to also update the template.",
	GDriveTemplateUpdated:                  "Template journal was updated",
	GDriveUserInvited:                      "The user was invited to the journal folder",
	GDriveCreateJournalForPatient:          "Create journal",
	GDriveFindJournalForPatient:            "Find existing journal",
	GDriveSelectExistingJournalInstruction: "Or connect an existing journal in Google Drive:",
	GDriveNoJournalForPatient:              "No journal found",
	GDriveCreateJournalFailed:              "Patient was added, but I couldn't create the journal in Google Drive",
	GDriveJournalNotFound:                  "Patient was added, but I couldn't find the journal in Google Drive",
	GDriveTemplateFile:                     "New files will be created based on this template:",
	GDriveBaseDir:                          "New files will be created in this folder:",
	GDriveSuggestedJournal:                 "Suggestion",
	GDriveAcceptSuggestedJournal:           "Accept suggested journal",
	GDriveDeclineSuggestedJournal:          "Decline",
	GDriveExtraDirs:                        "In addition, these folders are included in the document search:",

	GenericAdd:          "Add",
	GenericAge:          "Age",
	GenericAvatar:       "Avatar",
	GenericCancel:       "Cancel",
	GenericConfirm:      "Confirm",
	GenericDelete:       "Delete",
	GenericDetails:      "Details",
	GenericEmail:        "Email",
	GenericFrom:         "From",
	GenericTo:           "To",
	GenericGoBack:       "Go back",
	GenericHome:         "Home",
	GenericJournal:      "Journal",
	GenericLatin:        "Latin",
	GenericMove:         "Move",
	GenericMoveTo:       "Move to",
	GenericName:         "Name",
	GenericNone:         "None",
	GenericNever:        "Never",
	GenericNote:         "Note",
	GenericNotFound:     "Not found",
	GenericSettings:     "Settings",
	GenericSpecies:      "Species",
	GenericStatus:       "Status",
	GenericUpdate:       "Update",
	GenericFailed:       "Something went wrong. Contact the site administrator.",
	GenericSuccess:      "Success.",
	GenericMessage:      "Message",
	GenericURL:          "URL",
	GenericSearch:       "Search",
	GenericSave:         "Save",
	GenericUnauthorized: "Unauthorized.",
	GenericEdit:         "Edit",
	GenericUser:         "User",
	GenericEnabled:      "Enabled",

	HomesAddToHome:                  "Add",
	HomesArchiveHome:                "Archive rehab home",
	HomesCreateHome:                 "Create new rehab home",
	HomesCreateHomeNote:             "The name is usually that of a person, but there can be multiple people in a rehab home.",
	HomesEmptyHome:                  "There are no users in this rehab home.",
	HomesHomeName:                   "Rehab home",
	HomesRemoveFromCurrent:          "Remove from this rehab home",
	HomesUnassignedUsers:            "Users that are not associated with any rehab homes",
	HomesViewHomes:                  "Rehab homes",
	HomesPatients:                   "Patients",
	HomesUsers:                      "Users",
	HomeCapacity:                    "Capacity",
	HomeCapacityInstruction:         "Set the number of patients you can take, so that others can see if you have room for another or if you have too many.",
	HomePreferredSpecies:            "Favorite species",
	HomePreferredSpeciesInstruction: "Choose which species appear first in the list when you check in a new patient. The one at the very top will be selected by default. Drag and drop to reorder.",
	HomeAvailability:                "Availability",
	HomePeriodInvalid:               "Invalid period.",
	HomeAvailableIndefinitely:       "Available.",
	HomeUnavailableIndefinitely:     "Unavailable until further notice.",
	HomeUnavailableFromInstruction:  "The date when you become unavailable.",
	HomeUnavailableToInstruction:    "The last date when you are unavailable. Leave empty if you're unavailable indefinitely.",
	HomeNameWasUpdated:              "Rehab home name was updated.",

	ImportHeader:   "Importer",
	ImportPatients: "Importe patients",

	LanguageUpdateFailed: "Failed to update language",

	NavbarCalendar:  "Calendar",
	NavbarDashboard: "Dashboard",

	WikiHeader: "Wiki",

	PatientRegisteredTime: "Registrert",
	PatientCheckedOutTime: "Checked out",
	PatientEventTime:      "Time",
	PatientEventEvent:     "Event",
	PatientEventNote:      "Note",
	PatientEventUser:      "User",
	PatientEventHome:      "Home",
	PatientWasDeleted:     "Pasienten ble slettet.",
	PatientEdit:           "Edit",

	UserHomes:      "Associated rehab homes",
	UserIsHomeless: "No associated rehab homes",

	SearchModeBasic:           "Fast",
	SearchModeAdvanced:        "Thorough",
	SearchFilterCreated:       "Date",
	SearchFilterClear:         "Clear",
	SearchTimePreference:      "Prefer older/newer results",
	SearchTimePreferenceNone:  "None",
	SearchTimePreferenceOlder: "Older",
	SearchTimePreferenceNewer: "Newer",

	Status: map[model.Status]string{
		model.StatusUnknown:                        "Unknown",
		model.StatusAdmitted:                       "In rehab",
		model.StatusAdopted:                        "Adopted",
		model.StatusReleased:                       "Released",
		model.StatusTransferredOutsideOrganization: "Transferred outside organization",
		model.StatusDead:                           "Dead",
		model.StatusEuthanized:                     "Euthanized",
		model.StatusDeleted:                        "Deleted",
	},

	Event: map[model.EventID]string{
		model.EventIDUnknown:                        "Unknown",
		model.EventIDRegistered:                     "Registered",
		model.EventIDAdopted:                        "Adopted",
		model.EventIDReleased:                       "Released",
		model.EventIDTransferredToOtherHome:         "Transferred",
		model.EventIDTransferredOutsideOrganization: "Transferred outside of organisation",
		model.EventIDDied:                           "Died",
		model.EventIDEuthanized:                     "Euthanized",
		model.EventIDStatusChanged:                  "Status changed",
		model.EventIDDeleted:                        "Deleted",
		model.EventIDNameChanged:                    "Name changed",
		model.EventIDJournalCreated:                 "Created journal",
		model.EventIDJournalAttached:                "Linked journal",
		model.EventIDJournalDetached:                "Unlinked journal",
		model.EventIDSpeciesChanged:                 "Changed species",
	},

	CapabilitiesHeader:            "Access levels and capabilities",
	CapabilitiesLink:              "Read about access levels in Bino",
	CapabilitiesYourAccessLevelIs: "Your access level is: ",
	CapabilitiesExplanation:       "Here is the list of actions users with different levels can perform: ",
	Capabilities: map[model.Cap]string{
		model.CapViewAllActivePatients: "View all patients currently in rehab",
		model.CapViewAllFormerPatients: "View all patients who have been in rehab",
		model.CapViewAllHomes:          "View all rehab homes",
		model.CapViewAllUsers:          "View all users",
		model.CapViewCalendar:          "View the calendar",
		model.CapSearch:                "Search in journals",
		model.CapSetOwnPreferences:     "Set own preferences for language etc.",
		model.CapCheckInPatient:        "Check in patients",
		model.CapManageOwnPatients:     "Edit information about own patients",
		model.CapManageAllPatients:     "Edit all patients",
		model.CapManageOwnHomes:        "Edit information about own rehab home",
		model.CapManageAllHomes:        "Edit information about all rehab homes",
		model.CapCreatePatientJournal:  "Create new patient journals in Google Drive",
		model.CapManageSpecies:         "Edit the list of species",
		model.CapManageUsers:           "Edit information about other users",
		model.CapDeleteUsers:           "Delete users",
		model.CapViewAdminTools:        "View list of admin tools",
		model.CapViewGDriveSettings:    "View Google Drive settings",
		model.CapInviteToGDrive:        "Invite users to the Google Drive folder from Bino",
		model.CapInviteToBino:          "Invite new users to Bino",
	},

	UnavailablePeriods:              "Unavailable during the following periods:",
	AddUnavailablePeriodInstruction: "Fill in the form to let others know that you will be unavailable for a period:",
}

func (l *Language) AccessLevelBlocked(al model.AccessLevel) string {
	switch l.ID {
	case NO.ID:
		return fmt.Sprintf("Du har ikke tilgang til dette (trenger tilgangsnivå: %s).", l.AccessLevels[al])
	case EN.ID:
		fallthrough
	default:
		return fmt.Sprintf("You don't have access to this (access level required: %s).", l.AccessLevels[al])
	}
}

func (l *Language) FormatEvent(e int32, assocID pgtype.Int4) string {
	event := model.EventID(e)

	switch event {
	case model.EventIDStatusChanged:
		return l.formatStatusChanged(model.Status(assocID.Int32))
	default:
		if str, ok := l.Event[event]; ok {
			return str
		}
	}
	return event.String()
}

func (l *Language) formatTagAdded(tagName string) string {
	switch l.ID {
	case model.LanguageIDNO:
		return fmt.Sprintf("Tagget som '%s'", tagName)
	case model.LanguageIDEN:
		return fmt.Sprintf("Tagged as '%s'", tagName)
	default:
		return tagName
	}
}

func (l *Language) formatTagRemoved(tagName string) string {
	switch l.ID {
	case model.LanguageIDNO:
		return fmt.Sprintf("Fjernet taggen '%s'", tagName)
	case model.LanguageIDEN:
		return fmt.Sprintf("Removed tag '%s'", tagName)
	default:
		return tagName
	}
}

func (l *Language) formatStatusChanged(status model.Status) string {
	switch l.ID {
	case model.LanguageIDNO:
		return fmt.Sprintf("Endret status til '%s'", status)
	case model.LanguageIDEN:
		return fmt.Sprintf("Changed status to '%s'", status)
	default:
		return status.String()
	}
}

func (l *Language) FormatTimeRelWithAbsFallback(t time.Time) string {
	if t.IsZero() {
		return l.GenericNever
	}

	rel := l.FormatTimeRel(t)
	if rel != "" {
		return rel
	}
	return l.FormatTimeAbs(t)
}

func (l *Language) FormatTimeAbsWithRelParen(t time.Time) string {
	if t.IsZero() {
		return l.GenericNever
	}

	abs := l.FormatTimeAbs(t)
	rel := l.FormatTimeRel(t)
	if rel == "" {
		return abs
	}
	return fmt.Sprintf("%s (%s)", abs, rel)
}

func (l *Language) FormatDateAbs(t time.Time) string {
	if t.IsZero() {
		return l.GenericNever
	}

	switch l.ID {
	case model.LanguageIDNO:
		if t.Year() == time.Now().Year() {
			return fmt.Sprintf("%d. %s",
				t.Day(),
				l.Months[t.Month()],
			)
		} else {
			return fmt.Sprintf("%d. %s %d",
				t.Day(),
				l.Months[t.Month()],
				t.Year(),
			)
		}
	case model.LanguageIDEN:
		if t.Year() == time.Now().Year() {
			return t.Format("January 2")
		} else {
			return t.Format("January 2, 2006")
		}
	default:
		return t.String()
	}
}

func (l *Language) FormatTimeAbs(t time.Time) string {
	if t.IsZero() {
		return l.GenericNever
	}

	switch l.ID {
	case model.LanguageIDNO:
		if t.Year() == time.Now().Year() {
			return fmt.Sprintf("%d. %s kl. %02d:%02d",
				t.Day(),
				l.Months[t.Month()],
				t.Hour(),
				t.Minute(),
			)
		} else {
			return fmt.Sprintf("%d. %s %d kl. %02d:%02d",
				t.Day(),
				l.Months[t.Month()],
				t.Year(),
				t.Hour(),
				t.Minute(),
			)
		}
	case model.LanguageIDEN:
		if t.Year() == time.Now().Year() {
			return t.Format("January 2, 2006 at 3:04 PM")
		} else {
			return t.Format("January 2 at 3:04 PM")
		}
	default:
		return t.String()
	}
}

func (l *Language) FormatTimeRel(t time.Time) string {
	if t.IsZero() {
		return l.GenericNever
	}

	now := time.Now()
	diff := now.Sub(t)

	switch l.ID {
	case model.LanguageIDNO:
		if diff < -356*24*time.Hour {
			return ""
		}
		if diff < -2*24*time.Hour {
			return fmt.Sprintf("om %d dager", -int(diff.Hours()/24))
		}
		if diff < -24*time.Hour {
			return fmt.Sprintf("om 1 dag")
		}
		if diff < -2*time.Hour {
			return fmt.Sprintf("om %d timer", -int(diff.Hours()))
		}
		if diff < -time.Hour {
			return fmt.Sprintf("om 1 time")
		}
		if diff < -2*time.Minute {
			return fmt.Sprintf("om %d minutter", -int(diff.Minutes()))
		}
		if diff < -time.Minute {
			return fmt.Sprintf("om 1 minutt")
		}
		if diff < -2*time.Second {
			return fmt.Sprintf("om %d sekunder", -int(diff.Seconds()))
		}
		if diff < -time.Second {
			return fmt.Sprintf("om 1 sekund")
		}
		if diff < time.Second {
			return fmt.Sprintf("akkurat nå")
		}
		if diff < 2*time.Second {
			return fmt.Sprintf("for 1 sekund siden")
		}
		if diff < time.Minute {
			return fmt.Sprintf("for %d sekunder siden", int(diff.Seconds()))
		}
		if diff < 2*time.Minute {
			return fmt.Sprintf("for 1 minutt siden")
		}
		if diff < time.Hour {
			return fmt.Sprintf("for %d minutter siden", int(diff.Minutes()))
		}
		if diff < 2*time.Hour {
			return fmt.Sprintf("for 1 time siden")
		}
		if diff < 24*time.Hour {
			return fmt.Sprintf("for %d timer siden", int(diff.Hours()))
		}
		if diff < 2*24*time.Hour {
			return fmt.Sprintf("for 1 dag siden")
		}
		if diff < 356*24*time.Hour {
			return fmt.Sprintf("for %d dager siden", int(diff.Hours()/24))
		}
	case model.LanguageIDEN:
		if diff < -356*24*time.Hour {
			return ""
		}
		if diff < -2*24*time.Hour {
			return fmt.Sprintf("in %d days", -int(diff.Hours()/24))
		}
		if diff < -24*time.Hour {
			return fmt.Sprintf("in 1 day")
		}
		if diff < -2*time.Hour {
			return fmt.Sprintf("in %d hours", -int(diff.Hours()))
		}
		if diff < -time.Hour {
			return fmt.Sprintf("in 1 hour")
		}
		if diff < -2*time.Minute {
			return fmt.Sprintf("in %d minutes", -int(diff.Minutes()))
		}
		if diff < -time.Minute {
			return fmt.Sprintf("in 1 minute")
		}
		if diff < -2*time.Second {
			return fmt.Sprintf("in %d seconds", -int(diff.Seconds()))
		}
		if diff < -time.Second {
			return fmt.Sprintf("in 1 second")
		}
		if diff < time.Second {
			return fmt.Sprintf("just now")
		}
		if diff < 2*time.Second {
			return fmt.Sprintf("1 second ago")
		}
		if diff < time.Minute {
			return fmt.Sprintf("%d seconds ago", int(diff.Seconds()))
		}
		if diff < 2*time.Minute {
			return fmt.Sprintf("1 minute ago")
		}
		if diff < time.Hour {
			return fmt.Sprintf("%d minutes ago", int(diff.Minutes()))
		}
		if diff < 2*time.Hour {
			return fmt.Sprintf("1 hour ago")
		}
		if diff < 24*time.Hour {
			return fmt.Sprintf("%d hours ago", int(diff.Hours()))
		}
		if diff < 2*24*time.Hour {
			return fmt.Sprintf("1 day ago")
		}
		if diff < 356*24*time.Hour {
			return fmt.Sprintf("%d days ago", int(diff.Hours()/24))
		}
	}
	return ""
}

func (l *Language) AdminDefaultInviteMessage(inviter string) string {
	switch l.ID {
	case model.LanguageIDNO:
		return fmt.Sprintf("%s har invitert deg til å opprette en bruker i Bino.", inviter)
	case model.LanguageIDEN:
		fallthrough
	default:
		return fmt.Sprintf("%s has invited you to create a user in Bino.", inviter)
	}
}

var Languages = map[int32]*Language{
	int32(model.LanguageIDNO): NO,
	int32(model.LanguageIDEN): EN,
}

func GetLanguage(id int32) *Language {
	lang, ok := Languages[id]
	if !ok {
		return EN
	}
	return lang
}
