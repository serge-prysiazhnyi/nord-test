import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'

import LoginFormContainer from './LoginFormContainer'
import renderWithStoreProvider from '../../utils/tests/renderWithStoreProvider'
import { server } from '../../mocks/server'
import { mockJsonResponse, simulateError } from '../../mocks/utils'
import {
  mockUserPassword,
  mockUsername,
  mockToken,
} from '../../mocks/mockTestsData'
import { TOKEN_URL } from '../../constants'
import { AuthState } from '../../store/auth/authSlice'

interface RenderWithProviderOptions {
  preloadedState?: { auth: Partial<AuthState> }
}

const renderComponent = ({
  preloadedState,
}: RenderWithProviderOptions = {}) => {
  const { store } = renderWithStoreProvider(<LoginFormContainer />, {
    preloadedState,
  })

  const user = userEvent.setup()

  const fillForm = async () => {
    const emailInput = screen.getByPlaceholderText(/username/i)
    const passwordInput = screen.getByPlaceholderText(/password/i)
    const submitButton = screen.getByRole('button', { name: /login/i })

    await user.type(emailInput, mockUsername)
    await user.type(passwordInput, mockUserPassword)
    await user.click(submitButton)
  }

  return {
    store,
    user,
    fillForm,
  }
}

describe('LoginFormContainer', () => {
  beforeAll(() => {
    server.listen()
  })

  afterEach(() => {
    server.resetHandlers()
  })

  afterAll(() => {
    server.close()
    vi.resetAllMocks()
  })

  test('updates Redux state on successful login', async () => {
    const { store, fillForm } = renderComponent()

    await fillForm()

    await waitFor(() => {
      const state = store.getState().auth
      expect(state.isAuthenticated).toBe(true)
      expect(state.token).toBe(mockToken)
      expect(state.error).toBeNull()
    })
  })

  test('handles loading state in Redux during API call', async () => {
    mockJsonResponse('post', TOKEN_URL, { token: mockToken }, 500)
    const { store, fillForm } = renderComponent()

    await fillForm()
    expect(store.getState().auth.isLoading).toBe(true)

    await waitFor(() => {
      expect(store.getState().auth.isLoading).toBe(false)
    })
  })

  test('handles API error in Redux state', async () => {
    simulateError('post', TOKEN_URL)
    const { store, fillForm } = renderComponent()

    await fillForm()

    await waitFor(() => {
      const state = store.getState().auth
      expect(state.error).not.toBeNull()
      expect(state.isAuthenticated).toBe(false)
      expect(state.token).toBeNull()
    })
  })

  test('clears error on retry after failed attempt', async () => {
    simulateError('post', TOKEN_URL)
    const { store, fillForm } = renderComponent()

    await fillForm()
    expect(store.getState().auth.error).not.toBeNull()

    server.use(
      http.post(TOKEN_URL, () => {
        return HttpResponse.json({ token: mockToken })
      }),
    )

    await fillForm()

    await waitFor(() => {
      const state = store.getState().auth
      expect(state.error).toBeNull()
      expect(state.isAuthenticated).toBe(true)
      expect(state.token).toBe(mockToken)
    })
  })

  test('preserves existing auth state when mounted', () => {
    const preloadedState = {
      auth: {
        isAuthenticated: true,
        token: mockToken,
      },
    }

    const { store } = renderComponent({ preloadedState })

    const state = store.getState().auth
    expect(state.isAuthenticated).toBe(true)
    expect(state.token).toBe(mockToken)
  })

  test('dispatches login action with correct credentials', async () => {
    const { store, fillForm } = renderComponent()
    const dispatchSpy = vi.spyOn(store, 'dispatch')

    await fillForm()

    waitFor(() => {
      expect(dispatchSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'auth/login/pending',
          meta: expect.objectContaining({
            arg: {
              email: mockUsername,
              password: mockUserPassword,
            },
          }),
        }),
      )
    })
  })
})
