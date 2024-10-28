import { configureStore, combineReducers } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import serversReducer from './servers/serversSlice'

export const rootReducer = combineReducers({
  auth: authReducer,
  servers: serversReducer,
})

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  })
}

export const store = setupStore()

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
