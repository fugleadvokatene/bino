package handlerfile

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/request"
)

type uploadPage struct {
	DB *db.Database
}

func (h *uploadPage) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	data := request.MustLoadCommonData(ctx)

	data.Subtitle = data.Language.FilesUploadHeader

	files, err := h.DB.GetFilesAccessibleByUser(ctx, data.User.AppuserID)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	_ = FileUploadPage(data, files).Render(ctx, w)
}
