package handlerspeciesadmin

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/request"
)

type getSpecies struct {
	DB *db.Database
}

func (h *getSpecies) ServeHTTP(w http.ResponseWriter, r *http.Request) {
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
			GroupID:   row.GroupID.Int32,
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

	groupRows, err := h.DB.Q.GetSpeciesGroupsWithLanguage(ctx, commonData.Lang32())
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}
	groups := make([]GroupOption, len(groupRows))
	for i, g := range groupRows {
		groups[i] = GroupOption{ID: g.GroupID, Name: g.Name}
	}

	groupLangs, err := getSpeciesGroupLangs(ctx, h.DB)
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	_ = SpeciesPage(commonData, speciesView, groups, groupLangs).Render(ctx, w)
}
