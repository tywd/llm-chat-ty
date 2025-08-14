import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    coverage: {
      reporter: ['text', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'src/main.ts',
        '**/*.d.ts',
      ],
    },
    globals: true, // 启用全局 API，这样就不需要每个文件都导入
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})