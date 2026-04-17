import { Editor, Node } from '@tiptap/core'
import { Paragraph } from '@tiptap/extension-paragraph'
import { Heading } from '@tiptap/extension-heading'
import StarterKit from '@tiptap/starter-kit'
import {
  type GDocsDoc,
  type TiptapNode,
  gdocsToTiptap,
  tiptapToGdocs
} from './journal-converter'

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
    container: `width: min(${Math.round(width)}px, 100%); aspect-ratio: ${Math.round(width)}/${Math.round(height)}; overflow: hidden; position: relative`,
    img: `position: absolute; width: ${scaleX}%; height: ${scaleY}%; left: ${leftPct}%; top: ${topPct}%; max-width: none`
  }
}

const paraIdAttr = {
  default: -1,
  keepOnSplit: false,
  renderHTML(attrs: Record<string, unknown>) {
    return { 'data-para-id': attrs['paraId'] }
  },
  parseHTML(element: HTMLElement) {
    const v = element.getAttribute('data-para-id')
    return v !== null ? parseInt(v, 10) : -1
  }
}

// Extend Paragraph to carry paraId as a preserved attribute.
// keepOnSplit: false prevents new paragraphs (created by pressing Enter)
// from inheriting the predecessor's paraId — they should default to -1.
const ParagraphWithParaId = Paragraph.extend({
  addAttributes() {
    return { ...this.parent?.(), paraId: paraIdAttr }
  }
})

// Extend Heading to carry paraId as a preserved attribute.
const HeadingWithParaId = Heading.extend({
  addAttributes() {
    return { ...this.parent?.(), paraId: paraIdAttr }
  }
})

// Replicates DocImage.Templ() rendering
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
      crop: { default: [0, 0, 0, 0] },
      imageId: { default: '' }
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

const host = document.querySelector<HTMLElement>('#journal-editor')
if (host) {
  const url = host.dataset.url
  if (!url) throw new Error('data-url missing on #journal-editor')

  const readonly = host.dataset.readonly === 'true'

  fetch(url)
    .then((r) => r.json())
    .then((gdocsDoc: GDocsDoc) => {
      const statusEl = document.querySelector<HTMLElement>(
        '#journal-editor-status'
      )
      const showEllipsis = () => {
        if (statusEl) {
          statusEl.className = 'editor-status editor-status-ellipsis'
          statusEl.innerHTML = ''
        }
      }
      const showCheckmark = () => {
        if (statusEl) {
          statusEl.className = 'editor-status'
          statusEl.innerHTML = '<i class="fa-solid fa-check"></i>'
        }
      }

      let saveTimer: ReturnType<typeof setTimeout> | null = null
      const scheduleSave = () => {
        showEllipsis()
        if (saveTimer !== null) clearTimeout(saveTimer)
        saveTimer = setTimeout(() => {
          saveTimer = null
          const gdocs = tiptapToGdocs(editor.getJSON() as TiptapNode)
          fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(gdocs)
          }).then(showCheckmark)
        }, 1000)
      }

      const editor = new Editor({
        element: host,
        extensions: [
          StarterKit.configure({
            // Replace built-in Paragraph and Heading with our extended versions.
            paragraph: false,
            heading: false,
            bold: { HTMLAttributes: { class: 'journal-bold' } },
            italic: { HTMLAttributes: { class: 'journal-italic' } },
            strike: { HTMLAttributes: { class: 'journal-strikethrough' } },
            listItem: { HTMLAttributes: { class: 'journal-list-item' } }
          }),
          ParagraphWithParaId.configure({
            HTMLAttributes: { class: 'journal-paragraph' }
          }),
          HeadingWithParaId.configure({
            HTMLAttributes: { class: 'journal-paragraph' }
          }),
          JournalImage
        ],
        content: gdocsToTiptap(gdocsDoc),
        editable: !readonly,
        editorProps: { attributes: { spellcheck: 'false' } },
        onUpdate: () => {
          if (!readonly) scheduleSave()
        }
      })

      if (readonly) return

      const toolbar = document.querySelector<HTMLElement>(
        '#journal-editor-toolbar .editor-toolbar-buttons'
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
