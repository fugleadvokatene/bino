package handleruseradmin

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/request"
)

type confirmScrubOrNuke struct {
	Nuke bool
	DB   *db.Database
}

func (h *confirmScrubOrNuke) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	data := request.MustLoadCommonData(ctx)

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

	header := data.Language.AdminScrubUserData
	confirmMsg := data.Language.AdminScrubUserDataConfirm
	dest := "scrub"
	if h.Nuke {
		header = data.Language.AdminNukeUser
		confirmMsg = data.Language.AdminNukeUserConfirm
		dest = "nuke"
	}

	UserConfirmScrubOrNuke(data, user.ToUserView(), header, confirmMsg, dest, r.Referer()).Render(ctx, w)
}
