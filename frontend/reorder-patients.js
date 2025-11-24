import Sortable from 'sortablejs'

if (matchMedia('(width >= 1000px)').matches) {
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.dashboard-patient-list').forEach(list => {
      new Sortable(list, {
        handle: '.card-gripper',
        animation: 0,
        forceFallback: true,
        fallbackClass: 'sortable-fallback',
        ghostClass: 'drop-target',
        chosenClass: 'chosen',
        dragClass: 'dragging',
        filter: '.must-be-clickable',
        onUpdate: evt => {
          reordered(parseInt(evt.to.dataset.home))
        }
      })
    })
  })

  function reordered(home) {
    const req = {
      Id: home,
      Order: []
    }

    document.querySelectorAll('.dashboard-patient-list').forEach(list => {
      if (parseInt(list.dataset.home) === home) {
        req.Order = Array.from(list.children).map(item =>
          parseInt(item.dataset.patientId)
        )
      }
    })

    fetch('/ajaxreorder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req)
    })
  }
}
