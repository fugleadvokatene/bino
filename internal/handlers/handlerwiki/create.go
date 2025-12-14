package handlerwiki

import (
	"fmt"
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
)

type create struct {
	DB *db.Database
}

func (h *create) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	data := request.MustLoadCommonData(ctx)

	title, err := request.GetFormValue(r, "title")
	if err != nil {
		data.Error(data.Language.GenericFailed, err)
		request.RedirectToReferer(w, r)
		return
	}

	result, err := h.DB.Q.AddWikiPage(ctx, sql.AddWikiPageParams{
		Title:   title,
		Creator: data.User.AppuserID,
	})
	if err != nil {
		data.Error(data.Language.GenericFailed, err)
		request.RedirectToReferer(w, r)
		return
	}

	data.Success(data.Language.GenericSuccess)
	request.Redirect(w, r, fmt.Sprintf("/wiki/view/%d", result.PageID))
}
