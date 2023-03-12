import styles from './index.module.less'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { useAppDispatch } from '@/store/hooks'
import { setRoomId as _setRoomId } from '@/store/slice/roomSlice'
import Header from '@/Layout/Header'

export default function Home() {
  const [roomId, setRoomId] = useState<string>('')
  const dispatch = useAppDispatch()
  const handleClick = () => {
    if (!roomId) {
      return
    }
    dispatch(_setRoomId(roomId))
  }
  return (
    <>
      <Header center={'聊天室'} />
      <div className={styles.homeWrap}>
        <div className={styles.homeContent}>
          <div className={styles.inputWrap}>
            <input
              value={roomId}
              onChange={(e) => {
                const value = e.target.value
                const reg = /^[0-9]*$/
                if (!reg.test(value)) {
                  return
                }
                setRoomId(e.target.value)
              }}
              type="text"
              placeholder="请输入房间号"
            />
          </div>
          <div className={styles.btnWrap} onClick={handleClick}>
            <button className={styles.btn}>
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
