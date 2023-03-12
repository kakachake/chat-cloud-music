import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import { GlobalContextProvider } from './components/globalContext'
import { store } from './store'
import './styles/index.less'

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
      <Provider store={store}>
        <GlobalContextProvider>
          <App />
        </GlobalContextProvider>
      </Provider>
    </React.StrictMode>
  )
}

renderChat()
