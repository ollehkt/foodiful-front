import { ChangeEvent, useCallback, useState } from 'react'

export const useInput = (initValue: any) => {
  const [state, setState] = useState<any>(initValue)

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setState({ ...state, [name]: value })
    console.log('name', name)
    console.log('vlaue', value)
  }

  const reset = useCallback(() => {
    setState(initValue)
  }, [initValue])

  return { state, setState, onChangeInput, reset }
}
