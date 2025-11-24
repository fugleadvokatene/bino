package main

import "net/http"

func (server *Server) accessHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := MustLoadCommonData(ctx)
	commonData.Subtitle = commonData.User.Language.AccessLevel
	_ = AccessLevelPage(commonData).Render(ctx, w)
}
