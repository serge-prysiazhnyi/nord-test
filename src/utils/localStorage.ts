import { LOCAL_STORAGE_TOKEN_KEY } from '../constants'

export const setTokenInLocalStorage = (token: string) => {
  localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token)
}

export const getTokenFromLocalStorage = () => {
  return localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
}

export const removeTokenFromLocalStorage = () => {
  localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY)
}
