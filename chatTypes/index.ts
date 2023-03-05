export interface User {
  id: number
  name: string
  avatar: string
}

export interface IMessage {
  id: number
  content: string
  user: User
}

export type IMessageList = IMessage[]
