import { useState } from 'react'
import useEffectNotFirst from './useEffectNotFirst'

/**
 * @description
 * 用于合并state，如受控于外部的state
 */
export default function useMergeValue<T>(
  defaultStateValue: T,
  props?: {
    value?: T
    defaultValue?: T
  }
) {
  const { value, defaultValue } = props || {}
  // 优先级： props.value > props.defaultValue > defaultStateValue
  const [stateValue, setStateValue] = useState<T>(
    value ?? defaultValue ?? defaultStateValue
  )

  useEffectNotFirst(() => {
    if (value !== undefined) {
      setStateValue(value)
    }
  }, [value])

  const mergedValue = value !== undefined ? value : stateValue

  return [mergedValue, setStateValue] as const
}
