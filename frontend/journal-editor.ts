import { Editor, Node } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'

const FLAG_BOLD = 1
const FLAG_ITALIC = 2
const FLAG_UNDERLINE = 4
const FLAG_STRIKETHROUGH = 8
const FLAG_LINK = 16

interface DocText {
  Content: string
  Flags: number
  FontSize: number
  LinkURL: string
}

interface DocImage {
  Title: string
  Description: string
  Width: number
  Height: number
  Crop: [number, number, number, number] // top right bottom left
  URL: string
  InlineObjectID: string
}

interface Paragraph {
  Elements: DocElement[]
  HeadingLevel: number
}

interface DocList {
  Items: DocElement[]
  Nesting: number
  Ordered: boolean
}

type DocElementValue = DocText | DocImage | Paragraph | DocList

interface DocElement {
  Type: 'text' | 'image' | 'paragraph' | 'list'
  Value: DocElementValue
}

interface TiptapMark {
  type: string
  attrs?: Record<string, unknown>
}

interface TiptapNode {
  type: string
  attrs?: Record<string, unknown>
  content?: TiptapNode[]
  marks?: TiptapMark[]
  text?: string
}

// Replicates ContainerStyle() and ImgStyle() from image.go
function imageStyles(
  width: number,
  height: number,
  crop: number[]
): { container: string; img: string } {
  const [top, right, bottom, left] = crop
  let xFraction = 1 - left - right
  let yFraction = 1 - top - bottom
  if (xFraction <= 0) xFraction = 1
  if (yFraction <= 0) yFraction = 1
  const scaleX = 100 / xFraction
  const scaleY = 100 / yFraction
  const leftPct = -left * scaleX
  const topPct = -top * scaleY
  return {
    container: `width: ${Math.round(width)}px; height: ${Math.round(height)}px; overflow: hidden; position: relative`,
    img: `position: absolute; width: ${scaleX}%; height: ${scaleY}%; left: ${leftPct}%; top: ${topPct}%; max-width: none`
  }
}

// Replicates DocImage.Templ() from document.templ
const JournalImage = Node.create({
  name: 'image',
  inline: true,
  group: 'inline',
  atom: true,

  addAttributes() {
    return {
      src: { default: null },
      alt: { default: null },
      width: { default: 0 },
      height: { default: 0 },
      crop: { default: [0, 0, 0, 0] }
    }
  },

  parseHTML() {
    return [{ tag: 'a.journal-image-frame' }]
  },

  renderHTML({ HTMLAttributes }) {
    const { src, alt, width, height, crop } = HTMLAttributes
    const styles = imageStyles(width ?? 0, height ?? 0, crop ?? [0, 0, 0, 0])
    return [
      'a',
      {
        href: src,
        'data-lightbox': 'user-files',
        class: 'user-image-link journal-image-frame d-block',
        style: styles.container
      },
      [
        'img',
        {
          src: src ? `${src}?variant=Medium` : src,
          class: 'user-image dark-on-hover',
          style: styles.img,
          alt: alt ?? ''
        }
      ]
    ]
  }
})

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

function documentToTiptap(content: DocElement[]): TiptapNode {
  const nodes: TiptapNode[] = content.flatMap((elem) => {
    if (elem.Type === 'paragraph')
      return [paragraphToTiptap(elem.Value as Paragraph)]
    if (elem.Type === 'list') return [listToTiptap(elem.Value as DocList)]
    return []
  })
  return { type: 'doc', content: nodes }
}

const host = document.querySelector<HTMLElement>('#journal-editor')
if (host) {
  const url = host.dataset.url
  if (!url) throw new Error('data-url missing on #journal-editor')

  fetch(url)
    .then((r) => r.json())
    .then((doc: { Content: DocElement[] }) => {
      const editor = new Editor({
        element: host,
        extensions: [
          StarterKit.configure({
            paragraph: { HTMLAttributes: { class: 'journal-paragraph' } },
            heading: { HTMLAttributes: { class: 'journal-paragraph' } },
            bold: { HTMLAttributes: { class: 'journal-bold' } },
            italic: { HTMLAttributes: { class: 'journal-italic' } },
            strike: { HTMLAttributes: { class: 'journal-strikethrough' } },
            listItem: { HTMLAttributes: { class: 'journal-list-item' } }
          }),
          JournalImage
        ],
        content: documentToTiptap(doc.Content),
        editorProps: { attributes: { spellcheck: 'false' } }
      })

      const toolbar = document.querySelector<HTMLElement>(
        '#journal-editor-toolbar'
      )
      if (!toolbar) return

      const addButton = (
        iconClass: string,
        isActive: () => boolean,
        action: () => void
      ) => {
        const btn = document.createElement('button')
        btn.type = 'button'
        btn.appendChild(
          Object.assign(document.createElement('i'), { className: iconClass })
        )
        btn.addEventListener('click', action)
        editor.on('selectionUpdate', () =>
          btn.classList.toggle('active', isActive())
        )
        toolbar.appendChild(btn)
      }

      addButton(
        'fa-solid fa-bold',
        () => editor.isActive('bold'),
        () => editor.chain().focus().toggleBold().run()
      )
      addButton(
        'fa-solid fa-italic',
        () => editor.isActive('italic'),
        () => editor.chain().focus().toggleItalic().run()
      )
      addButton(
        'fa-solid fa-underline',
        () => editor.isActive('underline'),
        () => editor.chain().focus().toggleUnderline().run()
      )
      addButton(
        'fa-solid fa-strikethrough',
        () => editor.isActive('strike'),
        () => editor.chain().focus().toggleStrike().run()
      )
      addButton(
        'fa-solid fa-heading',
        () => editor.isActive('heading', { level: 2 }),
        () => editor.chain().focus().toggleHeading({ level: 2 }).run()
      )
      addButton(
        'fa-solid fa-list-ul',
        () => editor.isActive('bulletList'),
        () => editor.chain().focus().toggleBulletList().run()
      )
      addButton(
        'fa-solid fa-list-ol',
        () => editor.isActive('orderedList'),
        () => editor.chain().focus().toggleOrderedList().run()
      )
    })
}
