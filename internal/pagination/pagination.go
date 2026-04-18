package pagination

import (
	"fmt"

	"github.com/a-h/templ"
)

type PageState struct {
	N        int32
	First    int32
	Last     int32
	PageSize int32
	baseURL  string
}

func New(offset, n, pageSize int32, baseURL string) PageState {
	last := offset + pageSize - 1
	if last >= n {
		last = n - 1
	}
	return PageState{
		N:        n,
		First:    offset,
		Last:     last,
		PageSize: pageSize,
		baseURL:  baseURL,
	}
}

func (ps PageState) Prev() (templ.SafeURL, bool) {
	if ps.First <= 0 {
		return "", false
	}
	prev := ps.First - ps.PageSize
	if prev < 0 {
		prev = 0
	}
	return templ.URL(fmt.Sprintf("%s?offset=%d", ps.baseURL, prev)), true
}

func (ps PageState) Next() (templ.SafeURL, bool) {
	if ps.Last < 0 || ps.Last >= ps.N-1 {
		return "", false
	}
	return templ.URL(fmt.Sprintf("%s?offset=%d", ps.baseURL, ps.Last+1)), true
}
