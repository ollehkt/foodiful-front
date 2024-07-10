import { User } from '../auth/types/user'

export const encodingUserId = (userId: number) => {
  return `${userId.toString()}****`
}
