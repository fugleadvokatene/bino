package handlerfile

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/pagination"
	"github.com/fugleadvokatene/bino/internal/request"
)

const NFilesPerPage = int32(20)

type uploadPage struct {
	DB *db.Database
}

func (h *uploadPage) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	data := request.MustLoadCommonData(ctx)

	data.Subtitle = data.Language.FilesUploadHeader

	offset, err := request.GetQueryID(r, "offset")
	if err != nil {
		offset = 0
	}

	files, n, err := h.DB.GetFiles(ctx, NFilesPerPage, offset)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	ps := pagination.New(offset, n, NFilesPerPage, "/file")
	_ = FileUploadPage(data, files, ps).Render(ctx, w)
}
