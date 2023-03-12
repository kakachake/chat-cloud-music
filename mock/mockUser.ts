import type { User } from '../chatTypes'
import { v4 as uuidv4 } from 'uuid'

export default function mockUser(): User {
  // 每次生成不同的用户
  const name = '用户-' + Math.floor(Math.random() * 1000)
  const id = uuidv4()
  return {
    id,
    // 随机名
    name,
    // 随机头像
    avatar: `https://api.multiavatar.com/${id}.svg`
  }
}
