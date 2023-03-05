import { useEffect, useRef } from 'react'
import useMergeValue from '../hooks/useMergeValue'
import styles from './index.module.less'

interface InputProps {
  value?: string
  onChange?: (value: string, e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export default function Input(props: InputProps) {
  const textRef = useRef<HTMLTextAreaElement>(null)
  const { value: defaultValue, onChange: _onChange } = props
  const [value, setValue] = useMergeValue(defaultValue, {
    value: defaultValue
  })

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value: curValue } = e.target
    console.log(curValue)

    if (!curValue) return
    if (defaultValue === undefined) {
      setValue(curValue)
    }
    _onChange?.(curValue, e)
  }

  useEffect(() => {
    if (textRef.current === null) return
    const target = textRef.current
    const setHeight = () => {
      target.style.height = 'auto'
      target.style.height = target.scrollHeight + 'px'
    }
    setHeight()
  }, [value])

  return (
    <div className={styles.textAreaWrap}>
      <textarea ref={textRef} value={value} onChange={handleInput} rows={1} />
    </div>
  )
}
