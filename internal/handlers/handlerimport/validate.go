package handlerimport

import (
	"log/slog"
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/request"
)

type validate struct {
	DB *db.Database
}

func (h *validate) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

	result := ParseForm(r, h.DB)
	if err := commonData.Cookies.Set("import-request", "json", &result); err != nil {
		request.LogR(r, slog.LevelError, "setting import-request cookie from AJAX: %v", err)
	}

	_ = ImportValidation(commonData, result).Render(ctx, w)
}
