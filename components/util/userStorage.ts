const LOCALSTORAGE_KEY = 'foodiful_user'

export const getStoredToken = () => {
  const token = localStorage.getItem(LOCALSTORAGE_KEY)
  return token ? token : null
}

export const setStoreToken = (token: string) => {
  localStorage.setItem(LOCALSTORAGE_KEY, token)
}

export const removeStoredToken = () => {
  localStorage.removeItem(LOCALSTORAGE_KEY)
}
