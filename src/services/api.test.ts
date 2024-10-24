import { http, HttpResponse } from 'msw'

import { server } from '../mocks/server'
import { fetchData } from './api'

import { simulateError, mockJsonResponse } from '../mocks/utils'

describe('fetchData', () => {
  const TEST_URL = '/api/test'

  beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' })
  })

  afterEach(() => {
    server.resetHandlers()
    vi.clearAllMocks()
  })

  afterAll(() => {
    server.close()
  })

  test('should fetch data successfully', async () => {
    const mockData = { message: 'success' }

    mockJsonResponse('get', TEST_URL, mockData)

    const result = await fetchData(TEST_URL)
    expect(result).toEqual(mockData)
  })

  test('should handle non-JSON responses', async () => {
    server.use(
      http.get(TEST_URL, () => {
        return new HttpResponse('Invalid JSON', {
          headers: { 'Content-Type': 'text/plain' },
        })
      }),
    )

    await expect(fetchData(TEST_URL)).rejects.toThrow(SyntaxError)
  })

  test('should handle HTTP error with JSON error response', async () => {
    const errorMessage = 'Invalid request'

    server.use(
      http.get(TEST_URL, () => {
        return new HttpResponse(JSON.stringify({ message: errorMessage }), {
          status: 400,
        })
      }),
    )

    await expect(fetchData(TEST_URL)).rejects.toThrow(errorMessage)
  })

  test('should handle network errors', async () => {
    simulateError('get', TEST_URL)

    await expect(fetchData(TEST_URL)).rejects.toThrow()
  })

  test('should handle request options', async () => {
    const mockData = { message: 'success' }

    let capturedRequest: Request | null = null

    server.use(
      http.post(TEST_URL, ({ request }) => {
        capturedRequest = request
        return HttpResponse.json(mockData)
      }),
    )

    const options: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-test': 'foobar' },
      body: JSON.stringify({ test: 'data' }),
    }

    await fetchData(TEST_URL, options)

    server.events.on('request:start', () => {
      expect(capturedRequest?.method).toBe('POST')
      expect(capturedRequest?.headers.get('Content-Type')).toBe(
        'application/json',
      )
      expect(capturedRequest?.headers.get('x-test')).toBe('foobar')
    })
  })

  test('should log errors to console', async () => {
    const consoleSpy = vi.spyOn(console, 'error')

    simulateError('get', TEST_URL)

    try {
      await fetchData(TEST_URL)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      expect(consoleSpy).toHaveBeenCalled()
    } finally {
      consoleSpy.mockRestore()
    }
  })
})
