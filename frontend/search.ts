import 'htmx.org'
import { QuerySelector, QuerySelectorAll } from './common'

const setupSearchForm = (form: HTMLFormElement) => {
  const advanced = QuerySelectorAll<HTMLInputElement>(
    "[name='mode']",
    form
  ).some((el) => el.checked && el.value === 'advanced')

  const opts = QuerySelector<HTMLElement>('.search-advanced-options', form)
  if (opts) opts.dataset.show = advanced ? 'true' : 'false'
}

document.body.addEventListener('htmx:beforeSend', (e) => {
  const target = e.target
  if (!(target instanceof HTMLFormElement)) return

  setupSearchForm(target)

  const params = new URLSearchParams(
    new FormData(target) as unknown as Record<string, string>
  )
  history.replaceState(null, '', `${location.pathname}?${params}`)
})

const searchForm = QuerySelector<HTMLFormElement>('#search-form')
if (!searchForm) throw new Error('search-form not found')

setupSearchForm(searchForm)

QuerySelector<HTMLElement>(
  '.search-filter-clear-created',
  searchForm
)?.addEventListener(
  'click',
  () => {
    QuerySelectorAll<HTMLInputElement>(
      '.search-created-filter',
      searchForm
    ).forEach((el) => (el.value = ''))

    htmx.trigger(searchForm, 'submit')
  },
  { capture: true }
)
