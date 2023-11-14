import { ChangeEvent, useCallback, useState } from 'react'

export const useInput = <T extends { [K in keyof T]: U }, U>(initValue: T) => {
  const [state, setState] = useState<T>(initValue)

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setState({ ...state, [name]: value })
  }

  const reset = useCallback(() => {
    setState(initValue)
  }, [initValue])

  return { state, setState, onChangeInput, reset }
}
