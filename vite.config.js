import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Bella-salon/',
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      onwarn(warning, warn) {
        // Suppress known harmless warnings
        if (warning.code === 'THIS_IS_UNDEFINED' || 
            (warning.message && warning.message.includes('import-analysis'))) {
          return;
        }
        warn(warning);
      },
      plugins: [
        {
          name: 'suppress-dynamic-import-warning',
          renderChunk(code) {
            if (code && code.includes('import(e.module)')) {
              return {
                code: code.replace(/import\(e\.module\)/g, 'import(/* @vite-ignore */ e.module)'),
                map: null,
              };
            }
            return null;
          }
        }
      ]
    }
  }
})