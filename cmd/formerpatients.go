package main

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/generic"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
	"github.com/fugleadvokatene/bino/internal/view"
)

func (server *Server) formerPatientsHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

	patients, err := server.DB.Q.GetFormerPatients(ctx, commonData.Lang32())
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	commonData.Subtitle = commonData.Language.FormerPatients

	FormerPatients(commonData, generic.SliceToSlice(patients, func(in sql.GetFormerPatientsRow) view.Patient {
		return in.ToPatientView()
	})).Render(ctx, w)
}
