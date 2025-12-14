package model

import "fmt"

type FeatureFlagsState struct {
	Flags []FeatureFlagState
}

type FeatureFlagState struct {
	Flag  string
	Users []FeatureFlagUserState
}

func (ffs *FeatureFlagState) DeleteURL() string {
	return fmt.Sprintf("/ff/%s/delete", ffs.Flag)
}

type FeatureFlagUserState struct {
	UserID   int32
	UserName string
	Enabled  bool
}
