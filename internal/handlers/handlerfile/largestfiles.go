package handlerfile

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/request"
)

const nLargestFiles = int32(50)

type largestFiles struct {
	DB *db.Database
}

func (h *largestFiles) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	data := request.MustLoadCommonData(ctx)

	files, err := h.DB.GetLargestFiles(ctx, nLargestFiles)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	_ = LargestFilesPage(data, files).Render(ctx, w)
}
