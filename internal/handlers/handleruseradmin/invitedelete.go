package handleruseradmin

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/request"
)

type inviteDelete struct {
	DB *db.Database
}

func (h *inviteDelete) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	data := request.MustLoadCommonData(ctx)

	id, err := request.GetPathValue(r, "id")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	if err := h.DB.Q.DeleteInvitation(ctx, id); err != nil {
		data.Error(data.Language.GenericFailed, err)
	} else {
		data.Success(data.Language.GenericSuccess)
	}

	request.Redirect(w, r, "/users")
	return
}
