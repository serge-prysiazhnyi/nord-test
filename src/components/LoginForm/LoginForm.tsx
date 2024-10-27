import React, { useState } from 'react'

import LoadingIndicator from '../LoadingIndicator/LoadingIndicator'
import { UserCredentials } from '../../types'

export interface LoginFormProps {
  handleSubmit: (credentials: UserCredentials) => void
  error: string | null
  isLoading: boolean
}

const LoginForm: React.FC<LoginFormProps> = ({
  handleSubmit,
  error,
  isLoading,
}) => {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const canSubmit = username && password && !isLoading

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!canSubmit) {
      return
    }

    handleSubmit({ username, password })
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        value={username}
        id="username"
        type="text"
        placeholder="enter username"
        onChange={(e) => setUserName(e.target.value.trim())}
        disabled={isLoading}
      />
      <input
        value={password}
        id="password"
        type="password"
        placeholder="enter password"
        onChange={(e) => setPassword(e.target.value.trim())}
        disabled={isLoading}
      />
      <button type="submit" disabled={!canSubmit}>
        {isLoading ? <LoadingIndicator /> : 'Login'}
      </button>
      {error && <div role="alert">{error}</div>}
    </form>
  )
}

export default LoginForm
