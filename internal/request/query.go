package request

import (
	"fmt"
	"net/http"
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
