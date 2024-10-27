import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import { useAppSelector } from '../src/store/hooks'
import { selectIsAuthenticated } from '../src/store/auth/authSlice'
import ProtectedRoute from '../src/components/ProtectedRoute/ProtectedRoute'
import Index from './pages/Index'
import Login from './pages/Login'
import Notfound from './pages/Notfound'

const App: React.FC = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" /> : <Login />}
      />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Index />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Notfound />} />
    </Routes>
  )
}

export default App
