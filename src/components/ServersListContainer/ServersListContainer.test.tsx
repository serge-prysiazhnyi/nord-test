import { screen, waitForElementToBeRemoved } from '@testing-library/react'
import UserEvent from '@testing-library/user-event'

import { server } from '../../mocks/server'
import renderWithStoreProvider, {
  PreloadedState,
} from '../../utils/tests/renderWithStoreProvider'
import { SERVERS_URL } from '../../constants'
import { simulateError, mockJsonResponse } from '../../mocks/utils'

import mockServers from '../../mocks/mockServers.json'

import ServersListContainer from './ServersListContainer'

interface RenderWithProviderOptions {
  preloadedState?: PreloadedState
}

describe('ServersListContainer', () => {
  beforeAll(() => {
    server.listen()
  })

  afterEach(() => {
    server.resetHandlers()
  })

  afterAll(() => {
    server.close()
  })

  const renderComponent = ({
    preloadedState,
  }: RenderWithProviderOptions = {}) => {
    const { store } = renderWithStoreProvider(<ServersListContainer />, {
      preloadedState,
    })

    const getLoadingIndicator = () => screen.getByRole('progressbar')
    const getErrorMessage = async () => await screen.findByRole('alert')
    const checkServersListItems = () => {
      mockServers.forEach((server) => {
        expect(screen.getByText(server.name)).toBeInTheDocument()
        expect(screen.getByText(`${server.distance}`)).toBeInTheDocument()
      })
    }

    const refreshButton = screen.getByRole('button', { name: /refresh/i })

    return {
      store,
      getErrorMessage,
      checkServersListItems,
      getLoadingIndicator,
      refreshButton,
    }
  }

  test('should display loading indicator on fetch of servers list', () => {
    const { getLoadingIndicator } = renderComponent()

    expect(getLoadingIndicator()).toBeInTheDocument()
  })

  test('should render list of servers', async () => {
    const { checkServersListItems, getLoadingIndicator } = renderComponent()

    await waitForElementToBeRemoved(getLoadingIndicator())

    checkServersListItems()
  })

  test('should render error message on fetch error', async () => {
    simulateError('get', SERVERS_URL)
    const { getErrorMessage, getLoadingIndicator } = renderComponent()
    await waitForElementToBeRemoved(getLoadingIndicator())
    const errorMessage = await getErrorMessage()

    expect(errorMessage).toBeInTheDocument()
    expect(errorMessage).toHaveTextContent(/Failed to fetch/i)
  })

  test('should fetch servers list on click on refersh button and remove error message', async () => {
    simulateError('get', SERVERS_URL)
    const {
      getErrorMessage,
      checkServersListItems,
      getLoadingIndicator,
      refreshButton,
    } = renderComponent()
    const user = UserEvent.setup()
    await waitForElementToBeRemoved(getLoadingIndicator())
    const errorMessage = await getErrorMessage()

    expect(errorMessage).toBeInTheDocument()

    mockJsonResponse('get', SERVERS_URL, mockServers, 500)
    await user.click(refreshButton)

    expect(refreshButton).toBeDisabled()

    await waitForElementToBeRemoved(getLoadingIndicator())

    expect(refreshButton).toBeEnabled()
    expect(errorMessage).not.toBeInTheDocument()
    checkServersListItems()
  })
})
