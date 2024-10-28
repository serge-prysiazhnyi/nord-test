import React from 'react'

import { useAppDispatch } from '../../store/hooks'
import { logoutUser } from '../../store/auth/authSlice'

const Logout: React.FC = () => {
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <div>
      <button onClick={handleLogout} type="button">
        Logout
      </button>
    </div>
  )
}

export default Logout
