export const fetchData = async <T>(
  url: string,
  options?: RequestInit,
): Promise<T> => {
  try {
    const response = await fetch(url, options)

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
