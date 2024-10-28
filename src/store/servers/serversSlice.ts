import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

import { ServerData } from '../../types'
import { fetchData } from '../../services/api'
import { SERVERS_URL } from '../../constants'
import { RootState } from '../store'

export interface ServersState {
  servers: ServerData[]
  isLoading: boolean
  error: string | null
}

export const serversInitialState: ServersState = {
  servers: [],
  isLoading: false,
  error: null,
}

export const fetchServers = createAsyncThunk(
  'servers/fetchServers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchData<ServerData[]>(SERVERS_URL, {
        method: 'get',
      })

      return response
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Login failed',
      )
    }
  },
)

const serversSlice = createSlice({
  name: 'servers',
  initialState: serversInitialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServers.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(
        fetchServers.fulfilled,
        (state, action: PayloadAction<ServerData[]>) => {
          state.isLoading = false
          state.servers = action.payload
        },
      )
      .addCase(fetchServers.rejected, (state, action) => {
        state.isLoading = false
        state.servers = []
        state.error = action.payload as string
      })
  },
})

export const { clearError } = serversSlice.actions

export const selectServers = (state: RootState) => state.servers.servers
export const selectIsLoading = (state: RootState) => state.servers.isLoading
export const selectError = (state: RootState) => state.servers.error

export default serversSlice.reducer
