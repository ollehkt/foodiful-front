import { useState } from 'react'

export const useInput = (initValue: any) => {
  const [value, setValue] = useState<any>(initValue)

  return { value, setValue }
}
