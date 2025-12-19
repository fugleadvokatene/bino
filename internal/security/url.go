package security

import (
	"fmt"
	"net/url"
	"strings"

	"github.com/fugleadvokatene/bino/internal/generic"
)

var hostDenyList = generic.NewSet[string](
	"localhost",
)

type urlBlocked struct {
	URL    string
	Reason string
}

func (err urlBlocked) Error() string {
	return fmt.Sprintf("url %s is blocked because %s", err.URL, err.Reason)
}

func URLBlocked(raw string, reason string) error {
	return urlBlocked{URL: raw, Reason: reason}
}

func CheckURL(raw string) error {
	u, err := url.Parse(raw)
	if err != nil {
		return err
	}
	if u.Scheme != "https" {
		return URLBlocked(raw, "only https is allowed")
	}
	if u.Hostname() == "" {
		return URLBlocked(raw, "missing hostname")
	}
	host := strings.ToLower(u.Hostname())
	for denied := range hostDenyList {
		if host == denied || strings.HasSuffix(host, "."+denied) {
			return URLBlocked(raw, "explicitly denied host")
		}
	}
	return nil
}
