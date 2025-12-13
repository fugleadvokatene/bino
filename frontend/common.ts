import 'bootstrap/dist/js/bootstrap.bundle'
import './lang.js'
import './editable.js'
import { QuerySelector, QuerySelectorAll } from './dom'

const languageSelect = QuerySelector<HTMLSelectElement>('#language-select')
if (languageSelect) {
  languageSelect.addEventListener('change', () => {
    languageSelect.form?.submit()
  })
}

QuerySelectorAll<HTMLElement>('.closer').forEach(el =>
  el.addEventListener('click', () => {
    el.parentElement?.style.setProperty('display', 'none')
  })
)
