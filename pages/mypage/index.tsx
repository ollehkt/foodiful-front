import { useEffect, useState } from 'react'
import { useUser } from '../../components/auth/hooks/useUser'
import { User } from '../../components/auth/types/user'
import { getStoredUser } from '../../components/util/userStorage'

function MyPage() {
  const [user, setUser] = useState<User>()

  useEffect(() => {
    const storedUser = getStoredUser()
    if (storedUser) setUser(storedUser)
  }, [])

  return <div></div>
}

export default MyPage
