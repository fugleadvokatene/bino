package generic

import (
	"cmp"
	"slices"
)

// GroupByID attaches items to collections by ID.
// Note that the input slice is mutated (stably sorted in place) to avoid quadratic behavior
func GroupByID[TCollection any, TItem any](
	collections []TCollection,
	items []TItem,
	getCollectionID func(*TCollection) int32,
	getItemID func(*TItem) int32,
	attachItem func(*TCollection, *TItem),
) {
	// Stably sort collections and items by ID
	slices.SortStableFunc(collections, func(a, b TCollection) int { return cmp.Compare(getCollectionID(&a), getCollectionID(&b)) })
	slices.SortStableFunc(items, func(a, b TItem) int { return cmp.Compare(getItemID(&a), getItemID(&b)) })

	// Attach items to collection by ID
	nColl := len(collections)
	nItem := len(items)
	iColl, iItem := 0, 0
	for iColl < nColl && iItem < nItem {
		// Get current collection and item
		coll := &collections[iColl]
		item := &items[iItem]
		idColl := getCollectionID(coll)
		idItem := getItemID(item)

		if idColl > idItem {
			// Current collection has a higher ID than current item.
			// Collection IDs are sorted, so if there was a collection with the same ID as the current item, we would have already seen it.
			// So this item must be discarded.
			iItem++
		} else if idColl < idItem {
			// Current collection has a lower ID than current item.
			// Item IDs are sorted, so all items with the same ID as the current collection have been added.
			// So we have completed this collection, and should move to the next.
			iColl++
		} else {
			// Current collection has the same ID as the current item.
			// So the current item belongs to the current collection.
			// We add it, and then go on to look at the next item.
			attachItem(coll, item)
			iItem++
		}
	}
}
