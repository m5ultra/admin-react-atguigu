import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
// 使用了按需引入功能 这个就不需要了
// import 'antd/dist/antd.less'
import memoryUtils from './utils/memoryUtils'
import storageUtils from './utils/storageUtils'
memoryUtils.user = storageUtils.getUser()
import './assets/css/reset.css'
const vm =
  process.env.NODE_ENV === 'development' ? (
    <App />
  ) : (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)
root.render(vm)

