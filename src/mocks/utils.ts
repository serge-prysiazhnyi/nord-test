import { http, delay, HttpResponse } from 'msw'

import { server } from './server'

type Method = keyof typeof http

export const simulateDelay = (
  method: Method,
  endpoint: string,
  delayMs: number,
) => {
  server.use(
    http[method](endpoint, async () => {
      await delay(delayMs)
      return HttpResponse.json({})
    }),
  )
}

export const simulateError = (method: Method, endpoint: string) => {
  server.use(http[method](endpoint, () => HttpResponse.error()))
}
