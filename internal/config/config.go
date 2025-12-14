package config

import (
	"encoding/json"
	"fmt"
	"os"

	"github.com/fugleadvokatene/bino/internal/gdrive"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/privacy"
)

type Config struct {
	Privacy        privacy.Config
	Auth           AuthConfig
	HTTP           HTTPConfig
	GoogleDrive    gdrive.Config
	SystemLanguage model.LanguageID
	SystemBaseURL  string
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
	return &config, nil
}

func (config *Config) BinoURLForPatient(patient int32) string {
	return fmt.Sprintf("%s/patient/%d", config.SystemBaseURL, patient)
}
