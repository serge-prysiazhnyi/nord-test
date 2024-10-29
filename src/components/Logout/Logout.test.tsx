import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Logout from './Logout'
import renderWithStoreProvider, {
  PreloadedState,
  mockAuthInitialState,
} from '../../mocks/renderWithStoreProvider'
import { logoutUser } from '../../store/auth/authSlice'
import { mockToken } from '../../mocks/mockTestsData'

interface RenderWithProviderOptions {
  preloadedState?: PreloadedState
}

describe('Logout Component', () => {
  const renderComponent = ({
    preloadedState,
  }: RenderWithProviderOptions = {}) => {
    const { store } = renderWithStoreProvider(<Logout />, {
      preloadedState,
    })

    const user = userEvent.setup()

    const logoutButton = screen.getByRole('button', { name: /logout/i })

    return {
      store,
      user,
      logoutButton,
    }
  }

  test('should render Logout button', () => {
    const { logoutButton } = renderComponent({
      preloadedState: {
        auth: {
          ...mockAuthInitialState,
          token: mockToken,
          isAuthenticated: true,
        },
      },
    })

    expect(logoutButton).toBeInTheDocument()
  })

  test('should dispatch logoutUser action on logout button click', async () => {
    const { logoutButton, user, store } = renderComponent({
      preloadedState: {
        auth: {
          ...mockAuthInitialState,
          token: mockToken,
          isAuthenticated: true,
        },
      },
    })

    await user.click(logoutButton)
    await store.dispatch(logoutUser())

    expect(store.getState().auth.token).toBeNull()
    expect(store.getState().auth.isAuthenticated).toBe(false)
  })
})
