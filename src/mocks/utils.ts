import { http, delay, HttpResponse } from 'msw'

import { server } from './server'

type Method = keyof typeof http

export const mockJsonResponse = <T extends object>(
  method: Method,
  endpoint: string,
  data: T,
  delayMs?: number,
) => {
  server.use(
    http[method](endpoint, async () => {
      if (delayMs) {
        await delay(delayMs)
      }
      return HttpResponse.json(data)
    }),
  )
}

export const simulateError = (method: Method, endpoint: string) => {
  server.use(http[method](endpoint, () => HttpResponse.error()))
}
