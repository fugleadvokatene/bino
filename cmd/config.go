package main

import (
	"encoding/json"
	"fmt"
	"os"

	"github.com/fugleadvokatene/bino/internal/enums"
)

var BuildKey string

type Config struct {
	Privacy        PrivacyConfig
	Auth           AuthConfig
	HTTP           HTTPConfig
	GoogleDrive    GDriveConfig
	SystemLanguage enums.LanguageID
	SystemBaseURL  string
}

func loadConfig(file string) (Config, error) {
	raw, err := os.ReadFile(file)
	if err != nil {
		return Config{}, fmt.Errorf("reading config file '%s': %w", file, err)
	}

	var config Config
	if err := json.Unmarshal(raw, &config); err != nil {
		return Config{}, fmt.Errorf("corrupted config file '%s': %w", file, err)
	}
	return config, nil
}

func (config *Config) BinoURLForPatient(patient int32) string {
	return fmt.Sprintf("%s/patient/%d", config.SystemBaseURL, patient)
}
