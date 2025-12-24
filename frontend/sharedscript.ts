import './lang.js'
import './editable.js'

const toggleTargets = (button: HTMLButtonElement) => {
  const targetSelector = button.getAttribute('data-bs-target')
  if (!targetSelector) return
  const target = document.querySelector<HTMLElement>(targetSelector)
  if (!target) return
  target.classList.toggle('show')
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll<HTMLButtonElement>('.navbar-toggler').forEach((button) => {
    button.addEventListener('click', () => toggleTargets(button))
  })
})
