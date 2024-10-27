import { render, screen } from '@testing-library/react'
import UserEvent from '@testing-library/user-event'

import LoginForm, { LoginFormProps } from './LoginForm'
import { mockUserPassword, mockUsername } from '../../mocks/mockTestsData'

describe('LoginForm', () => {
  beforeAll(() => {})

  afterEach(() => {
    vi.resetAllMocks()
  })

  afterAll(() => {})

  const mockHandleSubmit = vi.fn()

  const renderComponent = (
    { isLoading, error }: Omit<LoginFormProps, 'handleSubmit'> = {
      isLoading: false,
      error: null,
    },
  ) => {
    render(
      <LoginForm
        handleSubmit={mockHandleSubmit}
        isLoading={isLoading}
        error={error}
      />,
    )

    const user = UserEvent.setup()
    const usernameInput = screen.getByPlaceholderText(/username/i)
    const passwordInput = screen.getByPlaceholderText(/password/i)
    const submitButton = screen.getByRole('button')
    const errorMessage = screen.queryByRole('alert')
    const loader = screen.queryByRole('progressbar')
    const getUsernameInput = () => screen.findByPlaceholderText(/username/i)
    const getPasswordInput = () => screen.findByPlaceholderText(/password/i)
    const getSubmitButton = () => screen.findByRole('button')

    const fillForm = async () => {
      await user.type(usernameInput, mockUsername)
      await user.type(passwordInput, mockUserPassword)
      await user.click(submitButton)
    }

    return {
      user,
      usernameInput,
      passwordInput,
      submitButton,
      errorMessage,
      loader,
      getUsernameInput,
      getPasswordInput,
      getSubmitButton,
      fillForm,
    }
  }

  test('should render initial form state', () => {
    const { usernameInput, passwordInput, submitButton, errorMessage } =
      renderComponent()

    expect(usernameInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
    expect(submitButton).toBeDisabled()
    expect(submitButton).toHaveTextContent(/login/i)
    expect(errorMessage).toBeNull()
  })

  test('should enable submit button when username and password are filled', async () => {
    const { user, usernameInput, passwordInput, submitButton } =
      renderComponent()

    expect(submitButton).toBeDisabled()

    await user.type(usernameInput, mockUsername)
    await user.type(passwordInput, mockUserPassword)

    expect(submitButton).toBeEnabled()
  })

  test('shows display loading state correctly', () => {
    const { loader, submitButton } = renderComponent({
      isLoading: true,
      error: null,
    })

    expect(loader).toBeInTheDocument()
    expect(submitButton).toBeDisabled()
    expect(submitButton).toHaveTextContent(/loading/i)
  })

  test('should call handleSubmit with user credentials on submit button click', async () => {
    const { fillForm } = renderComponent()

    await fillForm()

    expect(mockHandleSubmit).toBeCalledTimes(1)
    expect(mockHandleSubmit).toBeCalledWith({
      username: mockUsername,
      password: mockUserPassword,
    })
  })

  test('should trim whitespace from inputs and call handleSubmit with correct user credentials', async () => {
    const { user, usernameInput, passwordInput, submitButton } =
      renderComponent()

    await user.type(usernameInput, `  ${mockUsername}   `)
    await user.type(passwordInput, `${mockUserPassword}   `)
    await user.click(submitButton)

    expect(mockHandleSubmit).toBeCalledWith({
      username: mockUsername,
      password: mockUserPassword,
    })
  })

  test('should maintain focus management', async () => {
    const { user, getUsernameInput, getPasswordInput, getSubmitButton } =
      renderComponent()

    user.tab()
    const userInput = await getUsernameInput()
    expect(userInput).toHaveFocus()
    await user.type(userInput, `${mockUsername}`)

    user.tab()
    const passwordInput = await getPasswordInput()
    expect(passwordInput).toHaveFocus()
    await user.type(passwordInput, `${mockUserPassword}`)

    user.tab()
    const button = await getSubmitButton()
    expect(button).toHaveFocus()
  })

  test('should submit on Enter key press', async () => {
    const { user, usernameInput, passwordInput } = renderComponent()

    await user.type(usernameInput, mockUsername)
    await user.type(passwordInput, `${mockUserPassword}{Enter}`)

    expect(mockHandleSubmit).toBeCalledTimes(1)
    expect(mockHandleSubmit).toBeCalledWith({
      username: mockUsername,
      password: mockUserPassword,
    })
  })

  test('should display error message', async () => {
    renderComponent({ isLoading: false, error: 'Request failed' })

    expect(screen.getByRole('alert')).toHaveTextContent(/failed/i)
  })
})
