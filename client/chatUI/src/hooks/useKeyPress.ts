import { useEffect } from 'react'

export default function useKeyPress(onKeyDown: (e: KeyboardEvent) => void) {
  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  })
}
