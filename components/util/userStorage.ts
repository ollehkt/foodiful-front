'use client'
import { User } from '../auth/types/user'
import { LOCALSTORAGE_KEY } from '../constants/localStorageKey'

export const getStoredUser = (): User | null => {
  const user = localStorage.getItem(LOCALSTORAGE_KEY)
  return user ? JSON.parse(user) : null
}

export const setStoreUser = (user: User): void => {
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(user))
}

export const removeStoredUser = (): void => {
  localStorage.removeItem(LOCALSTORAGE_KEY)
}
