import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'

const raw = document.getElementById('editorjs').dataset.content
let initial = ''

try {
  const parsed = JSON.parse(raw)
  initial = parsed.content   // unwrap the actual document
} catch (_) {
  initial = ''
}
const pageID = document.getElementById('editorjs').dataset.pageId;

const editor = new Editor({
  element: document.getElementById('editorjs'),
  extensions: [
    StarterKit,
  ],
  autofocus: true,
  content: initial || '',
  editorProps: {
    attributes: {
      spellcheck: 'false'
    }
  }
})

const buttonContainer = document.querySelector('.editor-toolbar-buttons')

function addButton(iconClass, isActive, action) {
  const b = document.createElement('button')
  const i = document.createElement('i')
  i.className = iconClass
  b.appendChild(i)
  b.addEventListener('click', action)
  editor.on('selectionUpdate', () => {
    if (isActive()) b.classList.add('active')
    else b.classList.remove('active')
  })
  buttonContainer.appendChild(b)
}
function printDocument() {
  const html = editor.getHTML()
  const win = window.open('', '_blank')

  win.document.write(`
    <html>
      <head>
        <title>Document</title>
        <style>

          @page {
            margin: 1.5cm;
          }

          body {
            font-family: "Helvetica Neue", Arial, sans-serif;
            font-size: 12.5px;
            line-height: 1.45;
            color: #222;
            padding: 0;
            margin: 0;
          }

          h1, h2, h3, h4 {
            font-weight: 600;
            margin: 0 0 10px;
            color: #111;
          }

          h1 { font-size: 22px; margin-top: 4px; }
          h2 { font-size: 17px; margin-top: 12px; }
          h3 { font-size: 15px; margin-top: 12px; }
          h4 { font-size: 13px; margin-top: 10px; }

          p {
            margin: 0 0 8px;
          }

          ul, ol {
            margin: 0 0 8px 18px;
            padding: 0;
          }

          li {
            margin: 2px 0;
          }

          hr {
            border: none;
            border-top: 1px solid #ccc;
            margin: 14px 0;
          }
        </style>
      </head>
      <body>${html}</body>
    </html>
  `)

  win.document.close()
  win.focus()
  win.print()
}
addButton('fa-solid fa-bold', () => editor.isActive('bold'), () => editor.chain().focus().toggleBold().run())
addButton('fa-solid fa-italic', () => editor.isActive('italic'), () => editor.chain().focus().toggleItalic().run())
addButton('fa-solid fa-heading', () => editor.isActive('heading', { level: 1 }), () => editor.chain().focus().toggleHeading({ level: 1 }).run())
addButton('fa-solid fa-list-ul', () => editor.isActive('bulletList'), () => editor.chain().focus().toggleBulletList().run())
addButton('fa-solid fa-list-ol', () => editor.isActive('orderedList'), () => editor.chain().focus().toggleOrderedList().run())
addButton('fa-solid fa-file-pdf', () => false, printDocument)

const statusEl = document.getElementById('editor-status')
let saveTimer = null

function showEllipsis() {
  statusEl.className = 'editor-status editor-status-ellipsis'
  statusEl.innerHTML = ''
}

function showCheckmark() {
  statusEl.className = 'editor-status'
  statusEl.innerHTML = '<i class="fa-solid fa-check"></i>'
}

async function saveContent() {
  showEllipsis()

  const json = editor.getJSON()

  await fetch(`/wiki/save/${pageID}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: json })
  })

  showCheckmark()
}

editor.on('update', () => {
  showEllipsis()
  if (saveTimer) clearTimeout(saveTimer)
  saveTimer = setTimeout(saveContent, 750)
})