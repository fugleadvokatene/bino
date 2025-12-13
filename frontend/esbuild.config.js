import {rmSync} from 'fs';
import { build } from 'esbuild';

rmSync('../cmd/static/bundle', { recursive: true, force: true });

build({
  entryPoints: [
    'common.js',
    'editor.js',
    'editor2.js',
    'search.js',
    'speciesadmin.js',
    'imageupload.js',
    'home.js',
    'reorder-patients.js',
    'dashboard.js',
    'formerpatients.js',
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
    '.css': 'css',
  },
});
