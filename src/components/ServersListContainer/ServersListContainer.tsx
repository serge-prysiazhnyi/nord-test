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
import Button from '../Button/Button'
import ErrorMessage from '../ErrorMessage/ErrorMessage'

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
      {isLoading ? (
        <div className="flex justify-center items-center my-2">
          <LoadingIndicator />
        </div>
      ) : (
        <ServersList servers={servers} />
      )}
      {error && <ErrorMessage message={error} />}
      <div className="flex justify-center items-center">
        <Button
          role="button"
          onClick={handleRefreshServers}
          disabled={isLoading}
          className="mt-3 mb-3"
        >
          Refresh
        </Button>
      </div>
    </>
  )
}

export default ServersListContainer
