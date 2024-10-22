import React from 'react'
import { Navigate } from 'react-router-dom'
import { getToken } from '../../utils/storage'

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const token = getToken()

  return token ? children : <Navigate to="/login" />
}

export default ProtectedRoute
