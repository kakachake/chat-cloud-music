import styles from './index.module.less'

export interface ContentProps {
  children: React.ReactNode
}

export default function Content(props: ContentProps) {
  return <div className={styles.content}>{props.children}</div>
}
