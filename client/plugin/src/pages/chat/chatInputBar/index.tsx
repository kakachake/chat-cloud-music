import styles from './index.module.less'
import { Input } from 'chat-ui'
import { PlusCircle, Send } from 'lucide-react'
import { useState } from 'react'
import { IMessageList } from 'chatTypes'

interface ChatInputBarProps {
  onSend: (value: string) => void
}

export default function ChatInputBar(props: ChatInputBarProps) {
  const { onSend } = props
  const [inputValue, setInputValue] = useState<string>('')
  const handleSend = () => {
    if (!inputValue) return
    onSend?.(inputValue)
    setInputValue('')
  }
  return (
    <div className={styles.barWrap}>
      <div className={styles.plusWrap}>
        <PlusCircle size={18} />
      </div>
      <div className={styles.inputWrap}>
        <Input value={inputValue} onChange={setInputValue} />
      </div>
      <div className={styles.sendWrap} onClick={handleSend}>
        <Send size={16} />
      </div>
    </div>
  )
}
