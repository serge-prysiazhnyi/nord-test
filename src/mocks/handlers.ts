import { http, HttpResponse } from 'msw'

import { TOKEN_URL } from '../constants'
import { mockToken, mockUserPassword, mockUsername } from './mockTestsData'

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
]
