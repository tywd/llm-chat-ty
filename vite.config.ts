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
   // 动态设置 base 路径：
  // - 独立运行时：使用 Vercel 部署的根路径（或 '/'）
  // - 被 Qiankun 加载时：使用子应用的部署根路径（如 '/sub-app3/' 或子应用的 Vercel 域名）
  base: process.env.NODE_ENV === 'production' 
    ? 'https://llm-chat-ty.vercel.app/'  // 子应用在 Vercel 的实际部署根路径（必须以 / 结尾）
    : '/',  // 开发环境用相对路径
  build: {
    lib: {
      name: 'sub-app3',  // 子应用名称（需与主应用注册的 name 一致）
      entry: './src/main.ts',  // 入口文件
      formats: ['umd'],  // 强制输出 umd 格式
      fileName: () => 'index.js'  // 固定输出文件名（避免哈希导致路径变化）
    },
    rollupOptions: {
      // 确保外部化 Vue 等依赖（避免与主应用冲突）
      external: ['vue', 'vue-router'],
      output: {
        // 全局变量映射（与 external 对应）
        globals: {
          vue: 'Vue',
          'vue-router': 'VueRouter'
        }
      }
    }
  }
})
