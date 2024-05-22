'use client'
import { User } from '../auth/types/user'
import { LOCALSTORAGE_KEY } from '../constants/localStorageKey'

export const getStoredUser = (): User | null => {
  if (window !== undefined) {
    const user = localStorage.getItem(LOCALSTORAGE_KEY)
    return user && user !== 'undefined' ? JSON.parse(user) : null
  } else return null
}

export const setStoreUser = (user: User | null | undefined): void => {
  if (user) localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(user))
}

export const removeStoredUser = (): void => {
  localStorage.removeItem(LOCALSTORAGE_KEY)
}
