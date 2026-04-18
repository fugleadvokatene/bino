package handlerfile

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
)

type deleteOriginal struct {
	DB *db.Database
}

func (h deleteOriginal) ServeHTTP(w http.ResponseWriter, r *http.Request) {
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

	fileModel := file.ToModel()

	if fileModel.OriginalDeleted {
		data.Error(data.Language.GenericFailed, nil)
		request.RedirectToReferer(w, r)
		return
	}

	if _, err := h.DB.Q.GetVariant(ctx, sql.GetVariantParams{
		FileID:  id,
		Variant: model.FileVariantIDLarge.String(),
	}); err != nil {
		data.Error(data.Language.GenericFailed, err)
		request.RedirectToReferer(w, r)
		return
	}

	if err := h.DB.DeleteOriginalFile(ctx, fileModel.UUID, fileModel.OriginalFilename); err != nil {
		data.Error(data.Language.GenericFailed, err)
		request.RedirectToReferer(w, r)
		return
	}

	if err := h.DB.Q.SetOriginalDeleted(ctx, id); err != nil {
		data.Error(data.Language.GenericFailed, err)
		request.RedirectToReferer(w, r)
		return
	}

	data.Success(data.Language.GenericSuccess)
	request.RedirectToReferer(w, r)
}
