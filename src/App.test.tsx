import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import App from './App'
import * as storage from '../src/utils/storage'

describe('App', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  const renderComponent = (initialRoute: string = '/') => {
    render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <App />
      </MemoryRouter>,
    )
  }

  test('should redirect to login page when there is no auth token', () => {
    vi.spyOn(storage, 'getToken').mockReturnValue(null)
    renderComponent()

    expect(screen.getByText(/login/i)).toBeInTheDocument()
  })

  test('should render index page when auth token exists', () => {
    vi.spyOn(storage, 'getToken').mockReturnValue('fake-token')
    renderComponent()

    expect(screen.getByText(/hello/i)).toBeInTheDocument()
  })

  test('should redirect from /login to index page when auth token exists', () => {
    vi.spyOn(storage, 'getToken').mockReturnValue('fake-token')
    renderComponent('/login')

    expect(screen.getByText(/hello/i)).toBeInTheDocument()
  })

  test('should render 404 page if the route does not exist', () => {
    vi.spyOn(storage, 'getToken').mockReturnValue('fake-token')
    renderComponent('/non-existent-page')

    expect(screen.getByText(/not found/i)).toBeInTheDocument()
  })
})
