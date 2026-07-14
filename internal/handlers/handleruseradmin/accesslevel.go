package handleruseradmin

import (
	"fmt"
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
)

type postUserAccessLevel struct {
	DB *db.Database
}

func (h *postUserAccessLevel) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	data := request.MustLoadCommonData(ctx)

	id, err := request.GetPathID(r, "user")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	if id == data.User.AppuserID {
		data.Error(data.Language.AdminAccessLevelChangeDenied, fmt.Errorf("user tried to change their own access level"))
		request.Redirect(w, r, "/users")
		return
	}

	accessLevel, err := request.GetFormID(r, "access-level")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	user, err := h.DB.Q.GetUser(ctx, id)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	if model.AccessLevel(user.AccessLevel) >= data.User.AccessLevel || model.AccessLevel(accessLevel) > data.User.AccessLevel {
		data.Error(data.Language.AdminAccessLevelChangeDenied, fmt.Errorf("user with access level %d tried to change the access level of user %d (currently %d) to %d", data.User.AccessLevel, id, user.AccessLevel, accessLevel))
		request.Redirect(w, r, "/users")
		return
	}

	if err := h.DB.Q.SetUserAccessLevel(ctx, sql.SetUserAccessLevelParams{
		ID:          id,
		AccessLevel: accessLevel,
	}); err != nil {
		data.Error(data.Language.AdminInvitationFailed, err)
		request.Redirect(w, r, "/users")
		return
	}

	data.Success(data.Language.GenericSuccess)
	request.Redirect(w, r, "/users")
}
