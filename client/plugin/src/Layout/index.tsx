import styles from './index.module.less'
import Header from './Header'
import Content from './Content'
import { useContext } from 'react'
import globalContext from '../components/globalContext'
import { MessageCircle } from 'lucide-react'
import cn from 'classnames'
import { useMove } from 'chat-ui'
export interface LayoutProps {
  children: React.ReactNode
}

export default function Layout(props: LayoutProps) {
  const [open, setOpen] = useContext(globalContext).open
  const [headerRef, isDraged] = useMove<HTMLDivElement>('#chat_app', [open])
  const children = props.children
  if (!open) {
    return (
      <div
        className={cn(styles.layout, {
          [styles.min]: !open
        })}
        ref={headerRef}
        onClick={() => {
          console.log(isDraged.current)

          if (isDraged.current) return
          setOpen(true)
        }}
      >
        <MessageCircle size={24} />
        chat
      </div>
    )
  }
  return (
    <div className={styles.layout}>
      <Content>{children}</Content>
    </div>
  )
}
