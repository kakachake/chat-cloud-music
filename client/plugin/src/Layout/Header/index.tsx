import { useContext, useRef } from 'react'
import globalContext from '../../components/globalContext'
import styles from './index.module.less'
import { useMove } from 'chat-ui'

export default function Header() {
  const [headerRef] = useMove<HTMLDivElement>('#chat_app')
  const [open, setOpen] = useContext(globalContext).open
  const handleSetOpen = () => {
    setOpen(!open)
  }
  return (
    <div className={styles.header}>
      <div>返回</div>
      <div className={styles.center} ref={headerRef}>
        聊天室-1024
      </div>
      <div className={styles.openBtn} onClick={handleSetOpen}>
        最小化
      </div>
    </div>
  )
}
