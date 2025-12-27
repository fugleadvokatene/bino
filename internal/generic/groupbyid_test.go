package generic

import (
	"reflect"
	"testing"
)

type collection struct {
	ID    int32
	Items []item
}

type item struct {
	ID   int32
	Name string
}

func TestGroupByIDBasic(t *testing.T) {
	collections := []collection{
		{ID: 2},
		{ID: 1},
	}
	items := []item{
		{ID: 1, Name: "a"},
		{ID: 2, Name: "b"},
		{ID: 1, Name: "c"},
	}

	GroupByID(
		collections,
		items,
		func(c *collection) int32 { return c.ID },
		func(i *item) int32 { return i.ID },
		func(c *collection, i *item) { c.Items = append(c.Items, *i) },
	)

	if collections[0].ID != 1 || collections[1].ID != 2 {
		t.Fail()
	}

	if !reflect.DeepEqual(
		collections[0].Items,
		[]item{{ID: 1, Name: "a"}, {ID: 1, Name: "c"}},
	) {
		t.Fail()
	}

	if !reflect.DeepEqual(
		collections[1].Items,
		[]item{{ID: 2, Name: "b"}},
	) {
		t.Fail()
	}
}

func TestGroupByIDMissingCollection(t *testing.T) {
	collections := []collection{
		{ID: 1},
	}
	items := []item{
		{ID: 2, Name: "x"},
	}

	GroupByID(
		collections,
		items,
		func(c *collection) int32 { return c.ID },
		func(i *item) int32 { return i.ID },
		func(c *collection, i *item) { c.Items = append(c.Items, *i) },
	)

	if len(collections[0].Items) != 0 {
		t.Fail()
	}
}

func TestGroupByIDNoItems(t *testing.T) {
	collections := []collection{
		{ID: 1},
	}
	var items []item

	GroupByID(
		collections,
		items,
		func(c *collection) int32 { return c.ID },
		func(i *item) int32 { return i.ID },
		func(c *collection, i *item) { c.Items = append(c.Items, *i) },
	)

	if len(collections[0].Items) != 0 {
		t.Fail()
	}
}

func TestGroupByIDStableSort(t *testing.T) {
	collections := []collection{
		{ID: 1},
		{ID: 1},
	}
	items := []item{
		{ID: 1, Name: "a"},
		{ID: 1, Name: "b"},
	}

	GroupByID(
		collections,
		items,
		func(c *collection) int32 { return c.ID },
		func(i *item) int32 { return i.ID },
		func(c *collection, i *item) { c.Items = append(c.Items, *i) },
	)

	if !reflect.DeepEqual(
		collections[0].Items,
		[]item{{ID: 1, Name: "a"}, {ID: 1, Name: "b"}},
	) {
		t.Fail()
	}
}
