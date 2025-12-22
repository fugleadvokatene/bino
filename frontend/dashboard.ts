import { MustQuerySelector, QuerySelector, QuerySelectorAll } from './common'

const restoreScrollState = (elem: HTMLElement) => {
  const v = Number(sessionStorage.getItem('board-scroll-left'))
  if (!Number.isNaN(v)) {
    elem.scrollLeft = v
  }
}

const storeScrollState = (elem: HTMLElement) => {
  sessionStorage.setItem('board-scroll-left', String(elem.scrollLeft))
}

const captureScroll = (elem: HTMLElement) => {
  let dragging = false
  let lastX = 0
  let pid: number | null = null

  const isInteractive = (el: EventTarget | null) =>
    el instanceof Element &&
    el.closest(
      'a,button,input,select,textarea,label,summary,[contenteditable],form,.editable,.dashboard-patient-card'
    )

  const updateIndicators = () => {
    const left = QuerySelector<HTMLElement>('#dashboard-indicator-left')
    const right = QuerySelector<HTMLElement>('#dashboard-indicator-right')
    if (!left || !right) return

    const atLeft = elem.scrollLeft <= 20
    const atRight = elem.scrollLeft + elem.clientWidth >= elem.scrollWidth - 20

    left.classList.toggle('invisible', atLeft)
    right.classList.toggle('invisible', atRight)
  }

  elem.addEventListener('pointerdown', (ev) => {
    if (ev.button !== 0) return
    if (isInteractive(ev.target)) return

    dragging = true
    lastX = ev.clientX
    pid = ev.pointerId
    elem.setPointerCapture(pid)
  })

  elem.addEventListener(
    'pointermove',
    (ev) => {
      if (!dragging || ev.pointerId !== pid) return
      const dx = ev.clientX - lastX
      lastX = ev.clientX
      elem.scrollLeft -= dx
      updateIndicators()
      ev.preventDefault()
    },
    { passive: false }
  )

  const end = (ev: PointerEvent) => {
    if (ev.pointerId !== pid) return
    dragging = false
    elem.releasePointerCapture(pid)
    pid = null
    storeScrollState(elem)
  }

  elem.addEventListener('pointerup', end)
  elem.addEventListener('pointercancel', end)

  updateIndicators()
}

const setupBoard = (elem: HTMLElement) => {
  captureScroll(elem)

  if (document.readyState === 'loading') {
    window.addEventListener(
      'DOMContentLoaded',
      (_) => restoreScrollState(elem),
      { once: true }
    )
  } else {
    restoreScrollState(elem)
  }
}

if (matchMedia('(width >= 1000px)').matches) {
  setupBoard(QuerySelector<HTMLElement>('.dashboard-other'))
}

const filterDashboard = () => {
  const input = MustQuerySelector<HTMLInputElement>('#dashboard-search')
  const container = MustQuerySelector<HTMLElement>('.search-container')
  const noneMsg = MustQuerySelector<HTMLElement>('#filter-none')

  const q = input.value.trim().toLowerCase()
  const boxes = QuerySelectorAll<HTMLElement>('.filter-box')
  const active = q.length > 0

  container.classList.toggle('active-search', active)
  input.classList.toggle('active-search', active)

  if (!active) {
    boxes.forEach((b) => (b.hidden = false))
    noneMsg.hidden = true
    return
  }

  let anyMatch = false

  boxes.forEach((box) => {
    const match = QuerySelectorAll<HTMLElement>('.filter-content', box).some(
      (el) => el.textContent!.toLowerCase().includes(q)
    )
    box.hidden = !match
    if (match) anyMatch = true
  })

  noneMsg.hidden = anyMatch
}

document.addEventListener('input', (e) => {
  if ((e.target as HTMLInputElement)?.id === 'dashboard-search') {
    filterDashboard()
  }
})

document.addEventListener('DOMContentLoaded', filterDashboard)

function loadExpandState() {
  try {
    return JSON.parse(sessionStorage.getItem('expand-state') || '{}')
  } catch {
    return {}
  }
}

function saveExpandState(state: any) {
  sessionStorage.setItem('expand-state', JSON.stringify(state))
}

document.addEventListener('DOMContentLoaded', function () {
  const state = loadExpandState()

  document.querySelectorAll('.card-content[id]').forEach((el) => {
    const content = el as HTMLElement
    if (content.id in state) {
      content.hidden = state[content.id]
    }
  })
})

document.addEventListener('click', function (e) {
  const target = e.target as HTMLElement | null
  if (!target) return

  const btn = target.closest('.expander') as HTMLElement | null
  if (!btn) return

  const selector = btn.dataset.target
  if (!selector) return

  const content = document.querySelector(selector) as HTMLElement | null
  if (!content || !content.id) return

  content.hidden = !content.hidden

  const state = loadExpandState()
  state[content.id] = content.hidden
  saveExpandState(state)
})

const source = new EventSource('/live')
declare global {
  interface EventSourceEventMap {
    Hello: MessageEvent<string>
    JournalCreated: MessageEvent<string>
  }
}
source.addEventListener('Hello', (event: string) => {
  console.log(event)
})

source.addEventListener('JournalCreated', (event: string) => {
  console.log(event)
  let parsed = JSON.parse(event.data)
  QuerySelector<HTMLAnchorElement>(
    `a.journal-link-icon[data-patient-id="${parsed.PatientID}"]`
  ).href = parsed.JournalURL
  QuerySelector(
    `.link-icon-pending[data-patient-id="${parsed.PatientID}"]`
  ).classList.add('d-none')
  QuerySelector(
    `.link-icon-exists[data-patient-id="${parsed.PatientID}"]`
  ).classList.remove('d-none')
})

source.onerror = () => {
  source.close()
}
