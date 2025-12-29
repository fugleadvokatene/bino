package model

type Species struct {
	ID        int32
	Name      string
	Preferred bool
}

type SpeciesCountRow struct {
	Species string
	Count   int
}
