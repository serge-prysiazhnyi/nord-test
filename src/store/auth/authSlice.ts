import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import {
  getTokenFromLocalStorage,
  setTokenInLocalStorage,
  removeTokenFromLocalStorage,
} from '../../utils/localStorage'
import { fetchData } from '../../services/api'
import { TOKEN_URL } from '../../constants'
import { APITokenResponse } from '../../types'

export interface AuthState {
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export const authInitialState: AuthState = {
  token: getTokenFromLocalStorage(),
  isAuthenticated: Boolean(getTokenFromLocalStorage()),
  isLoading: false,
  error: null,
}

export const loginUser = createAsyncThunk(
  'auth/login',
  async (
    credentials: { username: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetchData<APITokenResponse>(TOKEN_URL, {
        method: 'post',
        body: JSON.stringify(credentials),
        headers: { 'Content-Type': 'application/json' },
      })

      setTokenInLocalStorage(response.token)
      return response.token
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Login failed',
      )
    }
  },
)

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      // ToDo: Call logout endpoint if needed
      removeTokenFromLocalStorage()
      return null
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Logout failed',
      )
    }
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false
        state.isAuthenticated = true
        state.token = action.payload
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = false
        state.token = null
        state.error = action.payload as string
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false
        state.token = null
        state.error = null
      })
  },
})

export const { clearError, setError } = authSlice.actions

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated
export const selectIsLoading = (state: RootState) => state.auth.isLoading
export const selectError = (state: RootState) => state.auth.error

export default authSlice.reducer
