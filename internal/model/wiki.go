package model

import (
	"fmt"

	"github.com/a-h/templ"
)

// ---- Wiki link

type WikiLink struct {
	WikiID int32
	Title  string
}

func (wlw WikiLink) URL() templ.SafeURL {
	return templ.URL(fmt.Sprintf("/wiki/view/%d", wlw.WikiID))
}

// ---- Wiki page

type WikiPage struct {
	ID      int32
	Title   string
	Content string
}

func (wpw *WikiPage) EditTitleURL() string {
	return fmt.Sprintf("/wiki/title/%d", wpw.ID)
}
