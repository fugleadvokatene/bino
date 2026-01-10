package debug

import (
	"bytes"
	"net/http"

	"github.com/a-h/htmlformat"
)

type captureWriter struct {
	header http.Header
	body   bytes.Buffer
	status int
}

func (c *captureWriter) Header() http.Header {
	return c.header
}

func (c *captureWriter) Write(b []byte) (int, error) {
	return c.body.Write(b)
}

func (c *captureWriter) WriteHeader(status int) {
	c.status = status
}

func FormatHTML(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		cw := &captureWriter{
			header: make(http.Header),
			status: http.StatusOK,
		}

		next.ServeHTTP(cw, r)

		for k, v := range cw.header {
			w.Header()[k] = v
		}

		w.WriteHeader(cw.status)

		var out bytes.Buffer
		err := htmlformat.Document(&out, &cw.body)
		if err != nil {
			w.Write(cw.body.Bytes())
			return
		}

		w.Write(out.Bytes())
	})
}
