// Typed querySelector
export const QuerySelector = <T extends Element>(
  sel: string,
  root: ParentNode = document
) => root.querySelector<T>(sel)
export const MustQuerySelector = <T extends Element>(
  sel: string,
  root: ParentNode = document
) => {
  const v = QuerySelector<T>(sel, root)
  if (!v) {
    throw new Error(`${sel} not found on ${root.nodeName}`)
  }
  return v
}

// Typed querySelectorAll
export const QuerySelectorAll = <T extends Element>(
  sel: string,
  root: ParentNode = document
) => Array.from(root.querySelectorAll<T>(sel))

const languageSelect = QuerySelector<HTMLSelectElement>('#language-select')
if (languageSelect) {
  languageSelect.addEventListener('change', () => {
    languageSelect.form?.submit()
  })
}

QuerySelectorAll<HTMLElement>('.closer').forEach((el) =>
  el.addEventListener('click', () => {
    el.parentElement?.style.setProperty('display', 'none')
  })
)

export const DataNumber = (el: HTMLElement, key: string) => {
  const v = Number(el.dataset[key])
  return Number.isNaN(v) ? null : v
}

export const MustDataNumber = (el: HTMLElement, key: string) => {
  const v = DataNumber(el, key)
  if (v === null) throw new Error(`Invalid data-${key}`)
  return v
}
