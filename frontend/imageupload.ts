
import { MustQuerySelector } from './dom'

import 'filepond/dist/filepond.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import 'filepond-plugin-image-edit/dist/filepond-plugin-image-edit.css'

import 'lightbox2/dist/css/lightbox.css'
import lightbox from 'lightbox2'

import * as FilePond from 'filepond'
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImageValidateSize from 'filepond-plugin-image-validate-size'
import FilePondPluginImageCrop from 'filepond-plugin-image-crop'
import FilePondPluginImageEdit from 'filepond-plugin-image-edit'
import FilePondPluginImageTransform from 'filepond-plugin-image-transform'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'

FilePond.registerPlugin(
  FilePondPluginFileValidateSize,
  FilePondPluginImageExifOrientation,
  FilePondPluginImageValidateSize,
  FilePondPluginImageCrop,
  FilePondPluginImageEdit,
  FilePondPluginImageTransform,
  FilePondPluginImagePreview
)

const fileInput = MustQuerySelector<HTMLElement>('#general-file-uploader')
const fileSubmit = MustQuerySelector<HTMLButtonElement>('#general-file-submit')

FilePond.create(fileInput, {
  server: '/file/filepond',
  instantUpload: true,
  maxFileSize: '50MB',
  onaddfilestart: _ => {
    fileSubmit.disabled = true
    fileSubmit.textContent = LN.FilesPleaseWait
  },
  onprocessfiles: _ => {
    fileSubmit.disabled = false
    fileSubmit.textContent = LN.GenericSave
  }
});

lightbox.option({
  alwaysShowNavOnTouchDevices: true,
  disableScrolling: true,
  fadeDuration: 0,
  fitImagesInViewport: true,
  resizeDuration: 0,
  imageFadeDuration: 0
});
