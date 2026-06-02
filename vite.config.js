import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Bella-salon/',
  build: {
    rollupOptions: {
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