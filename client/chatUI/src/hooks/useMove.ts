import { useEffect, useRef } from 'react'

export default function useMove<T extends HTMLElement>(
  moveElementName: string,
  deps: any[] = []
) {
  const targetRef = useRef<T | null>(null)
  const isDraged = useRef(false)
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
      isDraged.current = true
      const { clientX, clientY } = e

      const { newX, newY } = {
        newX: clientX - moveOffsetRef.current.x,
        newY: clientY - moveOffsetRef.current.y
      }
      moveElement.style.left = `${newX}px`
      moveElement.style.top = `${newY}px`
    }
    const onMouseUp = (e: any) => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }
    current.addEventListener('mousedown', (e: MouseEvent) => {
      isDraged.current = false
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
  }, [moveElementName, targetRef, ...deps])
  return [targetRef, isDraged] as const
}
