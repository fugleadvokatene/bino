package main

import "net/http"

func (server *Server) postEventSetNoteHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := MustLoadCommonData(ctx)

	event, err := server.getPathID(r, "event")
	if err != nil {
		server.renderError(w, r, commonData, err)
		return
	}

	note, err := server.getFormValue(r, "value")
	if err != nil {
		server.renderError(w, r, commonData, err)
		return
	}

	if err := server.Queries.SetEventNote(ctx, SetEventNoteParams{
		ID:   event,
		Note: note,
	}); err != nil {
		server.renderError(w, r, commonData, err)
		return
	}

	server.redirectToReferer(w, r)
}
