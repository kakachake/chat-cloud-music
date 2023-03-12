import { useContext } from 'react'
import globalContext from './components/globalContext'
import Layout from './Layout'
import cn from 'classnames'
import Chat from './pages/chat'
import './request/socket/index'
import Home from './pages/home'
import { useAppSelector } from '@/store/hooks'

function App() {
  const [open] = useContext(globalContext).open
  const { roomId } = useAppSelector((state) => state.room.roomInfo)
  const className = cn('chat_app', {
    min: !open
  })
  return (
    <div className={className} id="chat_app">
      <Layout>{roomId ? <Chat /> : <Home />}</Layout>
    </div>
  )
}

export default App
