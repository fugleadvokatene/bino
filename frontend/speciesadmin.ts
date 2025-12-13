import { setupCreateButton, setupUpdateButtons } from './crud'

type SpeciesRequest = {
  Latin: string
  Languages: Record<string, string>
}

const buildRequest = (
  formFields: HTMLInputElement[],
  base: SpeciesRequest
): SpeciesRequest => {
  formFields.forEach((field) => {
    const kind = field.dataset.field
    if (kind === 'latin') {
      base.Latin = field.value
    } else if (kind === 'lang') {
      const lang = field.dataset.lang
      if (lang) base.Languages[lang] = field.value
    }
  })
  return base
}

setupCreateButton((formFields) => {
  const req = buildRequest(formFields, {
    Latin: '',
    Languages: {}
  })

  return { url: '/species', req }
})

setupUpdateButtons((id, formFields) => {
  const req = buildRequest(formFields, {
    Latin: '',
    Languages: {},
    ID: id
  } as SpeciesRequest & { ID: number })

  return { url: '/species', req }
})
