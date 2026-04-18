package handlergdriveadmin

import (
	"context"
	"maps"
	"net/http"
	"strconv"
	"strings"

	"github.com/agnivade/levenshtein"
	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/gdrive"
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

	info := h.Worker.GetGDriveConfigInfo(ctx)
	homes, err := h.DB.Homes(ctx, 0)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	divisions, err := h.DB.GetDivisions(ctx)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	indexerState, _ := h.Worker.GetIndexerState()

	openDivision, _ := strconv.ParseInt(r.URL.Query().Get("open"), 10, 32)

	GDrivePage(ctx, commonData, info, divisions, homes, h.DB, indexerState, int32(openDivision)).Render(ctx, w)
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

func findDivisionConfig(configs []gdrive.DivisionConfig, id int32) (gdrive.DivisionConfig, bool) {
	for _, c := range configs {
		if c.DivisionID == id {
			return c, true
		}
	}
	return gdrive.DivisionConfig{}, false
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
