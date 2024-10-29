import React, { useEffect, useCallback } from 'react'

import {
  selectError,
  selectIsLoading,
  loginUser,
  clearError,
} from '../../store/auth/authSlice'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { UserCredentials } from '../../types'
import LoginForm from '../LoginForm/LoginForm'

const LoginFormContainer: React.FC = () => {
  const dispatch = useAppDispatch()
  const error = useAppSelector(selectError)
  const isLoading = useAppSelector(selectIsLoading)

  const handleSubmit = useCallback(
    (credentials: UserCredentials) => {
      dispatch(loginUser(credentials))
    },
    [dispatch],
  )

  useEffect(
    () => () => {
      dispatch(clearError())
    },
    [dispatch],
  )

  return (
    <LoginForm
      handleSubmit={handleSubmit}
      error={error}
      isLoading={isLoading}
    />
  )
}

export default LoginFormContainer
