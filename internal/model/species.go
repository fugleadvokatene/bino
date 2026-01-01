package model

import "time"

type Species struct {
	ID        int32
	Name      string
	Preferred bool
}

type SpeciesCountRow struct {
	Species string
	Count   int
}

type SpeciesDistributionSeries struct {
	Name string
	Data []SpeciesDistributionPoint
}

type SpeciesDistributionPoint struct {
	Date  time.Time
	Count int
}
