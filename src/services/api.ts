import { store } from '../store/store'

export const fetchData = async <T>(
  url: string,
  options: RequestInit = {},
): Promise<T> => {
  try {
    const token = store.getState()?.auth?.token

    const finalOptions: RequestInit = token
      ? {
          ...options,
          headers: { ...options?.headers, Authorization: `Bearer ${token}` },
        }
      : options

    const response = await fetch(url, finalOptions)

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`)
    }

    return data as T
  } catch (error: unknown) {
    console.error((error as Error).message)
    throw error
  }
}
