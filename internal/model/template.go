package model

import (
	"regexp"
	"strings"
)

// IsRequired reports whether a journal template must contain this variable
// to be considered valid. Variables added after templates were already in
// use are optional, so that existing templates keep working.
func (t Template) IsRequired() bool {
	return t != TemplateRehabber
}

// Token is how the variable is written in a template, e.g. "$Name".
// The bare form ("Name") is still replaced for compatibility with old templates.
func (t Template) Token() string {
	return "$" + t.String()
}

// TemplateTokenPattern matches a variable in a journal template: $ followed by
// letters, digits or underscores, e.g. "$Site".
var TemplateTokenPattern = regexp.MustCompile(`\$[\p{L}\p{N}_]+`)

var templateTokenExact = regexp.MustCompile(`^` + TemplateTokenPattern.String() + `$`)

// IsTemplateToken reports whether s is exactly one template variable token.
func IsTemplateToken(s string) bool {
	return templateTokenExact.MatchString(s)
}

// TemplateVariableName strips the leading $: "$Site" gives "Site".
func TemplateVariableName(token string) string {
	return strings.TrimPrefix(token, "$")
}
