import { IMessage } from 'chatTypes'
import styles from './index.module.less'
import cs from 'classnames'

interface MessageItemProps extends IMessage {
  [key: string]: any
}

export default function MessageItem(props: MessageItemProps) {
  const {
    content,
    id,
    user: { name, id: userId, avatar },
    isOwn
  } = props
  return (
    <div
      className={cs(styles.messageWrap, {
        [styles.messageItemRight]: isOwn
      })}
    >
      <div>
        <img className={styles.avatar} src={avatar} alt="" />
      </div>
      <div className={styles.main}>
        <div className={styles.username}>{name}</div>
        <div className={styles.content}>{content}</div>
      </div>
    </div>
  )
}
