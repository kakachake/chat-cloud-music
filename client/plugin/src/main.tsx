import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.less'

export function renderChat(container?: HTMLElement) {
  if (!container) {
    const root = document.createElement('div')
    root.id = 'chat'
    document.body.appendChild(root)
  }
  ReactDOM.createRoot(
    container || (document.getElementById('chat') as HTMLElement)
  ).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}

renderChat()
