export default {
  build: {
    rollupOptions: {
        input: {
            editor: 'editor.js',
            search: 'search.js',
            speciesadmin: 'speciesadmin.js',
            imageupload: 'imageupload.js',
        },
        output: {
            entryFileNames: '[name].js',
            chunkFileNames: '[name].js',
            assetFileNames: '[name].[ext]'
        }
    },
    outDir: '../cmd/static/bundle',
    emptyOutDir: true
  }
}
