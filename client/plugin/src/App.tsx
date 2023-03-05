import { useContext } from 'react'
import globalContext from './components/globalContext'
import Layout from './Layout'
import cn from 'classnames'
import Chat from './pages/chat'

function App() {
  const [open] = useContext(globalContext).open
  const className = cn('chat_app', {
    min: !open
  })
  return (
    <div className={className} id="chat_app">
      <Layout>
        <Chat />
      </Layout>
    </div>
  )
}

export default App
