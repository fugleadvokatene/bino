package handleruseradmin

import (
	"crypto/rand"
	"fmt"
	"net/http"
	"time"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
	"github.com/jackc/pgx/v5/pgconn"
	"github.com/jackc/pgx/v5/pgtype"
)

type invite struct {
	DB *db.Database
}

func (h *invite) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	data := request.MustLoadCommonData(ctx)

	email, err := request.GetPathValue(r, "email")
	if err != nil {
		email, err = request.GetFormValue(r, "email")
	}

	var home int32
	if err == nil {
		home, err = request.GetFormID(r, "home")
	}

	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	now := time.Now()
	expires := now.AddDate(0, 0, 14)

	// Generate 8-char invite code, handle collision
	inviteCodes := rand.Text()
	nInviteCodes := len(inviteCodes) / 8
	for i := range nInviteCodes {
		// Select next 8-char chunk
		code := inviteCodes[i*8 : (i+1)*8]

		// Try to insert
		if err := h.DB.Q.InsertInvitation(ctx, sql.InsertInvitationParams{
			ID:      code,
			Email:   pgtype.Text{String: email, Valid: true},
			Created: pgtype.Timestamptz{Time: now, Valid: true},
			Expires: pgtype.Timestamptz{Time: expires, Valid: true},
			Home:    pgtype.Int4{Int32: home, Valid: true},
		}); err != nil {
			if pgErr, ok := err.(*pgconn.PgError); ok && pgErr.Code == "23505" {
				// Conflicting invite key
				continue
			} else {
				data.Error(data.Language.AdminInvitationFailed, err)
				return
			}
		} else {
			data.Info(data.Language.AdminInvitationOKNoEmail)
			request.Redirect(w, r, "/users")
			return
		}
	}

	data.Error(data.Language.AdminInvitationFailed, fmt.Errorf("couldn't create code"))
	request.Redirect(w, r, "/users")
}
