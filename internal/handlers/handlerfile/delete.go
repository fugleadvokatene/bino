package handlerfile

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/fs"
	"github.com/fugleadvokatene/bino/internal/request"
)

type delete_ struct {
	DB          *db.Database
	FileBackend fs.FileStorage
}

func (h delete_) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	data := request.MustLoadCommonData(ctx)

	id, err := request.GetPathID(r, "id")
	if err != nil {
		data.Error(data.Language.GenericFailed, err)
		request.RedirectToReferer(w, r)
		return
	}

	file, err := h.DB.Q.GetFileByID(ctx, id)
	if err != nil {
		data.Error(data.Language.GenericNotFound, err)
		request.RedirectToReferer(w, r)
		return
	}

	if file.Creator != data.User.AppuserID {
		data.Error(data.Language.GenericUnauthorized, err)
		request.RedirectToReferer(w, r)
		return
	}

	if err := h.DB.Q.DeregisterFile(ctx, id); err != nil {
		data.Error(data.Language.GenericFailed, err)
		request.RedirectToReferer(w, r)
		return
	}

	if result := h.FileBackend.Delete(ctx, file.Uuid); result.Error != nil {
		request.AjaxError(w, r, err, result.HTTPStatusCode)
		return
	}

	data.Success(data.Language.GenericSuccess)
	request.RedirectToReferer(w, r)
}
