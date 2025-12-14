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

type page struct {
	DB *db.Database
}

func (h *page) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	data := request.MustLoadCommonData(ctx)

	id, err := request.GetPathID(r, "id")
	if err != nil {
		handlererror.NotFound(w, r, err)
		return
	}

	pages, err := h.DB.Q.GetWikiPages(ctx)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	page, err := h.DB.Q.GetLastWikiRevision(ctx, id)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	data.Subtitle = page.Title

	_ = WikiPageTempl(
		data,
		page.ToWikiPageView(),
		generic.SliceToSlice(pages, func(in sql.WikiPage) model.WikiLink {
			return in.ToWikiLinkView()
		}),
	).Render(ctx, w)
}
