package handleruser

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/generic"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
)

type getUser struct {
	DB *db.Database
}

func (h *getUser) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

	id, err := request.GetPathID(r, "user")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	user, err := h.DB.Q.GetUser(ctx, id)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}
	commonData.Subtitle = user.DisplayName

	homes, err := h.DB.Q.GetHomesWithDataForUser(ctx, user.ID)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	userView := user.ToModel()
	userView.Homes = generic.SliceToSlice(homes, func(h sql.Home) model.Home { return h.ToModel() })

	UserPage(ctx, commonData, userView).Render(r.Context(), w)
}
