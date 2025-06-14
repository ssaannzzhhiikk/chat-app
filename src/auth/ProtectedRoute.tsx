import React from 'react'
import { Navigate } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'

export default function ProtectedRoute({ children }: { children: React.ReactElement }) {
  const context = useUser()

  if (!context) {
    return <p>Загрузка контекста...</p>
  }

  const { user, loading } = context

  if (loading) return <p>Загрузка...</p>
  if (!user) return <Navigate to="/login" replace />
  return children
}


// Has to be improved