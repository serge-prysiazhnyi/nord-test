import { render } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import * as storage from '../../utils/storage'

describe('ProtectedRoute', () => {
  const ProtectedContent = () => <div>Protected Content</div> // Mock protected content

  const renderComponent = () =>
    render(
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
    )

  afterEach(() => {
    vi.clearAllMocks()
  })

  test('renders children when authenticated', () => {
    vi.spyOn(storage, 'getToken').mockReturnValue('valid-token')

    const { getByText } = renderComponent()

    expect(getByText('Protected Content')).toBeInTheDocument()
  })

  test('redirects to login when not authenticated', () => {
    vi.spyOn(storage, 'getToken').mockReturnValue(null)

    const { getByText } = renderComponent()

    expect(getByText('Login Page')).toBeInTheDocument()
  })
})
