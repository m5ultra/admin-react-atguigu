import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import vitePluginImp from 'vite-plugin-imp'
import path from 'path'
export default defineConfig({
  plugins: [
    react(), // 脚手架生成的
    reactRefresh(), // 刷新
    vitePluginImp({
      // antd按需引入的配置 main.ts无需在引入样式
      libList: [
        {
          libName: 'antd',
          style: (name) => `antd/lib/${name}/style/index.less`,
        },
      ],
    }),
  ],
  server: {
    port: 8080, // 默认端口
    proxy: {
      // 本地代理用的
      '/api': {
        // 遇见/api 前缀的请求 就会自动触发代理配置
        target: 'http://localhost:5000', // 真正有数据的服务器地址 请求转发给谁
        changeOrigin: true, // 控制服务器收到的请求头中Host的值 设置未false: Host的值是客户端地址 true：服务端地址
        rewrite: (path) => path.replace(/^\/api/, ''), // 重写请求路径 （必须）
      },
    },
  },
  css: {
    // 修改antd默认主题用的
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          'primary-color': '#1DA57A',
          'link-color': '#1DA57A',
          'border-radius-base': '2px',
        },
      },
    },
  },
  resolve: {
    alias: { // TODO: not work 不一定是最优选择 文件不能跳转是个坑
      '@': path.resolve(__dirname, 'src'), // src 路径
      // 'pages': path.resolve(__dirname, 'pages')
    },
  },
})
