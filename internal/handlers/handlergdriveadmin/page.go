package handlergdriveadmin

import (
	"context"
	"maps"
	"net/http"
	"strings"

	"github.com/agnivade/levenshtein"
	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/gdrive"
	"github.com/fugleadvokatene/bino/internal/generic"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/request"
)

type page struct {
	Worker *gdrive.Worker
	DB     *db.Database
}

func (h *page) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

	info := h.Worker.GetGDriveConfigInfo()
	homes, err := h.DB.Homes(ctx)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	homeNames := generic.SliceToSlice(homes, func(in model.Home) string { return strings.ToLower(in.Name) })
	predictedInviteIDs := make(map[string]string, len(info.JournalFolder.Permissions))
	for _, p := range info.JournalFolder.Permissions {
		predictedInviteIDs[p.Email] = closest(p.Email, homeNames)
	}

	GDrivePage(ctx, commonData, info, homes, predictedInviteIDs, h.DB).Render(ctx, w)
}

func closest(email string, names []string) string {
	// normalize
	email = strings.ToLower(email)

	// get rid of the junk
	if i := strings.Index(email, "@"); i >= 0 {
		email = email[:i]
	}
	email = strings.NewReplacer(".", "", "_", "", "-", "", "+", "").Replace(email)

	// get the best one
	best := ""
	bestDist := -1
	for _, n := range names {
		d := levenshtein.ComputeDistance(email, n)
		if bestDist == -1 || d < bestDist {
			best = n
			bestDist = d
		}
	}
	return best
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
