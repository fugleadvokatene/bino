package main

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/generic"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
	"github.com/fugleadvokatene/bino/internal/view"
)

func (server *Server) getUserHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

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
	commonData.Subtitle = user.DisplayName

	homes, err := server.DB.Q.GetHomesWithDataForUser(ctx, user.ID)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	userView := user.ToUserView()
	userView.Homes = generic.SliceToSlice(homes, func(h sql.Home) view.Home { return h.ToHomeView() })

	UserPage(ctx, commonData, userView).Render(r.Context(), w)
}
