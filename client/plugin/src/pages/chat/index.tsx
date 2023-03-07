import style from './index.module.less'
import ChatInputBar from './chatInputBar'
import { MessageList } from 'chat-ui'
import { useEffect, useRef, useState } from 'react'
import { IMessageList } from 'chatTypes'
import { sendMsg, user } from '../../request/socket/chat'
import useChatList from './useChatList'

export default function Chat() {
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

  return (
    <div className={style.chatWrap}>
      <div className={style.messageWrap} ref={messageRef}>
        <MessageList chatList={chatList} />
      </div>
      <ChatInputBar onSend={handleSend} />
    </div>
  )
}
