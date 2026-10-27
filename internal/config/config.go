package config

import (
	"encoding/json"
	"fmt"
	"os"
	"time"
	// Time zones regardless of what the host has installed
	_ "time/tzdata"

	"github.com/fugleadvokatene/bino/internal/gdrive"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/privacy"
	"github.com/fugleadvokatene/bino/internal/security"
)

type Config struct {
	Privacy        privacy.Config
	Auth           AuthConfig
	HTTP           HTTPConfig
	GoogleDrive    gdrive.Config
	SystemLanguage model.LanguageID
	SystemBaseURL  string
	Organization   string
	MascotURL      string
	Security       security.Config
	// IANA time zone the organization works in, e.g. "Europe/Oslo". Used to
	// split days in statistics. Defaults to the server's local time zone.
	TimeZone string

	location *time.Location
}

func Load(file string) (*Config, error) {
	raw, err := os.ReadFile(file)
	if err != nil {
		return nil, fmt.Errorf("reading config file '%s': %w", file, err)
	}

	var config Config
	if err := json.Unmarshal(raw, &config); err != nil {
		return nil, fmt.Errorf("corrupted config file '%s': %w", file, err)
	}

	config.location = time.Local
	if config.TimeZone != "" {
		if config.location, err = time.LoadLocation(config.TimeZone); err != nil {
			return nil, fmt.Errorf("invalid TimeZone in config file '%s': %w", file, err)
		}
	}
	return &config, nil
}

// Location is the organization's time zone, see TimeZone
func (config *Config) Location() *time.Location {
	return config.location
}

func (config *Config) BinoURLForPatient(patient int32) string {
	return fmt.Sprintf("%s/patient/%d", config.SystemBaseURL, patient)
}
