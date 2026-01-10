package handlerhomeadmin

import (
	"context"
	"fmt"
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
	"github.com/jackc/pgx/v5/pgtype"
)

type form struct {
	DB *db.Database
}

func (h *form) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	formID, err := request.GetFormValue(r, "form-id")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	switch formID {
	case "create-home":
		h.postHomeCreateHome(w, r)
	case "move-home":
		h.postHomeMoveHome(w, r)
	case "create-division":
		h.postHomeCreateDivision(w, r)
	case "add-user":
		h.postHomeAddUser(w, r)
	default:
		handlererror.Error(w, r, fmt.Errorf("unknown form ID: '%s'", formID))
	}
}

func (h *form) postHomeCreateHome(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	name, err := request.GetFormValue(r, "name")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	err = h.DB.Q.InsertHome(ctx, name)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	request.RedirectToReferer(w, r)
}

func (h *form) postHomeMoveHome(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	fields, err := request.GetFormIDs(r, "home-id", "division-id")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}
	homeID, divisionID := fields["home-id"], fields["division-id"]

	if err := h.DB.Q.MoveHome(ctx, sql.MoveHomeParams{
		ID:       homeID,
		Division: divisionID,
	}); err != nil {
		handlererror.Error(w, r, err)
		return
	}

	request.RedirectToReferer(w, r)
}

func (h *form) postHomeCreateDivision(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	name, err := request.GetFormValue(r, "name")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	err = h.DB.Q.InsertDivision(ctx, name)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	request.RedirectToReferer(w, r)
}

func (h *form) postHomeAddUser(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	fields, err := request.GetFormIDs(r, "home-id", "user-id")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}
	userID, homeID := fields["user-id"], fields["home-id"]

	if err := h.DB.Transaction(ctx, func(ctx context.Context, db *db.Database) error {
		if homeID > 0 {
			if err := h.DB.Q.AddUserToHome(ctx, sql.AddUserToHomeParams{
				HomeID: pgtype.Int4{Int32: homeID, Valid: true},
				ID:     int32(userID),
			}); err != nil {
				return fmt.Errorf("adding user to home: %w", err)
			}
		}
		return nil
	}); err != nil {
		handlererror.Error(w, r, fmt.Errorf("failed to add user: %w", err))
		return
	}

	request.RedirectToReferer(w, r)
}
