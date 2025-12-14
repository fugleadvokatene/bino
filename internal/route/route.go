package route

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/model"
)

type Route struct {
	Path    string
	Handler http.Handler
	Cap     model.Cap
}
