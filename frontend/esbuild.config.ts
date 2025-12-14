import { rmSync } from 'fs'
import { build } from 'esbuild'

rmSync('../cmd/static/bundle', { recursive: true, force: true })

build({
  entryPoints: [
    'common.ts',
    'dashboard.ts',
    'editable.ts',
    'editor2.ts',
    'ff.ts',
    'formerpatients.ts',
    'home.ts',
    'imageupload.ts',
    'lang.ts',
    'reorder-patients.ts',
    'search.ts',
    'speciesadmin.ts'
  ],
  outdir: '../cmd/static/bundle',
  bundle: true,
  format: 'esm',
  sourcemap: false,
  target: 'es2020',
  splitting: false,
  entryNames: '[name]',
  assetNames: '[name]',
  loader: {
    '.png': 'file',
    '.gif': 'file',
    '.jpg': 'file',
    '.jpeg': 'file',
    '.svg': 'file',
    '.css': 'css'
  }
})
