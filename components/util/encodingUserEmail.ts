import { User } from '../auth/types/user'

export const encodingUserEmail = (user: User) => {
  return user.role === 'ADMIN' ? user.email : `${user.email.split('@')[0].toString()}****`
}
