package handlerhome

import (
	"fmt"
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
	"github.com/jackc/pgx/v5/pgtype"
)

type AddHomeUnavailablePeriod struct {
	DB *db.Database
}

func (h *AddHomeUnavailablePeriod) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

	homeID, err := request.GetPathID(r, "home")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	values, err := request.GetFormValues(r, "unavailable-from", "unavailable-to", "unavailable-note")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	var fromV model.Date
	var toV model.Date
	note, hasNote := values["unavailable-note"]

	if n, err := fmt.Sscanf(values["unavailable-from"], "%d-%d-%d", &fromV.Year, &fromV.Month, &fromV.Day); err != nil || n != 3 {
		commonData.Warning(commonData.Language.HomePeriodInvalid, err)
		request.RedirectToReferer(w, r)
		return
	}
	if n, err := fmt.Sscanf(values["unavailable-to"], "%d-%d-%d", &toV.Year, &toV.Month, &toV.Day); err != nil || n != 3 {
		commonData.Warning(commonData.Language.HomePeriodInvalid, err)
		request.RedirectToReferer(w, r)
		return
	}

	if toV.Before(fromV) {
		commonData.Warning(commonData.Language.HomePeriodInvalid, fmt.Errorf("to is before from: %+v < %+v", toV, fromV))
		request.RedirectToReferer(w, r)
		return
	}
	if _, err := h.DB.Q.AddHomeUnavailablePeriod(ctx, sql.AddHomeUnavailablePeriodParams{
		HomeID:   homeID,
		FromDate: fromV.ToPGDate(),
		ToDate:   toV.ToPGDate(),
		Note:     pgtype.Text{String: note, Valid: hasNote && note != ""},
	}); err != nil {
		handlererror.Error(w, r, err)
		return
	}

	request.RedirectToReferer(w, r)
}
