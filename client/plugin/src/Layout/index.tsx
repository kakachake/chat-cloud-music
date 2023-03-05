import styles from './index.module.less'
import Header from './Header'
import Content from './Content'

export interface LayoutProps {
  children: React.ReactNode
}

export default function Layout(props: LayoutProps) {
  const children = props.children
  return (
    <div className={styles.layout}>
      <Header />
      <Content>{children}</Content>
    </div>
  )
}
