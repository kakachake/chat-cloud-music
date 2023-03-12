import styles from './index.module.less'
import ChatInputBar from './chatInputBar'
import { MessageList } from 'chat-ui'
import { useRef } from 'react'
import { leaveRoom, sendMsg } from '../../request/socket/chat'
import useChatList from './useChatList'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import Header from '@/Layout/Header'
import { setRoomId } from '@/store/slice/roomSlice'

export default function Chat() {
  const { user } = useAppSelector((state) => state.user)
  const roomId = useAppSelector((state) => state.room.roomInfo.roomId)
  const messageRef = useRef<HTMLDivElement | null>(null)
  const [chatList, setChatList] = useChatList({
    scrollToBottom
  })
  function scrollToBottom() {
    if (messageRef.current) {
      const { scrollTop, scrollHeight, offsetHeight } = messageRef.current
      if (scrollTop + offsetHeight >= scrollHeight - 100) {
        setTimeout(() => {
          const { scrollHeight } = messageRef.current!
          messageRef.current?.scrollTo({
            top: scrollHeight,
            behavior: 'smooth'
          })
        })
      }
    }
  }
  const handleSend = (value: string) => {
    sendMsg(value)
    if (!user) return
    setChatList((prev) => {
      return [
        ...prev,
        {
          content: value,
          id: prev.length + 1,
          user,
          isOwn: true
        }
      ]
    })
    scrollToBottom()
  }
  const handleExit = () => {
    leaveRoom(roomId!)
  }

  return (
    <div className={styles.chatWrap}>
      <Header
        right={
          <div className={styles.exit} onClick={handleExit}>
            退出
          </div>
        }
        center={<div>聊天室-{roomId}</div>}
        left={<div>最小化</div>}
      ></Header>
      <div className={styles.messageWrap} ref={messageRef}>
        <MessageList chatList={chatList} />
      </div>
      <ChatInputBar onSend={handleSend} />
    </div>
  )
}
