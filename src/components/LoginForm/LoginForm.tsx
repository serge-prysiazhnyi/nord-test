import React, { useState } from 'react'

import ErrorMessage from '../ErrorMessage/ErrorMessage'
import Button from '../Button/Button'
import Input from '../Input/Input'
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
    <form onSubmit={onSubmit} className="flex flex-col max-w-80 w-full">
      <Input
        value={username}
        id="username"
        type="text"
        placeholder="enter username"
        onChange={(e) => setUserName(e.target.value.trim())}
        disabled={isLoading}
        required
      />
      <Input
        value={password}
        id="password"
        type="password"
        placeholder="enter password"
        onChange={(e) => setPassword(e.target.value.trim())}
        disabled={isLoading}
        required
      />
      <Button type="submit" disabled={!canSubmit}>
        {isLoading ? <div role="progressbar">Loading...</div> : 'Login'}
      </Button>
      {error && <ErrorMessage message={error} />}
    </form>
  )
}

export default LoginForm
