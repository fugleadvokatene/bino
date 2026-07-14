package handleruseradmin

import (
	"crypto/rand"
	"errors"
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
	"github.com/jackc/pgx/v5/pgconn"
	"github.com/jackc/pgx/v5/pgtype"
)

type postInvite struct {
	DB *db.Database
}

func (h *postInvite) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	data := request.MustLoadCommonData(ctx)

	email, err := request.GetFormValue(r, "email")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	home, err := request.GetFormID(r, "home")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	accessLevel, err := request.GetFormID(r, "access-level")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	if model.AccessLevel(accessLevel) > data.User.AccessLevel {
		data.Error(data.Language.AdminInvitationAccessLevelTooHigh, fmt.Errorf("user with access level %d tried to invite a user with access level %d", data.User.AccessLevel, accessLevel))
		request.Redirect(w, r, "/users")
		return
	}

	if home == 0 {
		newHomeName, err := request.GetFormValue(r, "new-home-name")
		if err != nil {
			handlererror.Error(w, r, err)
			return
		}

		newHomeName = strings.TrimSpace(newHomeName)
		if newHomeName == "" {
			data.Error(data.Language.AdminNewHomeNameRequired, fmt.Errorf("empty new home name"))
			request.Redirect(w, r, "/users")
			return
		}

		newHomeDivision, err := request.GetFormID(r, "new-home-division")
		if err != nil {
			handlererror.Error(w, r, err)
			return
		}

		home, err = h.DB.Q.InsertHomeReturningID(ctx, sql.InsertHomeReturningIDParams{
			Name:     newHomeName,
			Division: newHomeDivision,
		})
		if err != nil {
			data.Error(data.Language.AdminInvitationFailed, err)
			return
		}
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
			ID:          code,
			Email:       pgtype.Text{String: email, Valid: true},
			Created:     pgtype.Timestamptz{Time: now, Valid: true},
			Expires:     pgtype.Timestamptz{Time: expires, Valid: true},
			Home:        pgtype.Int4{Int32: home, Valid: true},
			Accesslevel: accessLevel,
		}); err != nil {
			var pgErr *pgconn.PgError
			if ok := errors.As(err, &pgErr); ok && pgErr.Code == "23505" {
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
