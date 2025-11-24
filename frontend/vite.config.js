export default {
  build: {
    rollupOptions: {
      input: {
        common: 'common.js',
        editor: 'editor.js',
        search: 'search.js',
        speciesadmin: 'speciesadmin.js',
        imageupload: 'imageupload.js',
        home: 'home.js',
        reorderPatients: 'reorder-patients.js',
        dashboard: 'dashboard.js'
      },
      output: {
        preserveModules: true,
        preserveModulesRoot: '.',
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      }
    },
    outDir: '../cmd/static/bundle',
    emptyOutDir: true,
    target: 'es2020',
    minify: false
  }
}
