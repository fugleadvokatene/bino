import Sortable from 'sortablejs'
import { QuerySelectorAll } from './common'

if (matchMedia('(width >= 1000px)').matches) {
  const lists = QuerySelectorAll<HTMLElement>('.dashboard-patient-list')

  const reordered = (home: number) => {
    const list = lists.find((l) => Number(l.dataset.home) === home)
    if (!list) return

    const body = {
      Id: home,
      Order: QuerySelectorAll<HTMLElement>('[data-patient-id]', list).map(
        (item) => Number(item.dataset.patientId)
      )
    }

    fetch('/ajaxreorder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
  }

  lists.forEach((list) => {
    new Sortable(list, {
      handle: '.card-gripper',
      animation: 0,
      forceFallback: true,
      fallbackClass: 'sortable-fallback',
      ghostClass: 'drop-target',
      chosenClass: 'chosen',
      dragClass: 'dragging',
      filter: '.must-be-clickable',
      onUpdate: (evt: any) => {
        const home = Number((evt.to as HTMLElement).dataset.home)
        if (!Number.isNaN(home)) reordered(home)
      }
    })
  })
}
