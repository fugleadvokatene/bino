package handleruseradmin

import (
	"fmt"
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/request"
)

type postUserDeactivate struct {
	DB          *db.Database
	Deactivated bool
}

func (h *postUserDeactivate) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	data := request.MustLoadCommonData(ctx)

	id, err := request.GetPathID(r, "user")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	if id == data.User.AppuserID {
		data.Error(data.Language.AdminAccessLevelChangeDenied, fmt.Errorf("user tried to deactivate themselves"))
		request.Redirect(w, r, "/users")
		return
	}

	user, err := h.DB.Q.GetUser(ctx, id)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	if model.AccessLevel(user.AccessLevel) >= data.User.AccessLevel {
		data.Error(data.Language.AdminAccessLevelChangeDenied, fmt.Errorf("user with access level %d tried to change deactivation status of user %d (access level %d)", data.User.AccessLevel, id, user.AccessLevel))
		request.Redirect(w, r, "/users")
		return
	}

	if err := h.DB.SetUserDeactivated(ctx, id, h.Deactivated); err != nil {
		data.Error(data.Language.AdminUserDeactivationFailed, err)
		request.Redirect(w, r, "/users")
		return
	}

	if h.Deactivated {
		data.Success(data.Language.AdminUserWasDeactivated)
	} else {
		data.Success(data.Language.AdminUserWasActivated)
	}
	request.Redirect(w, r, "/users")
}
