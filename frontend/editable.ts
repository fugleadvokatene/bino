import { QuerySelector } from './common'

const originals = new WeakMap<HTMLFormElement, HTMLElement>()

type EditableFactory = (
  el: HTMLElement
) => HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement

const factories: Record<string, EditableFactory> = {
  'editable-lg': (el) => {
    const t = document.createElement('textarea')
    t.rows = 5
    t.value = el.textContent?.trim() ?? ''
    return t
  },
  'editable-select': (el) => {
    const s = document.createElement('select')
    const options = JSON.parse(el.dataset.options)
    const selected = el.dataset.selected
    for (const { Value: value, Label: label } of options) {
      const opt = document.createElement('option')
      opt.label = label
      opt.value = value
      s.appendChild(opt)
    }
    s.value = selected
    return s
  },
  'editable-input': (el) => {
    const i = document.createElement('input')
    i.type = 'text'
    i.classList.add('w-75')
    i.value = el.textContent?.trim() ?? ''
    return i
  }
}

function createEditable(el: HTMLElement) {
  for (const cls in factories) {
    if (el.classList.contains(cls)) {
      return factories[cls](el)
    }
  }
  return factories['editable-input'](el)
}

document.addEventListener('click', (e) => {
  const target = e.target instanceof Element ? e.target : null
  const el = target?.closest<HTMLElement>('.editable')
  if (!el) return

  const large = el.classList.contains('editable-lg')
  const action = el.dataset.action
  if (!action) return

  const input = createEditable(el)
  input.name = 'value'
  input.classList.add('form-control')
  input.style.fontSize = getComputedStyle(el).fontSize
  input.spellcheck = false
  input.autocomplete = 'off'
  input.autocorrect = false
  input.autocapitalize = 'off'

  const csrf = document.createElement('input')
  csrf.name = 'csrf'
  csrf.value = document.body.dataset['csrf']
  csrf.type = 'hidden'

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
    form.append(container, submit, csrf)
  } else {
    form.classList.add('d-flex', 'form-control-sm', 'form-control-plaintext')
    form.append(input, submit, csrf)
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
