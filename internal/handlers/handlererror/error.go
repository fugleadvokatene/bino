package handlererror

import (
	"fmt"
	"net/http"

	"github.com/fugleadvokatene/bino/internal/request"
)

func Error(w http.ResponseWriter, r *http.Request, err error) {
	ctx := r.Context()
	cd := request.MustLoadCommonData(ctx)
	w.WriteHeader(http.StatusInternalServerError)
	cd.Subtitle = cd.Language.GenericFailed
	_ = ErrorPage(cd, err, request.LastGoodURL(r)).Render(ctx, w)
	request.LogError(r, err)
}

func NotFound(w http.ResponseWriter, r *http.Request, err error) {
	ctx := r.Context()
	cd := request.MustLoadCommonData(ctx)
	w.WriteHeader(http.StatusNotFound)
	_ = NotFoundPage(cd, err.Error(), request.LastGoodURL(r)).Render(ctx, w)
	request.LogError(r, err)
}

func PathNotFound(w http.ResponseWriter, r *http.Request) {
	NotFound(w, r, fmt.Errorf("not found: %s %s", r.Method, r.RequestURI))
}
