import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import ProtectedRoute from '../src/components/ProtectedRoute/ProtectedRoute'
import Index from './pages/Index'
import Login from './pages/Login'
import Notfound from './pages/Notfound'
import { getToken } from '../src/utils/storage'

const App: React.FC = () => {
  const isAuthenticated = Boolean(getToken())

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
