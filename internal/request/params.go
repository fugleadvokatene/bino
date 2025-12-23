package request

import (
	"fmt"
	"net/http"
	"net/url"
	"strconv"
	"strings"

	"github.com/fugleadvokatene/bino/internal/generic"
)

func GetQueryValue(r *http.Request, field string) (string, error) {
	q := r.URL.Query()
	values, ok := q[field]
	if !ok {
		return "", fmt.Errorf("no such value: '%s'", field)
	}
	if len(values) != 1 {
		return "", fmt.Errorf("%d values named '%s", len(values), field)
	}
	return values[0], nil
}

func GetQueryID(r *http.Request, field string) (int32, error) {
	vStr, err := GetQueryValue(r, field)
	if err != nil {
		return 0, err
	}
	v, err := strconv.ParseInt(vStr, 10, 32)
	if err != nil {
		return 0, err
	}
	return int32(v), nil
}

func GetFormIDs(r *http.Request, fields ...string) (map[string]int32, error) {
	strings, err := GetFormValues(r, fields...)
	if err != nil {
		return nil, err
	}
	return stringsToIDs(strings)
}

func GetFormValues(r *http.Request, fields ...string) (map[string]string, error) {
	return generic.SliceToMapErr(fields, func(_ int, field string) (string, string, error) {
		v, err := GetFormValue(r, field)
		return field, v, err
	})
}

func GetOptionalFormValues(r *http.Request, fields ...string) map[string]string {
	return generic.SliceToMap(fields, func(field string) (string, string) {
		v, _ := GetFormValue(r, field)
		return field, v
	})
}

func GetFormID(r *http.Request, field string) (int32, error) {
	vStr, err := GetFormValue(r, field)
	if err != nil {
		return 0, err
	}
	v, err := strconv.ParseInt(vStr, 10, 32)
	if err != nil {
		return 0, err
	}
	return int32(v), nil
}

func GetFormMultiValue(r *http.Request, field string) ([]string, error) {
	if err := r.ParseForm(); err != nil {
		return nil, fmt.Errorf("parsing form: %w", err)
	}

	if data, err := LoadCommonData(r.Context()); err == nil {
		if data.User == nil {
			return nil, fmt.Errorf("form submitted by user that wasn't logged in")
		}
		if !data.User.CSRFCheckPassed {
			csrf, ok := r.Form["csrf"]
			if !ok {
				return nil, fmt.Errorf("missing CSRF token in request")
			}
			if len(csrf) > 1 {
				return nil, fmt.Errorf("%d CSRF tokens in request", len(csrf))
			}
			if csrf[0] != data.User.CSRFToken {
				return nil, fmt.Errorf("CSRF check failed")
			}
			data.User.CSRFCheckPassed = true
		}
	}

	values, ok := r.Form[field]
	if !ok {
		return nil, fmt.Errorf("missing form value '%s'", field)
	}
	return values, nil
}

func GetFormValue(r *http.Request, field string) (string, error) {
	values, err := GetFormMultiValue(r, field)
	if err != nil {
		return "", err
	}
	if len(values) != 1 {
		return "", fmt.Errorf("expect 1 form value for '%s', got %d", field, len(values))
	}
	return values[0], nil
}

func GetPathIDs(r *http.Request, fields ...string) (map[string]int32, error) {
	strings, err := GetPathValues(r, fields...)
	if err != nil {
		return nil, err
	}
	return stringsToIDs(strings)
}

func GetPathValues(r *http.Request, fields ...string) (map[string]string, error) {
	return generic.SliceToMapErr(fields, func(_ int, field string) (string, string, error) {
		v, err := GetPathValue(r, field)
		return field, v, err
	})
}

func GetPathID(r *http.Request, field string) (int32, error) {
	vStr := r.PathValue(field)
	v, err := strconv.ParseInt(vStr, 10, 32)
	if err != nil {
		return 0, err
	}
	return int32(v), nil
}

func GetPathValue(r *http.Request, field string) (string, error) {
	v := r.PathValue(field)
	var err error
	if v == "" {
		err = fmt.Errorf("no such path value: '%s'", field)
	}
	return v, err
}

func GetCheckboxValue(r *http.Request, field string) bool {
	v, err := GetFormValue(r, field)
	return err == nil && v == "on"
}

func stringsToIDs(in map[string]string) (map[string]int32, error) {
	return generic.MapToMapErr(in, func(str string) (int32, error) {
		v, err := strconv.ParseInt(str, 10, 32)
		if err != nil {
			return 0, err
		}
		return int32(v), nil
	})
}

func ParseFileURLFromSameSite(r *http.Request, raw string) (int32, error) {
	ref := r.Referer()
	if ref == "" {
		return 0, fmt.Errorf("no referer")
	}

	refURL, err := url.Parse(ref)
	if err != nil {
		return 0, err
	}

	rawURL, err := url.Parse(raw)
	if err != nil {
		return 0, err
	}

	if rawURL.Host != "" && rawURL.Host != refURL.Host {
		return 0, fmt.Errorf("not same site")
	}

	parts := strings.Split(strings.Trim(rawURL.Path, "/"), "/")
	if len(parts) != 3 || parts[0] != "file" {
		return 0, fmt.Errorf("invalid path")
	}

	id64, err := strconv.ParseInt(parts[1], 10, 32)
	if err != nil {
		return 0, err
	}

	return int32(id64), nil
}
