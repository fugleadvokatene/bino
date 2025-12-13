package handlergdriveadmin

import (
	"context"
	"maps"
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/gdrive"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/request"
)

type Page struct {
	Worker *gdrive.Worker
	DB     *db.Database
}

func (h *Page) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

	info := h.Worker.GetGDriveConfigInfo()
	GDrivePage(ctx, commonData, info, h.DB).Render(ctx, w)
}

func getExtraBinoUsers(ctx context.Context, selectedDir gdrive.Item, db *db.Database) map[string]model.User {
	users := request.EmailToUserMapping(ctx, db)
	extraUsers := maps.Clone(users)
	for _, perm := range selectedDir.Permissions {
		if !perm.CanWrite() {
			continue
		}
		binoUser, ok := users[perm.Email]
		if !ok || !binoUser.Valid() {
			continue
		}
		delete(extraUsers, perm.Email)
	}
	return extraUsers
}
