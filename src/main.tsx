import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
// 使用了按需引入功能
// import 'antd/dist/antd.less'
import './assets/css/reset.css'
const vm =
  process.env.NODE_ENV === 'development' ? (
    <App />
  ) : (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
ReactDOM.render(vm, document.getElementById('root'))
