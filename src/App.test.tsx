import { screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

import App from './App'
import renderWithStoreProvider, {
  PreloadedState,
  mockAuthInitialState,
} from './utils/tests/renderWithStoreProvider'
import { mockToken } from '../src/mocks/mockTestsData'

describe('App', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  const renderComponent = (
    initialRoute: string = '/',
    preloadedState?: PreloadedState,
  ) => {
    const { store } = renderWithStoreProvider(
      <MemoryRouter initialEntries={[initialRoute]}>
        <App />
      </MemoryRouter>,
      { preloadedState },
    )

    return {
      store,
    }
  }

  test('should redirect to login page when there is no auth token', () => {
    renderComponent('/', {
      auth: mockAuthInitialState,
    })

    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument()
  })

  test('should render index page when auth token exists', () => {
    renderComponent('/', {
      auth: {
        ...mockAuthInitialState,
        token: mockToken,
        isAuthenticated: true,
      },
    })

    expect(
      screen.getByRole('heading', { name: /servers/i }),
    ).toBeInTheDocument()
  })

  test('should redirect from /login to index page when auth token exists', () => {
    renderComponent('/login', {
      auth: {
        ...mockAuthInitialState,
        token: mockToken,
        isAuthenticated: true,
      },
    })

    expect(
      screen.getByRole('heading', { name: /servers/i }),
    ).toBeInTheDocument()
  })

  test('should redirect to /login after logout', async () => {
    renderComponent('/login', {
      auth: {
        ...mockAuthInitialState,
        token: mockToken,
        isAuthenticated: true,
      },
    })

    const user = userEvent.setup()
    const logout = screen.getByRole('button', { name: /logout/i })

    await user.click(logout)

    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument()
  })

  test('should render 404 page if the route does not exist', () => {
    renderComponent('/non-existent-page')

    expect(screen.getByText(/not found/i)).toBeInTheDocument()
  })

  test('should render 404 page and go back to previous page on "Go Back" button click', async () => {
    renderComponent('/', {
      auth: {
        ...mockAuthInitialState,
        token: mockToken,
        isAuthenticated: true,
      },
    })

    const user = userEvent.setup()

    renderComponent('/non-existent-page')
    expect(screen.getByText(/404: Page Not Found/i)).toBeInTheDocument()

    const goBackButton = screen.getByRole('button', { name: /go back/i })
    expect(goBackButton).toBeInTheDocument()

    await user.click(goBackButton)
    expect(
      screen.getByRole('heading', { name: /servers/i }),
    ).toBeInTheDocument()
  })
})
