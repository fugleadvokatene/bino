package handlerwiki

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/generic"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
)

type main struct {
	DB *db.Database
}

func (h *main) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	data := request.MustLoadCommonData(ctx)

	pages, err := h.DB.Q.GetWikiPages(ctx)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	mainPage, err := h.DB.Q.GetWikiMainPage(ctx)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	data.Subtitle = mainPage.Title

	_ = WikiPageTempl(
		data,
		mainPage.ToWikiPageView(),
		generic.SliceToSlice(pages, func(in sql.WikiPage) model.WikiLink {
			return in.ToWikiLinkView()
		}),
	).Render(ctx, w)
}
