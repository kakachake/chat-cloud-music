import { IMessageList } from 'chatTypes'
import { useEffect, useState } from 'react'
import { listenChat, user } from '../../request/socket/chat'

export default function useChatList(options: { scrollToBottom: () => void }) {
  const { scrollToBottom } = options
  const [chatList, setChatList] = useState<IMessageList>([])
  useEffect(() => {
    const removeCb = listenChat((data) => {
      const { msg, user: sendUser } = data

      if (sendUser.id === user.id) {
        return
      }
      setChatList((prev) => {
        scrollToBottom()
        return [
          ...prev,
          {
            content: msg,
            id: prev.length + 1,
            user: {
              id: data.user.id,
              name: data.user.name,
              avatar: data.user.avatar
            },
            isOwn: false
          }
        ]
      })
    })
    return () => {
      removeCb()
    }
  }, [])
  return [chatList, setChatList] as const
}
