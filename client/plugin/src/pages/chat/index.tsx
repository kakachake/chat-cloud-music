import style from './index.module.less'
import ChatInputBar from './chatInputBar'
import { MessageList } from 'chat-ui'
import { useEffect, useRef, useState } from 'react'
import { IMessageList } from 'chatTypes'

export default function Chat() {
  const messageRef = useRef<HTMLDivElement | null>(null)
  const [chatList, setChatList] = useState<IMessageList>([])
  const handleSend = (value: string) => {
    setChatList((prev) => {
      return [
        ...prev,
        {
          content: value,
          id: prev.length + 1,
          user: {
            id: Math.random() > 0.5 ? 1 : 2,
            name: '小明',
            avatar:
              'http://p2.music.126.net/hu5fA12xFpK9_6G27Kmbpw==/109951165136954444.jpg'
          }
        }
      ]
    })
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

  return (
    <div className={style.chatWrap}>
      <div className={style.messageWrap} ref={messageRef}>
        <MessageList chatList={chatList} />
      </div>
      <ChatInputBar onSend={handleSend} />
    </div>
  )
}
