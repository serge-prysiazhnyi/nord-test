import { http, HttpResponse } from 'msw'

import { TOKEN_URL, SERVERS_URL } from '../constants'
import { mockToken, mockUserPassword, mockUsername } from './mockTestsData'
import mockServers from '../mocks/mockServers.json'

interface LoginRequestBody {
  token: string
}

interface LoginResponseBody {
  username: string
  password: string
}

export const handlers = [
  http.post<LoginRequestBody, LoginResponseBody>(
    TOKEN_URL,
    async ({ request }) => {
      const { username, password } = await request.json()

      if (username === mockUsername && password === mockUserPassword) {
        return HttpResponse.json({ token: mockToken })
      } else {
        return new HttpResponse(null, { status: 401 })
      }
    },
  ),
  http.get(SERVERS_URL, async () => {
    return HttpResponse.json(mockServers)
  }),
]
