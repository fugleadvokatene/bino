import { MustDataNumber } from './common'

type CreateListener<T> = (fields: HTMLInputElement[]) => {
  url: string
  req: T
}

type UpdateListener<T> = (
  id: number,
  fields: HTMLInputElement[]
) => {
  url: string
  req: T
}

const collectFields = (root: Element): HTMLInputElement[] =>
  Array.from(root.querySelectorAll<HTMLInputElement>('.form-control'))

// The table rendered by handlercrud.CRUDTable with the given name
const table = (name: string) =>
  document.querySelector<HTMLElement>(`[data-crud="${name}"]`)

export const setupCreateButton = <T>(
  name: string,
  listener: CreateListener<T>
) => {
  table(name)?.addEventListener('click', (e) => {
    const target = e.target instanceof Element ? e.target : null
    if (!target?.closest('.new-submit')) return
    const form = target.closest('tr')
    if (!form) return

    const fields = collectFields(form)
    const { url, req } = listener(fields)

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req)
    }).then(() => location.reload())
  })
}

export const setupUpdateButtons = <T>(
  name: string,
  listener: UpdateListener<T>
) => {
  table(name)?.addEventListener('click', (e) => {
    const target = e.target instanceof HTMLElement ? e.target : null
    if (!target?.classList.contains('update-submit')) return

    const id = MustDataNumber(target, 'id')

    const form = target.closest('tr')
    if (!form) return

    const fields = collectFields(form)
    const { url, req } = listener(id, fields)

    fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req)
    }).then(() => location.reload())
  })
}
