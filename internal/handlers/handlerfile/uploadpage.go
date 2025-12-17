package handlerfile

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/generic"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
)

type uploadPage struct {
	DB *db.Database
}

func (h *uploadPage) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	data := request.MustLoadCommonData(ctx)

	data.Subtitle = data.Language.FilesUploadHeader

	files, err := h.DB.Q.GetFilesAccessibleByUser(ctx, sql.GetFilesAccessibleByUserParams{
		Creator:       data.User.AppuserID,
		Accessibility: int32(model.FileAccessibilityPersonal),
	})
	if err != nil {
		data.Error(data.Language.TODO("Failed to load files"), err)
		files = nil
	}
	fileViews := generic.SliceToSlice(files, func(in sql.File) model.File {
		fv := in.ToModel()
		return fv
	})
	fileViewLookupByID := map[int32]*model.File{}
	for i := range fileViews {
		fileViewLookupByID[fileViews[i].ID] = &fileViews[i]
	}

	fileWikiAssociations, err := h.DB.Q.GetFileWikiAssociationsAccessibleByUser(ctx, sql.GetFileWikiAssociationsAccessibleByUserParams{
		Creator:       data.User.AppuserID,
		Accessibility: int32(model.FileAccessibilityPersonal),
	})
	if err != nil {
		data.Error(data.Language.TODO("Failed to get file wiki associations"), err)
		fileWikiAssociations = nil
	}
	for _, fwa := range fileWikiAssociations {
		fileViewLookupByID[fwa.FileID].WikiLinks = append(fileViewLookupByID[fwa.FileID].WikiLinks, model.WikiLink{
			ID:    fwa.WikiID,
			Title: fwa.Title,
		})
	}

	filePatientAssociations, err := h.DB.Q.GetFilePatientAssociationsAccessibleByUser(ctx, sql.GetFilePatientAssociationsAccessibleByUserParams{
		Creator:       data.User.AppuserID,
		Accessibility: int32(model.FileAccessibilityPersonal),
	})
	if err != nil {
		data.Error(data.Language.TODO("Failed to get file patient associations"), err)
		filePatientAssociations = nil
	}
	for _, fpa := range filePatientAssociations {
		fileViewLookupByID[fpa.FileID].PatientLinks = append(fileViewLookupByID[fpa.FileID].PatientLinks, model.Patient{
			ID:   fpa.PatientID,
			Name: fpa.Name,
		})
	}

	_ = FileUploadPage(data, fileViews).Render(ctx, w)
}
