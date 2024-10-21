import { render, screen } from '@testing-library/react'

import App from './App'

describe('App', () => {
  test('should render App component', () => {
    render(<App />)

    expect(screen.getByText(/app/i)).toBeInTheDocument()
  })
})
