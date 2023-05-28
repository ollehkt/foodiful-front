import { useState } from 'react'

export const useUser = () => {
  const [user, setUser] = useState({
    userId: '',
    password: '',
    phone: '',
    name: '',
  })

  return { setUser, user }
}
