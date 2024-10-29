import React from 'react'

import Button from '../Button/Button'
import { useAppDispatch } from '../../store/hooks'
import { logoutUser } from '../../store/auth/authSlice'

const Logout: React.FC = () => {
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <div>
      <Button onClick={handleLogout} type="button">
        Logout
      </Button>
    </div>
  )
}

export default Logout
