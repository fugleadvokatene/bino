package main

import (
	"context"
	"fmt"
	"net/http"
	"strconv"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
	"github.com/fugleadvokatene/bino/internal/view"
)

type HomeViewAdmin struct {
	ID    int32
	Name  string
	Users []view.User
}

func (hva *HomeViewAdmin) SetNameURL() string {
	return fmt.Sprintf("/homes/%d/set-name", hva.ID)
}

func (server *Server) getHomesHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

	homesDB, err := server.DB.Q.GetHomes(ctx)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	usersDB, err := server.DB.Q.GetAppusers(ctx)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	homes := make([]HomeViewAdmin, len(homesDB))
	for i, home := range homesDB {
		homes[i] = HomeViewAdmin{
			ID:    home.ID,
			Name:  home.Name,
			Users: nil,
		}
	}

	// todo(perf): make it not O(N^2)
	homeless := []view.User{}
	for _, user := range usersDB {
		view := user.ToUserView()
		found := false
		if user.HomeID.Valid {
			for i, home := range homesDB {
				if home.ID == user.HomeID.Int32 {
					homes[i].Users = append(homes[i].Users, view)
					found = true
					break
				}
			}
		}
		if !found {
			homeless = append(homeless, view)
		}
	}

	_ = HomesPage(commonData, homes, homeless).Render(ctx, w)
}

func (server *Server) postHomeHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

	formID, err := request.GetFormValue(r, "form-id")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	switch formID {
	case "create-home":
		server.postHomeCreateHome(w, r, commonData)
	case "add-user":
		server.postHomeAddUser(w, r, commonData)
	default:
		handlererror.Error(w, r, fmt.Errorf("unknown form ID: '%s'", formID))
	}
}

func (server *Server) postHomeSetName(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	home, err := request.GetPathID(r, "home")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	newName, err := request.GetFormValue(r, "value")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	err = server.DB.Q.UpdateHomeName(ctx, sql.UpdateHomeNameParams{
		ID:   home,
		Name: newName,
	})
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	request.RedirectToReferer(w, r)
}

func (server *Server) postHomeCreateHome(w http.ResponseWriter, r *http.Request, commonData *request.CommonData) {
	ctx := r.Context()

	name, err := request.GetFormValue(r, "name")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	err = server.DB.Q.InsertHome(ctx, name)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	request.RedirectToReferer(w, r)
}

func (server *Server) postHomeAddUser(w http.ResponseWriter, r *http.Request, commonData *request.CommonData) {
	ctx := r.Context()

	optionalFields, _ := request.GetFormValues(r, "remove-from-current", "curr-home-id")
	currentStr := optionalFields["curr-home-id"]
	currentHomeID, err := strconv.ParseInt(currentStr, 10, 32)
	removeFromCurrent := err == nil && optionalFields["remove-from-current"] == "on"

	fields, err := request.GetFormIDs(r, "home-id", "user-id")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}
	userID, homeID := fields["user-id"], fields["home-id"]

	if server.Transaction(ctx, func(ctx context.Context, db *db.Database) error {
		if homeID > 0 {
			if err := server.DB.Q.AddUserToHome(ctx, sql.AddUserToHomeParams{
				HomeID:    int32(homeID),
				AppuserID: int32(userID),
			}); err != nil {
				return fmt.Errorf("adding user to home: %w", err)
			}
		}
		if removeFromCurrent {
			if err := server.DB.Q.RemoveUserFromHome(ctx, sql.RemoveUserFromHomeParams{
				HomeID:    int32(currentHomeID),
				AppuserID: int32(userID),
			}); err != nil {
				return fmt.Errorf("removing user from home: %w", err)
			}
		}
		return nil
	}); err != nil {
		handlererror.Error(w, r, fmt.Errorf("failed to add user: %w", err))
		return
	}

	request.RedirectToReferer(w, r)
}
