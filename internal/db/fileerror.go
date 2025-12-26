package db

import (
	"fmt"
	"net/http"
)

type FileError struct {
	inner          error
	httpStatusCode int
}

func newFileError(httpStatusCode int, message string, args ...any) error {
	return FileError{inner: fmt.Errorf(message, args...), httpStatusCode: httpStatusCode}
}

func (fe FileError) Error() string {
	return fe.inner.Error()
}

func (fe FileError) HTTPStatusCode() int {
	return fe.httpStatusCode
}

func GetHTTPStatusCode(err error) int {
	if iface, ok := err.(interface{ HTTPStatusCode() int }); ok {
		return iface.HTTPStatusCode()
	}
	return http.StatusInternalServerError
}
