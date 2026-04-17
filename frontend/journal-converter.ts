// GDocsDoc is the simplified Google Docs wire format exchanged with the backend.
// Mirrors the Go GDocsDocument / GDocsParagraph / GDocsRun structs.

export interface GDocsRun {
  // text run (imageId absent)
  text?: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  link?: string
  // image run (text absent)
  imageId?: string
  url?: string
  width?: number
  height?: number
  crop?: [number, number, number, number] // top right bottom left
}

export interface GDocsPara {
  paraId: number // -1 for new paragraphs
  heading: number // 0=normal, 1=title, 2..6=headings
  list: boolean
  ordered: boolean
  nesting: number
  runs: GDocsRun[]
}

export interface GDocsDoc {
  paragraphs: GDocsPara[]
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

// --- GDocsDoc → TipTap ---

function runsToTiptap(runs: GDocsRun[] | null | undefined): TiptapNode[] {
  return (runs ?? []).flatMap((run) => {
    if (run.imageId) {
      return [
        {
          type: 'image',
          attrs: {
            src: run.url ?? '',
            alt: '',
            width: run.width ?? 0,
            height: run.height ?? 0,
            crop: run.crop ?? [0, 0, 0, 0],
            imageId: run.imageId
          }
        }
      ]
    }
    const text = run.text ?? ''
    if (!text) return []
    const marks: TiptapMark[] = []
    if (run.bold) marks.push({ type: 'bold' })
    if (run.italic) marks.push({ type: 'italic' })
    if (run.underline) marks.push({ type: 'underline' })
    if (run.strikethrough) marks.push({ type: 'strike' })
    if (run.link) marks.push({ type: 'link', attrs: { href: run.link } })
    const node: TiptapNode = { type: 'text', text }
    if (marks.length > 0) node.marks = marks
    return [node]
  })
}

function paraToTiptap(para: GDocsPara): TiptapNode {
  const content = runsToTiptap(para.runs)
  if (para.list) {
    // list items are wrapped by listToTiptap; here we emit the inner paragraph
    return {
      type: 'paragraph',
      attrs: { paraId: para.paraId },
      content
    }
  }
  if (para.heading > 0) {
    return {
      type: 'heading',
      attrs: { level: para.heading, paraId: para.paraId },
      content
    }
  }
  return { type: 'paragraph', attrs: { paraId: para.paraId }, content }
}

export function gdocsToTiptap(doc: GDocsDoc): TiptapNode {
  // Group consecutive list items into bullet/ordered lists.
  const nodes: TiptapNode[] = []

  type ListGroup = { ordered: boolean; nesting: number; para: GDocsPara }[]
  let listGroup: ListGroup = []

  function flushList() {
    if (listGroup.length === 0) return
    // Build a flat list node (nesting handled via nested listItem content).
    const items: TiptapNode[] = listGroup.map((item) => ({
      type: 'listItem',
      content: [paraToTiptap(item.para)]
    }))
    const listType = listGroup[0].ordered ? 'orderedList' : 'bulletList'
    nodes.push({ type: listType, content: items })
    listGroup = []
  }

  for (const para of doc.paragraphs) {
    if (para.list) {
      listGroup.push({ ordered: para.ordered, nesting: para.nesting, para })
    } else {
      flushList()
      nodes.push(paraToTiptap(para))
    }
  }
  flushList()

  return { type: 'doc', content: nodes }
}

// --- TipTap → GDocsDoc ---

function tiptapMarksToRunProps(marks: TiptapMark[] = []): Partial<GDocsRun> {
  const props: Partial<GDocsRun> = {}
  for (const mark of marks) {
    if (mark.type === 'bold') props.bold = true
    if (mark.type === 'italic') props.italic = true
    if (mark.type === 'underline') props.underline = true
    if (mark.type === 'strike') props.strikethrough = true
    if (mark.type === 'link') props.link = (mark.attrs?.href as string) ?? ''
  }
  return props
}

function tiptapNodeToRuns(node: TiptapNode): GDocsRun[] {
  if (node.type === 'text') {
    return [{ text: node.text ?? '', ...tiptapMarksToRunProps(node.marks) }]
  }
  if (node.type === 'image') {
    const { src, alt, width, height, crop, imageId } = node.attrs ?? {}
    return [
      {
        imageId: (imageId as string) ?? '',
        url: (src as string) ?? '',
        width: (width as number) ?? 0,
        height: (height as number) ?? 0,
        crop: (crop as [number, number, number, number]) ?? [0, 0, 0, 0]
      }
    ]
  }
  return (node.content ?? []).flatMap(tiptapNodeToRuns)
}

function tiptapParaToGDocs(
  node: TiptapNode,
  heading: number,
  list: boolean,
  ordered: boolean,
  nesting: number
): GDocsPara {
  const paraId = (node.attrs?.paraId as number) ?? -1
  const runs = (node.content ?? []).flatMap(tiptapNodeToRuns)
  return { paraId, heading, list, ordered, nesting, runs }
}

export function tiptapToGdocs(doc: TiptapNode): GDocsDoc {
  const paragraphs: GDocsPara[] = []

  function processListNode(
    node: TiptapNode,
    ordered: boolean,
    nesting: number
  ) {
    for (const item of node.content ?? []) {
      if (item.type !== 'listItem') continue
      for (const child of item.content ?? []) {
        if (child.type === 'paragraph') {
          paragraphs.push(tiptapParaToGDocs(child, 0, true, ordered, nesting))
        } else if (child.type === 'bulletList') {
          processListNode(child, false, nesting + 1)
        } else if (child.type === 'orderedList') {
          processListNode(child, true, nesting + 1)
        }
      }
    }
  }

  for (const node of doc.content ?? []) {
    if (node.type === 'paragraph') {
      paragraphs.push(tiptapParaToGDocs(node, 0, false, false, 0))
    } else if (node.type === 'heading') {
      const level = (node.attrs?.level as number) ?? 1
      paragraphs.push(tiptapParaToGDocs(node, level, false, false, 0))
    } else if (node.type === 'bulletList') {
      processListNode(node, false, 0)
    } else if (node.type === 'orderedList') {
      processListNode(node, true, 0)
    }
  }

  return { paragraphs }
}
