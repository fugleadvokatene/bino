import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import { MustQuerySelector } from './common'

const host = MustQuerySelector<HTMLElement>('#editorjs')

const raw = host.dataset.content ?? ''
const pageID = host.dataset.pageId
if (!pageID) throw new Error('pageId missing')

let initial = ''
try {
  const parsed = JSON.parse(raw)
  initial = parsed.content ?? ''
} catch {}

const editor = new Editor({
  element: host,
  extensions: [StarterKit],
  autofocus: true,
  content: initial,
  editorProps: {
    attributes: {
      spellcheck: 'false'
    }
  }
})

const buttonContainer = MustQuerySelector<HTMLElement>(
  '.editor-toolbar-buttons'
)

const addButton = (
  iconClass: string,
  isActive: () => boolean,
  action: () => void
) => {
  const button = document.createElement('button')
  const icon = document.createElement('i')

  icon.className = iconClass
  button.appendChild(icon)
  button.addEventListener('click', action)

  editor.on('selectionUpdate', () => {
    button.classList.toggle('active', isActive())
  })

  buttonContainer.appendChild(button)
}

const printDocument = () => {
  const html = editor.getHTML()
  const win = window.open('', '_blank')
  if (!win) return

  win.document.write(`
    <html>
      <head>
        <title>Document</title>
        <style>
          @page { margin: 1.5cm; }
          body {
            font-family: "Helvetica Neue", Arial, sans-serif;
            font-size: 12.5px;
            line-height: 1.45;
            color: #222;
            margin: 0;
          }
          h1,h2,h3,h4 { font-weight: 600; margin: 0 0 10px; }
          h1 { font-size: 22px }
          h2 { font-size: 17px }
          h3 { font-size: 15px }
          h4 { font-size: 13px }
          p { margin: 0 0 8px }
          ul,ol { margin: 0 0 8px 18px }
          hr { border: none; border-top: 1px solid #ccc; margin: 14px 0 }
        </style>
      </head>
      <body>${html}</body>
    </html>
  `)

  win.document.close()
  win.focus()
  win.print()
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
  'fa-solid fa-heading',
  () => editor.isActive('heading', { level: 1 }),
  () => editor.chain().focus().toggleHeading({ level: 1 }).run()
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
addButton('fa-solid fa-file-pdf', () => false, printDocument)

const statusEl = MustQuerySelector<HTMLElement>('#editor-status')

let saveTimer: number | null = null

const showEllipsis = () => {
  statusEl.className = 'editor-status editor-status-ellipsis'
  statusEl.innerHTML = ''
}

const showCheckmark = () => {
  statusEl.className = 'editor-status'
  statusEl.innerHTML = '<i class="fa-solid fa-check"></i>'
}

const saveContent = async () => {
  showEllipsis()

  await fetch(`/wiki/save/${pageID}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: editor.getJSON() })
  })

  showCheckmark()
}

editor.on('update', () => {
  showEllipsis()
  if (saveTimer !== null) clearTimeout(saveTimer)
  saveTimer = window.setTimeout(saveContent, 750)
})
