import Sortable from 'sortablejs'
import { QuerySelector, QuerySelectorAll } from './dom'

const table = QuerySelector<HTMLElement>('#species-list')
if (!table) throw new Error('species-list not found')

const home = Number(table.dataset.home)
if (Number.isNaN(home)) throw new Error('invalid home id')

const reorder = async () => {
  const body = {
    ID: home,
    Order: QuerySelectorAll<HTMLElement>('[data-id]', table).map(row =>
      Number(row.dataset.id)
    )
  }

  await fetch(`/home/${home}/species/reorder`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })

  location.reload()
}

Sortable.create(table, {
  handle: 'td',
  animation: 0,
  onEnd: reorder
})
