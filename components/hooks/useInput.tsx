import { useState } from 'react'

export const useInput = (initValue: string | number) => {
  const [value, setValue] = useState(initValue)
  return { value, setValue }
}
