import { useContext, useRef } from 'react'
import globalContext from '../../components/globalContext'
import styles from './index.module.less'
import { useMove } from 'chat-ui'

export default function Header(props: {
  right?: React.ReactNode
  center?: React.ReactNode
  left?: React.ReactNode
}) {
  const [headerRef] = useMove<HTMLDivElement>('#chat_app')
  const [open, setOpen] = useContext(globalContext).open
  const handleSetOpen = () => {
    setOpen(!open)
  }
  return (
    <div className={styles.header}>
      <div className={styles.right}>{props.right}</div>
      <div className={styles.center} ref={headerRef}>
        {props.center}
      </div>
      <div className={styles.openBtn} onClick={handleSetOpen}>
        {props.left}
      </div>
    </div>
  )
}
