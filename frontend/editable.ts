import { QuerySelector } from './common'

const originals = new WeakMap<HTMLFormElement, HTMLElement>()

document.addEventListener('click', (e) => {
  const target = e.target instanceof Element ? e.target : null
  const el = target?.closest<HTMLElement>('.editable')
  if (!el) return

  const large = el.classList.contains('editable-lg')
  const action = el.dataset.action
  if (!action) return

  const input: HTMLInputElement | HTMLTextAreaElement = document.createElement(
    large ? 'textarea' : 'input'
  )

  input.name = 'value'
  input.value = el.textContent?.trim() ?? ''
  input.classList.add('form-control')
  input.style.fontSize = getComputedStyle(el).fontSize
  input.spellcheck = false
  input.autocomplete = 'off'
  input.autocorrect = false
  input.autocapitalize = 'off'

  if (input instanceof HTMLTextAreaElement) {
    input.rows = 5
  } else {
    input.type = 'text'
    input.classList.add('w-75')
  }

  const submit = document.createElement('button')
  submit.type = 'submit'
  submit.textContent = LN.GenericUpdate
  submit.classList.add('btn', 'btn-primary')
  if (large) submit.classList.add('w-100')

  const form = document.createElement('form')
  form.action = action
  form.method = 'POST'

  if (large) {
    const container = document.createElement('div')
    container.classList.add(
      'd-flex',
      'form-control-sm',
      'form-control-plaintext'
    )
    container.append(input)
    form.append(container, submit)
  } else {
    form.classList.add('d-flex', 'form-control-sm', 'form-control-plaintext')
    form.append(input, submit)
  }

  originals.set(form, el.cloneNode(true) as HTMLElement)
  el.replaceWith(form)
  input.focus()
})

document.addEventListener('mousedown', (e) => {
  const form = QuerySelector<HTMLFormElement>('form[action]')
  if (!form) return
  if (e.target instanceof Node && form.contains(e.target)) return

  const original = originals.get(form)
  if (!original) return

  form.replaceWith(original)
})

document.addEventListener('submit', (e) => {
  const target = e.target instanceof Element ? e.target : null
  const form = target?.closest<HTMLFormElement>('form[action]')
  if (!form) return

  originals.delete(form)
})
