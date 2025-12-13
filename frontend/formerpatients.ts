import { MustDataNumber, QuerySelector, QuerySelectorAll } from './common'

// Sorting state
type SortDir = 'asc' | 'desc'
type SortState = Record<number, SortDir>
const sortState: SortState = {}

// If cell has a 'data-sort-key', return that (numeric) value, otherwise return the text content
const getSortKey = (row: HTMLTableRowElement, col: number) => {
  const cell = row.children[col] as HTMLElement
  const key = cell.dataset.sortKey
  return key !== undefined
    ? Number(key)
    : cell.textContent!.trim().toLowerCase()
}

// Sort the table
const sortTable = (col: number, th: HTMLTableCellElement) => {
  // Find tbody
  const tbody = QuerySelector<HTMLTableSectionElement>(
    '.search-container tbody'
  )!

  // Find all rows
  const rows = QuerySelectorAll<HTMLTableRowElement>('.filter-box', tbody)

  // Toggle clicked column
  const dir: SortDir = sortState[col] === 'asc' ? 'desc' : 'asc'

  // Reset sort state, only sort on selected column
  Object.keys(sortState).forEach((k) => delete sortState[+k])
  sortState[col] = dir

  // Reset sort CSS classes
  QuerySelectorAll<HTMLTableCellElement>('th[data-sort]').forEach((h) =>
    h.classList.remove('sort-asc', 'sort-desc')
  )
  th.classList.add(dir === 'asc' ? 'sort-asc' : 'sort-desc')

  // Sort rows
  const posSortKey = dir === 'asc' ? -1 : 1
  rows
    .sort((a, b) => {
      const keyA = getSortKey(a, col)
      const keyB = getSortKey(b, col)
      if (keyA < keyB) return posSortKey
      if (keyA > keyB) return -posSortKey
      return 0
    })
    .forEach((r) => tbody.appendChild(r))
}

// Filter table rows
const filterFormer = () => {
  // Find search query
  const input = QuerySelector<HTMLInputElement>('#former-search')!
  const q = input.value.trim().toLowerCase()

  // Find boxes that may be removed
  const boxes = QuerySelectorAll<HTMLElement>('.filter-box')

  // Find the box that contains everything we are filtering
  const container = QuerySelector<HTMLElement>('.search-container')!

  // Element to be displayed if nothing matches the query
  const noneMsg = QuerySelector<HTMLElement>('#filter-none')!

  // Set classes to indicate whether a query is being made
  const active = q.length > 0
  container.classList.toggle('active-search', active)
  input.classList.toggle('active-search', active)

  // If no query, show everything
  if (!active) {
    boxes.forEach((b) => (b.hidden = false))
    noneMsg.hidden = true
    return
  }

  // Run filter
  let anyMatch = false
  boxes.forEach((box) => {
    const match = QuerySelectorAll<HTMLElement>('.filter-content', box).some(
      (el) => el.textContent!.toLowerCase().includes(q)
    )
    box.hidden = !match
    if (match) anyMatch = true
  })

  // If nothing matched, show the fallback element
  noneMsg.hidden = anyMatch
}

// If we click on a th with a data-sort attribute, sort the table by that column
document.addEventListener('click', (e) => {
  const th = (e.target as Element).closest<HTMLTableCellElement>(
    'th[data-sort]'
  )
  if (th) sortTable(MustDataNumber(th, 'sort'), th)
})

// If we get something on the input, run the filtering function
document.addEventListener('input', (e) => {
  if ((e.target as HTMLInputElement)?.id === 'former-search') filterFormer()
})

// Run the filtering function initially
document.addEventListener('DOMContentLoaded', filterFormer)
