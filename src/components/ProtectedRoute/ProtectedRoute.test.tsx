import { screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

import ProtectedRoute from './ProtectedRoute'
import renderWithStoreProvider, {
  PreloadedState,
  mockAuthInitialState,
} from '../../utils/tests/renderWithStoreProvider'

describe('ProtectedRoute', () => {
  const ProtectedContent = () => <div>Protected Content</div>

  const renderComponent = (preloadedState?: PreloadedState) => {
    const { store } = renderWithStoreProvider(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <ProtectedContent />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>,
      { preloadedState },
    )

    return {
      store,
    }
  }

  afterEach(() => {
    vi.clearAllMocks()
  })

  test('renders children when authenticated', () => {
    renderComponent({
      auth: {
        ...mockAuthInitialState,
        token: 'valid-token',
        isAuthenticated: true,
      },
    })

    expect(screen.getByText('Protected Content')).toBeInTheDocument()
  })

  test('redirects to login when not authenticated', () => {
    renderComponent({
      auth: { ...mockAuthInitialState, token: null, isAuthenticated: false },
    })

    expect(screen.getByText('Login Page')).toBeInTheDocument()
  })
})
