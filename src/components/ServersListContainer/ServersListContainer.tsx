import React, { useEffect } from 'react'

import { useAppSelector, useAppDispatch } from '../../store/hooks'
import {
  fetchServers,
  selectServers,
  selectError,
  selectIsLoading,
  clearError,
} from '../../store/servers/serversSlice'
import ServersList from '../ServersList/ServersList'
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator'

const ServersListContainer: React.FC = () => {
  const dispatch = useAppDispatch()
  const servers = useAppSelector(selectServers)
  const error = useAppSelector(selectError)
  const isLoading = useAppSelector(selectIsLoading)

  const handleRefreshServers = () => {
    dispatch(fetchServers())
  }

  useEffect(() => {
    dispatch(fetchServers())

    return () => {
      dispatch(clearError())
    }
  }, [dispatch])

  return (
    <>
      <button role="button" onClick={handleRefreshServers} disabled={isLoading}>
        Refresh
      </button>
      {isLoading ? <LoadingIndicator /> : <ServersList servers={servers} />}
      {error && <div role="alert">{error}</div>}
    </>
  )
}

export default ServersListContainer
