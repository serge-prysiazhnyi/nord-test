import React from 'react'
import { Navigate } from 'react-router-dom'

import { useAppSelector } from '../../store/hooks'
import { selectIsAuthenticated } from '../../store/auth/authSlice'

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  return isAuthenticated ? children : <Navigate to="/login" />
}

export default ProtectedRoute
