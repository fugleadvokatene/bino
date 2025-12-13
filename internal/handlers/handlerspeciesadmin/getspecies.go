package handlerspeciesadmin

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/request"
)

type GetSpecies struct {
	DB *db.Database
}

func (h *GetSpecies) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

	rows, err := h.DB.Q.GetSpecies(ctx)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	langRows, err := h.DB.Q.GetSpeciesLanguage(ctx)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	speciesView := make([]SpeciesLangs, 0, len(rows))
	iLangRows := 0
	for _, row := range rows {
		species := SpeciesLangs{
			ID:        row.ID,
			LatinName: row.ScientificName,
			Names:     map[int32]string{},
		}
		for {
			if iLangRows >= len(langRows) {
				break
			}
			langRow := langRows[iLangRows]
			if langRow.SpeciesID == row.ID {
				species.Names[langRow.LanguageID] = langRow.Name
				iLangRows++
			} else {
				break
			}
		}

		speciesView = append(speciesView, species)
	}

	_ = SpeciesPage(commonData, speciesView).Render(ctx, w)
}
