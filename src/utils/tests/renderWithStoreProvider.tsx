import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'

import { AppStore, RootState } from '../../store/store'

import authReducer, { AuthState } from '../../store/auth/authSlice'
import serversReducer from '../../store/servers/serversSlice'

export type PreloadedState = Partial<RootState>

export const mockAuthInitialState: AuthState = {
  token: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
}

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState
  store?: AppStore
}

function renderWithStoreProvider(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = configureStore({
      reducer: combineReducers({ auth: authReducer, servers: serversReducer }),
      preloadedState,
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: PropsWithChildren<object>): JSX.Element {
    return <Provider store={store}>{children}</Provider>
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

export default renderWithStoreProvider
