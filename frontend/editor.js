import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header'
import EditorjsList from '@editorjs/list'
import ImageTool from '@editorjs/image'
import Table from '@editorjs/table'

const initialContent = document.getElementById('editorjs').dataset.content
const editToggler = document.getElementById('editor-edit-toggler')
const pageID = editToggler.dataset.id

document.body.setAttribute('spellcheck', false)
document.body.setAttribute('autocomplete', false)
document.body.setAttribute('autocorrect', false)
const editor = new EditorJS({
  holder: 'editorjs',
  placeholder: 'Write something...',
  readOnly: true,
  tools: {
    header: {
      class: Header,
      inlineToolbar: true
    },
    list: {
      class: EditorjsList,
      inlineToolbar: true
    },
    table: {
      class: Table,
      config: {
        rows: 2,
        cols: 2
      },
      inlineToolbar: true
    },
    image: {
      class: ImageTool,
      config: {
        endpoints: {
          byFile: `/wiki/uploadimage/${pageID}`,
          byUrl: `/wiki/fetchimage/${pageID}`
        }
      },
      features: {
        border: false,
        caption: 'optional',
        stretch: true
      }
    }
  },
  data: JSON.parse(initialContent)
});

const editTogglerIcon = editToggler.querySelector('i')
const editTogglerLabel = editToggler.querySelector('span')

editToggler.addEventListener('click', event => {
  if (editor.readOnly.isEnabled) {
    editToggler.classList.add('btn-success')
    editToggler.classList.remove('btn-primary')
    editTogglerIcon.classList.add('fa-save')
    editTogglerIcon.classList.remove('fa-file-pen')
    editTogglerLabel.textContent = LN.GenericSave
    editor.readOnly.toggle()
  } else {
    editToggler.classList.add('btn-primary')
    editToggler.classList.remove('btn-success')
    editTogglerIcon.classList.add('fa-file-pen')
    editTogglerIcon.classList.remove('fa-save')
    editTogglerLabel.textContent = LN.GenericEdit

    editor.save().then(content => {
      fetch(`/wiki/save/${pageID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(content)
      })
      editor.readOnly.toggle()
    })
  }
})

window.addEventListener('beforeunload', event => {
  if (!editor.readOnly.isEnabled) {
    event.preventDefault()
  }
})
