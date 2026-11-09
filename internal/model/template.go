package model

// IsRequired reports whether a journal template must contain this variable
// to be considered valid. Variables added after templates were already in
// use are optional, so that existing templates keep working.
func (t Template) IsRequired() bool {
	return t != TemplateRehabber
}
