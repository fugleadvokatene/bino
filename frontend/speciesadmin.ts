import { setupCreateButton, setupUpdateButtons } from './crud'

type SpeciesRequest = {
  Latin: string
  GroupID: number
  Languages: Record<string, string>
}

type SpeciesGroupRequest = {
  Languages: Record<string, string>
}

const buildRequest = <T extends SpeciesGroupRequest & Partial<SpeciesRequest>>(
  formFields: HTMLInputElement[],
  base: T
): T => {
  formFields.forEach((field) => {
    const kind = field.dataset.field
    if (kind === 'latin') {
      base.Latin = field.value
    } else if (kind === 'group') {
      base.GroupID = Number(field.value)
    } else if (kind === 'lang') {
      const lang = field.dataset.lang
      if (lang) base.Languages[lang] = field.value
    }
  })
  return base
}

setupCreateButton('species', (formFields) => ({
  url: '/species',
  req: buildRequest(formFields, { Latin: '', GroupID: 0, Languages: {} })
}))

setupUpdateButtons('species', (id, formFields) => ({
  url: '/species',
  req: buildRequest(formFields, {
    ID: id,
    Latin: '',
    GroupID: 0,
    Languages: {}
  })
}))

setupCreateButton('species-groups', (formFields) => ({
  url: '/species/groups',
  req: buildRequest(formFields, { Languages: {} })
}))

setupUpdateButtons('species-groups', (id, formFields) => ({
  url: '/species/groups',
  req: buildRequest(formFields, { ID: id, Languages: {} })
}))
