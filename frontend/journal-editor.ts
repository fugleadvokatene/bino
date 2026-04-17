import { Editor, Node } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import {
  type DocElement,
  type TiptapNode,
  documentToTiptap,
  tiptapToDocument
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

const host = document.querySelector<HTMLElement>('#journal-editor')
if (host) {
  const url = host.dataset.url
  if (!url) throw new Error('data-url missing on #journal-editor')

  fetch(url)
    .then((r) => r.json())
    .then((doc: { Content: DocElement[] }) => {
      let saveTimer: ReturnType<typeof setTimeout> | null = null
      const scheduleSave = () => {
        if (saveTimer !== null) clearTimeout(saveTimer)
        saveTimer = setTimeout(() => {
          saveTimer = null
          const content = tiptapToDocument(editor.getJSON() as TiptapNode)
          fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Content: content })
          })
        }, 1000)
      }

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
        editorProps: { attributes: { spellcheck: 'false' } },
        onUpdate: () => scheduleSave()
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
