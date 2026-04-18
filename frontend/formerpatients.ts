import 'htmx.org'
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
  const tbody = QuerySelector<HTMLTableSectionElement>(
    '.search-container tbody'
  )!

  const rows = QuerySelectorAll<HTMLTableRowElement>(
    'tbody tr',
    tbody.parentElement!
  )

  const dir: SortDir = sortState[col] === 'asc' ? 'desc' : 'asc'

  Object.keys(sortState).forEach((k) => delete sortState[+k])
  sortState[col] = dir

  QuerySelectorAll<HTMLTableCellElement>('th[data-sort]').forEach((h) =>
    h.classList.remove('sort-asc', 'sort-desc')
  )
  th.classList.add(dir === 'asc' ? 'sort-asc' : 'sort-desc')

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

document.addEventListener('click', (e) => {
  const th = (e.target as Element).closest<HTMLTableCellElement>(
    'th[data-sort]'
  )
  if (th) sortTable(MustDataNumber(th, 'sort'), th)
})
