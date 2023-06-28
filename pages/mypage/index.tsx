import { useEffect } from 'react'
import { useUser } from '../../components/auth/hooks/useUser'
import { getStoredUser } from '../../components/util/userStorage'

function MyPage() {
  let storedUser: any = null
  if (typeof window !== 'undefined') {
    storedUser = getStoredUser()
  }
  const { getUser } = useUser()
  useEffect(() => {
    const user = async () => {
      const res = await getUser(storedUser)
      console.log(res)
    }
    user()
  }, [])
  return <div></div>
}

export default MyPage
