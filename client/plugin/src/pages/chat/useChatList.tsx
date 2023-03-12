import { IMessageList } from '@/../../../chatTypes'
import { useEffect, useState } from 'react'
import { createRoom, listenChat } from '../../request/socket/chat'
import { useAppSelector } from '../../store/hooks'

export default function useChatList(options: { scrollToBottom: () => void }) {
  const user = useAppSelector((state) => state.user.user)
  const roomId = useAppSelector((state) => state.room.roomInfo.roomId)
  const { scrollToBottom } = options
  const [chatList, setChatList] = useState<IMessageList>([])
  useEffect(() => {
    createRoom(roomId!)
    const removeCb = listenChat((data) => {
      const { msg, user: sendUser } = data
      if (sendUser.id === user?.id) {
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
