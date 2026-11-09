package handlercheckinfield

import (
	"errors"
	"net/http"
	"slices"
	"strconv"
	"strings"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/handlers/handlererror"
	"github.com/fugleadvokatene/bino/internal/language"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/fugleadvokatene/bino/internal/sql"
)

// save handles both adding (edit=false) and editing (edit=true) a checkin field.
type save struct {
	DB   *db.Database
	edit bool
}

func (h *save) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	commonData := request.MustLoadCommonData(ctx)

	var id int32
	if h.edit {
		var err error
		if id, err = request.GetPathID(r, "field"); err != nil {
			handlererror.Error(w, r, err)
			return
		}
	}

	values, err := request.GetFormValues(r, "variable", "label", "kind", "options", "default", "sort-order")
	if err != nil {
		handlererror.Error(w, r, err)
		return
	}

	field, err := parseField(commonData.Language, values)
	if err != nil {
		commonData.Error(err.Error(), err)
		request.RedirectToReferer(w, r)
		return
	}

	if h.edit {
		err = h.DB.Q.UpdateCheckinField(ctx, sql.UpdateCheckinFieldParams{
			ID:           id,
			Variable:     field.Variable,
			Label:        field.Label,
			Kind:         int16(field.Kind),
			Options:      field.Options,
			DefaultValue: field.DefaultValue,
			SortOrder:    field.SortOrder,
		})
	} else {
		err = h.DB.Q.AddCheckinField(ctx, sql.AddCheckinFieldParams{
			Variable:     field.Variable,
			Label:        field.Label,
			Kind:         int16(field.Kind),
			Options:      field.Options,
			DefaultValue: field.DefaultValue,
			SortOrder:    field.SortOrder,
		})
	}
	if err != nil {
		commonData.Error(commonData.Language.GenericFailed, err)
	}

	request.RedirectToReferer(w, r)
}

func parseField(lang *language.Language, values map[string]string) (model.CheckinField, error) {
	field := model.CheckinField{
		Variable:     strings.TrimSpace(values["variable"]),
		Label:        strings.TrimSpace(values["label"]),
		DefaultValue: strings.TrimSpace(values["default"]),
		Options:      []string{},
	}

	if field.Variable == "" || field.Label == "" {
		return field, errors.New(lang.CheckinFieldsVariableRequired)
	}
	if slices.Contains(model.TemplateValues(), model.Template(field.Variable)) {
		return field, errors.New(lang.CheckinFieldsVariableReserved)
	}

	kind, err := strconv.ParseInt(values["kind"], 10, 16)
	if err != nil || !model.CheckinFieldKind(kind).IsValid() {
		return field, errors.New(lang.GenericFailed)
	}
	field.Kind = model.CheckinFieldKind(kind)

	if sortOrder, err := strconv.ParseInt(strings.TrimSpace(values["sort-order"]), 10, 32); err == nil {
		field.SortOrder = int32(sortOrder)
	}

	if field.Kind == model.CheckinFieldKindDropdown {
		for line := range strings.SplitSeq(values["options"], "\n") {
			if opt := strings.TrimSpace(line); opt != "" && !slices.Contains(field.Options, opt) {
				field.Options = append(field.Options, opt)
			}
		}
		if len(field.Options) == 0 {
			return field, errors.New(lang.CheckinFieldsOptionsRequired)
		}
		if field.DefaultValue != "" && !field.HasDefaultOption() {
			return field, errors.New(lang.CheckinFieldsDefaultNotOption)
		}
	}

	return field, nil
}
