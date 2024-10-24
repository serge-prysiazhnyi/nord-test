import { LOCAL_STORAGE_TOKEN_KEY } from '../constants'

export const setToken = (token: string) => {
  localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token)
}

export const getToken = () => {
  return localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
}

export const removeToken = () => {
  localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY)
}
