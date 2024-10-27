import { render } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import authReducer, { AuthState } from '../../store/auth/authSlice'

const createTestStore = (preloadedState?: { auth: Partial<AuthState> }) => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: {
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        ...preloadedState?.auth,
      },
    },
  })
}

interface RenderWithStoreProviderOptions {
  preloadedState?: { auth: Partial<AuthState> }
}

const renderWithStoreProvider = (
  ui: React.ReactElement,
  { preloadedState }: RenderWithStoreProviderOptions = {},
) => {
  const store = createTestStore(preloadedState)
  return {
    store,
    ...render(<Provider store={store}>{ui}</Provider>),
  }
}

export default renderWithStoreProvider
