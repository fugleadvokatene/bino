package main

import (
	"context"
	"crypto/rand"
	"fmt"
	"net/http"
	"time"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/generic"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
	"github.com/fugleadvokatene/bino/internal/view"
	"github.com/jackc/pgx/v5/pgconn"
	"github.com/jackc/pgx/v5/pgtype"
)

func (server *Server) userAdminHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	data := request.MustLoadCommonData(ctx)

	users, err := server.DB.Q.GetAppusers(ctx)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	invitations, err := server.DB.Q.GetInvitations(ctx)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	homes, err := server.DB.Q.GetHomes(ctx)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	UserAdmin(data, generic.SliceToSlice(homes, func(in sql.Home) view.Home {
		return in.ToHomeView()
	}), generic.SliceToSlice(users, func(in sql.GetAppusersRow) view.User {
		return in.ToUserView()
	}), generic.SliceToSlice(invitations, func(in sql.GetInvitationsRow) view.Invitation {
		return in.ToInvitationView()
	})).Render(ctx, w)
}

func (server *Server) userConfirmScrubOrNukeHandler(w http.ResponseWriter, r *http.Request, nuke bool) {
	ctx := r.Context()
	data := request.MustLoadCommonData(ctx)

	id, err := request.GetPathID(r, "user")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	user, err := server.DB.Q.GetUser(ctx, id)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	header := data.Language.AdminScrubUserData
	confirmMsg := data.Language.AdminScrubUserDataConfirm
	dest := "scrub"
	if nuke {
		header = data.Language.AdminNukeUser
		confirmMsg = data.Language.AdminNukeUserConfirm
		dest = "nuke"
	}

	UserConfirmScrubOrNuke(data, user.ToUserView(), header, confirmMsg, dest, r.Referer()).Render(ctx, w)
}

func (server *Server) userConfirmScrubHandler(w http.ResponseWriter, r *http.Request) {
	server.userConfirmScrubOrNukeHandler(w, r, false)
}

func (server *Server) userConfirmNukeHandler(w http.ResponseWriter, r *http.Request) {
	server.userConfirmScrubOrNukeHandler(w, r, true)
}

func (server *Server) userDoScrubOrNukeHandler(w http.ResponseWriter, r *http.Request, nuke bool) {
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

	user, err := server.DB.Q.GetUser(ctx, id)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	if user.Email == email {
		if nuke {
			err = server.NukeUser(ctx, id)
		} else {
			err = server.DeleteUser(ctx, id)
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

func (server *Server) userDoScrubHandler(w http.ResponseWriter, r *http.Request) {
	server.userDoScrubOrNukeHandler(w, r, false)
}

func (server *Server) userDoNukeHandler(w http.ResponseWriter, r *http.Request) {
	server.userDoScrubOrNukeHandler(w, r, true)
}

// Delete information associated with user
func (server *Server) DeleteUser(ctx context.Context, id int32) error {
	return server.Transaction(ctx, func(ctx context.Context, db *db.Database) error {
		if err := db.Q.RemoveHomesForAppuser(ctx, id); err != nil {
			return fmt.Errorf("removing homes: %w", err)
		}
		if err := db.Q.DeleteSessionsForUser(ctx, id); err != nil {
			return fmt.Errorf("deleting sessions: %w", err)
		}
		if err := db.Q.ScrubAppuser(ctx, id); err != nil {
			return fmt.Errorf("scrubbing user: %w", err)
		}
		return nil
	})
}

// Delete not only the information associated with the user, but any evidence that the user ever existed
func (server *Server) NukeUser(ctx context.Context, id int32) error {
	if err := server.DeleteUser(ctx, id); err != nil {
		return fmt.Errorf("deleting user: %w", err)
	}
	return server.Transaction(ctx, func(ctx context.Context, db *db.Database) error {
		if err := db.Q.DeleteEventsCreatedByUser(ctx, id); err != nil {
			return fmt.Errorf("deleting events created by user: %w", err)
		}
		if err := db.Q.DeleteAppuserLanguage(ctx, id); err != nil {
			return fmt.Errorf("deleting appuser language: %w", err)
		}
		if err := db.Q.DeleteAppuser(ctx, id); err != nil {
			return fmt.Errorf("deleting appuser: %w", err)
		}
		return nil
	})
}

func (server *Server) inviteHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	data := request.MustLoadCommonData(ctx)

	email, err := request.GetPathValue(r, "email")
	if err != nil {
		email, err = request.GetFormValue(r, "email")
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
		if err := server.DB.Q.InsertInvitation(ctx, sql.InsertInvitationParams{
			ID:      code,
			Email:   pgtype.Text{String: email, Valid: true},
			Created: pgtype.Timestamptz{Time: now, Valid: true},
			Expires: pgtype.Timestamptz{Time: expires, Valid: true},
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

func (server *Server) inviteDeleteHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	data := request.MustLoadCommonData(ctx)

	id, err := request.GetPathValue(r, "id")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	if err := server.DB.Q.DeleteInvitation(ctx, id); err != nil {
		data.Error(data.Language.GenericFailed, err)
	} else {
		data.Success(data.Language.GenericSuccess)
	}

	request.Redirect(w, r, "/users")
	return
}
