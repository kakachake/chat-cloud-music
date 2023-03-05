import { IMessageList } from 'chatTypes'
import MessageItem from './MessageItem/'
import styles from './index.module.less'

interface MessageListProps {
  chatList: IMessageList
}

export default function MessageList(props: MessageListProps) {
  const { chatList } = props
  return (
    <div className={styles.messageWrap}>
      {chatList.map((item) => {
        return <MessageItem key={item.id} {...item} />
      })}
    </div>
  )
}
