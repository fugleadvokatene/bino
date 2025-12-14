package handleruseradmin

import (
	"fmt"
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/request"
)

type doScrubOrNuke struct {
	Nuke bool
	DB   *db.Database
}

func (h *doScrubOrNuke) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	data := request.MustLoadCommonData(ctx)

	id, err := request.GetPathID(r, "user")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	if id == data.User.AppuserID {
		handlererror.Error(w, r, fmt.Errorf("noo ur so pretty don't delete yourself"))
		return
	}

	email, err := request.GetFormValue(r, "confirm-email")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	user, err := h.DB.Q.GetUser(ctx, id)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	if user.Email == email {
		if h.Nuke {
			err = h.DB.NukeUser(ctx, id)
		} else {
			err = h.DB.DeleteUser(ctx, id)
		}
		if err != nil {
			data.Error(data.Language.AdminUserDeletionFailed, err)
		} else {
			data.Success(data.Language.AdminUserWasDeleted)
		}
	} else {
		data.Error(data.Language.AdminAbortedDueToWrongEmail, nil)
	}
	request.Redirect(w, r, "/users")
}
