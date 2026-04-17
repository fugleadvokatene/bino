export const FLAG_BOLD = 1
export const FLAG_ITALIC = 2
export const FLAG_UNDERLINE = 4
export const FLAG_STRIKETHROUGH = 8
export const FLAG_LINK = 16

export interface DocText {
  Content: string
  Flags: number
  FontSize: number
  LinkURL: string
}

export interface DocImage {
  Title: string
  Description: string
  Width: number
  Height: number
  Crop: [number, number, number, number]
  URL: string
  InlineObjectID: string
}

export interface Paragraph {
  Elements: DocElement[]
  HeadingLevel: number
}

export interface DocList {
  Items: DocElement[]
  Nesting: number
  Ordered: boolean
}

export type DocElementValue = DocText | DocImage | Paragraph | DocList

export interface DocElement {
  Type: 'text' | 'image' | 'paragraph' | 'list'
  Value: DocElementValue
}

export interface TiptapMark {
  type: string
  attrs?: Record<string, unknown>
}

export interface TiptapNode {
  type: string
  attrs?: Record<string, unknown>
  content?: TiptapNode[]
  marks?: TiptapMark[]
  text?: string
}

// --- DocElement[] → TipTap ---

function textToTiptap(text: DocText): TiptapNode {
  const marks: TiptapMark[] = []
  if (text.Flags & FLAG_BOLD) marks.push({ type: 'bold' })
  if (text.Flags & FLAG_ITALIC) marks.push({ type: 'italic' })
  if (text.Flags & FLAG_UNDERLINE) marks.push({ type: 'underline' })
  if (text.Flags & FLAG_STRIKETHROUGH) marks.push({ type: 'strike' })
  if (text.Flags & FLAG_LINK)
    marks.push({ type: 'link', attrs: { href: text.LinkURL } })
  const node: TiptapNode = { type: 'text', text: text.Content }
  if (marks.length > 0) node.marks = marks
  return node
}

function paraElementsToTiptap(elements: DocElement[] | null): TiptapNode[] {
  return (elements ?? []).flatMap((elem) => {
    if (elem.Type === 'text') return [textToTiptap(elem.Value as DocText)]
    if (elem.Type === 'image') {
      const img = elem.Value as DocImage
      return [
        {
          type: 'image',
          attrs: {
            src: img.URL,
            alt: img.Description || img.Title || '',
            width: img.Width,
            height: img.Height,
            crop: img.Crop ?? [0, 0, 0, 0]
          }
        }
      ]
    }
    return []
  })
}

function paragraphHasContent(para: Paragraph): boolean {
  return (para.Elements ?? []).some(
    (e) =>
      e.Type === 'image' ||
      (e.Type === 'text' && (e.Value as DocText).Content.trim() !== '')
  )
}

function paragraphToTiptap(para: Paragraph): TiptapNode {
  const content = paraElementsToTiptap(para.Elements)
  if (para.HeadingLevel > 0) {
    return { type: 'heading', attrs: { level: para.HeadingLevel }, content }
  }
  return { type: 'paragraph', content }
}

function listToTiptap(list: DocList): TiptapNode {
  const items: TiptapNode[] = []
  for (const item of list.Items) {
    if (item.Type === 'paragraph') {
      items.push({
        type: 'listItem',
        content: [paragraphToTiptap(item.Value as Paragraph)]
      })
    } else if (item.Type === 'list') {
      const nested = listToTiptap(item.Value as DocList)
      if (items.length > 0) {
        items[items.length - 1].content!.push(nested)
      } else {
        items.push({ type: 'listItem', content: [nested] })
      }
    }
  }
  return { type: list.Ordered ? 'orderedList' : 'bulletList', content: items }
}

export function documentToTiptap(content: DocElement[]): TiptapNode {
  const nodes: TiptapNode[] = content.flatMap((elem) => {
    if (elem.Type === 'paragraph') {
      const para = elem.Value as Paragraph
      if (para.HeadingLevel > 0 || paragraphHasContent(para))
        return [paragraphToTiptap(para)]
    }
    if (elem.Type === 'list') return [listToTiptap(elem.Value as DocList)]
    return []
  })
  return { type: 'doc', content: nodes }
}

// --- TipTap → DocElement[] ---

function tiptapParaToDoc(node: TiptapNode, headingLevel: number): DocElement {
  const elements: DocElement[] = (node.content ?? []).flatMap((child) => {
    if (child.type === 'text') return [tiptapTextToDoc(child)]
    if (child.type === 'image') return [tiptapImageToDoc(child)]
    return []
  })
  return {
    Type: 'paragraph',
    Value: { Elements: elements, HeadingLevel: headingLevel }
  }
}

function tiptapTextToDoc(node: TiptapNode): DocElement {
  let flags = 0
  let linkURL = ''
  for (const mark of node.marks ?? []) {
    if (mark.type === 'bold') flags |= FLAG_BOLD
    if (mark.type === 'italic') flags |= FLAG_ITALIC
    if (mark.type === 'underline') flags |= FLAG_UNDERLINE
    if (mark.type === 'strike') flags |= FLAG_STRIKETHROUGH
    if (mark.type === 'link') {
      flags |= FLAG_LINK
      linkURL = (mark.attrs?.href as string) ?? ''
    }
  }
  return {
    Type: 'text',
    Value: {
      Content: node.text ?? '',
      Flags: flags,
      FontSize: 0,
      LinkURL: linkURL
    }
  }
}

function tiptapImageToDoc(node: TiptapNode): DocElement {
  const { src, alt, width, height, crop } = node.attrs ?? {}
  return {
    Type: 'image',
    Value: {
      Title: '',
      Description: (alt as string) ?? '',
      Width: (width as number) ?? 0,
      Height: (height as number) ?? 0,
      Crop: (crop as [number, number, number, number]) ?? [0, 0, 0, 0],
      URL: (src as string) ?? '',
      InlineObjectID: ''
    }
  }
}

function tiptapListToDoc(node: TiptapNode, nesting: number): DocElement {
  const ordered = node.type === 'orderedList'
  const items: DocElement[] = (node.content ?? []).flatMap((listItem) =>
    (listItem.content ?? []).flatMap((child) => {
      if (child.type === 'paragraph') return [tiptapParaToDoc(child, 0)]
      if (child.type === 'bulletList' || child.type === 'orderedList')
        return [tiptapListToDoc(child, nesting + 1)]
      return []
    })
  )
  return {
    Type: 'list',
    Value: { Items: items, Ordered: ordered, Nesting: nesting }
  }
}

export function tiptapToDocument(doc: TiptapNode): DocElement[] {
  return (doc.content ?? []).flatMap((node) => {
    if (node.type === 'paragraph') return [tiptapParaToDoc(node, 0)]
    if (node.type === 'heading')
      return [tiptapParaToDoc(node, (node.attrs?.level as number) ?? 1)]
    if (node.type === 'bulletList' || node.type === 'orderedList')
      return [tiptapListToDoc(node, 0)]
    return []
  })
}
