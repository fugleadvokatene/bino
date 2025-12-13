package main

import (
	"context"
	"fmt"
	"maps"
	"net/http"

	"github.com/fugleadvokatene/bino/internal/gdrive"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/view"
)

func (s *Server) getGDriveHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

	info := s.GDriveWorker.GetGDriveConfigInfo()
	s.GDrivePage(ctx, commonData, info).Render(ctx, w)
}

func (s *Server) getExtraBinoUsers(ctx context.Context, selectedDir gdrive.Item) map[string]view.User {
	users := s.getUserViews(ctx)
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

func (s *Server) gdriveInviteUserHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

	email, err := s.getPathValue(r, "email")
	if err != nil {
		s.renderError(w, r, commonData, err)
		return
	}

	if err := s.GDriveWorker.InviteUser(s.Config.GoogleDrive.JournalFolder, email, "writer"); err != nil {
		s.renderError(w, r, commonData, fmt.Errorf("inviting user: %w", err))
		return
	}

	commonData.Success(commonData.Language.GDriveUserInvited)

	s.redirect(w, r, "/gdrive")
}
