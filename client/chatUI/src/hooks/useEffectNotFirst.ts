import { useEffect, useRef } from 'react'

export default function useEffectNotFirst(callback: () => void, deps: any[]) {
  const isFirst = useRef(true)
  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false
      return
    }
    return callback()
  }, deps)
}
