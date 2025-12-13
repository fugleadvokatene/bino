package main

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/view"
)

func (server *Server) formerPatientsHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := MustLoadCommonData(ctx)

	patients, err := server.Queries.GetFormerPatients(ctx, commonData.Lang32())
	if err != nil {
		server.renderError(w, r, commonData, err)
		return
	}

	commonData.Subtitle = commonData.Language.FormerPatients

	FormerPatients(commonData, SliceToSlice(patients, func(in GetFormerPatientsRow) view.Patient {
		return in.ToPatientView()
	})).Render(ctx, w)
}
