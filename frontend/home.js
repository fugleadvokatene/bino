import Sortable from 'sortablejs'

document.addEventListener('DOMContentLoaded', () => {
  const table = document.getElementById('species-list')
  if (!table) return

  const home = parseInt(table.dataset.home)

  Sortable.create(table, {
    handle: 'td',
    animation: 0,
    onEnd: () => {
      const req = {
        ID: home,
        Order: Array.from(table.children).map(row => parseInt(row.dataset.id))
      }

      fetch(`/home/${home}/species/reorder`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req)
      }).then(() => location.reload())
    }
  })
})
