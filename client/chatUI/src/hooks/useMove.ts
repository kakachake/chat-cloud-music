import { useEffect, useRef } from 'react'

export default function useMove<T extends HTMLElement>(
  moveElementName: string
) {
  const targetRef = useRef<T | null>(null)
  const moveOffsetRef = useRef<{
    x: number
    y: number
  }>({
    x: 0,
    y: 0
  })
  useEffect(() => {
    const moveElement = document.querySelector(moveElementName) as HTMLElement
    console.log(moveElement)

    if (!targetRef.current || !moveElement) return

    const { current } = targetRef
    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e

      const { newX, newY } = {
        newX: clientX - moveOffsetRef.current.x,
        newY: clientY - moveOffsetRef.current.y
      }
      moveElement.style.left = `${newX}px`
      moveElement.style.top = `${newY}px`
    }
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }
    current.addEventListener('mousedown', (e: MouseEvent) => {
      const { left, top } = moveElement.getBoundingClientRect()
      moveOffsetRef.current = {
        x: e.clientX - left,
        y: e.clientY - top
      }
      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)
    })
    return () => {
      current.removeEventListener('mousedown', () => {
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)
      })
    }
  }, [moveElementName, targetRef])
  return [targetRef] as const
}
