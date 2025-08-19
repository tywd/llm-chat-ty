import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import qiankunPlugin from 'vite-plugin-qiankun'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(),
    qiankunPlugin('sub-app1', { // 子应用名称
      useDevMode: true,   // 开发模式
    }),
  ],
  server: {
    port: 5174, // 子应用1端口
    cors: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
