package handlergdriveadmin

import (
	"fmt"
	"net/http"

	"github.com/fugleadvokatene/bino/internal/gdrive"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/request"
)

type Invite struct {
	Worker *gdrive.Worker
	Config *gdrive.Config
}

func (h *Invite) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

	email, err := request.GetPathValue(r, "email")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	if err := h.Worker.InviteUser(h.Config.JournalFolder, email, "writer"); err != nil {
		handlererror.Error(w, r, fmt.Errorf("inviting user: %w", err))
		return
	}

	commonData.Success(commonData.Language.GDriveUserInvited)

	request.Redirect(w, r, "/gdrive")
}
