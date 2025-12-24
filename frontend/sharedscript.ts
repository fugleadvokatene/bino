import './lang.js'
import './editable.js'
import { QuerySelector, QuerySelectorAll } from './common.js'

document.addEventListener('DOMContentLoaded', () => {
  QuerySelectorAll<HTMLButtonElement>('.navbar-toggler').forEach((button) => {
    button.addEventListener('click', () =>
      QuerySelector<HTMLElement>(
        button.getAttribute('data-bs-target')
      ).classList.toggle('show')
    )
  })
})
