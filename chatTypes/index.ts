export interface User {
  id: string
  name: string
  avatar: string
}

export interface IMessage {
  id: number
  content: string
  user: User
  isOwn: boolean
}

export type IMessageList = IMessage[]
