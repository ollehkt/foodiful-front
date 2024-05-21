import { User } from '../auth/types/user'

export const encodingUserId = (user: User) => {
  return user.role === 'ADMIN'
    ? user.id
    : user.id.toString().length > 5
    ? `${user.id.toString().slice(0, 4)}****`
    : `${user.id}****`
}
