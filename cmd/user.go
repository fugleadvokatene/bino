package main

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/view"
)

func (server *Server) getUserHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := MustLoadCommonData(ctx)

	id, err := server.getPathID(r, "user")
	if err != nil {
		server.renderError(w, r, commonData, err)
		return
	}

	user, err := server.Queries.GetUser(ctx, id)
	if err != nil {
		server.renderError(w, r, commonData, err)
		return
	}
	commonData.Subtitle = user.DisplayName

	homes, err := server.Queries.GetHomesWithDataForUser(ctx, user.ID)
	if err != nil {
		server.renderError(w, r, commonData, err)
		return
	}

	userView := user.ToUserView()
	userView.Homes = SliceToSlice(homes, func(h Home) view.Home { return h.ToHomeView() })

	UserPage(ctx, commonData, userView).Render(r.Context(), w)
}
