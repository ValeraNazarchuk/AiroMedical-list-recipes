import React from 'react'
import './assets/style/main.css'
import { CRouter } from './modules/root'
import { ConfigProvider } from 'antd'

function App() {
  return (
    <ConfigProvider>
      <CRouter />
    </ConfigProvider>
  )
}

export default App
