import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('token')
    if (stored) setToken(stored)
  }, [])

  const value = useMemo(() => ({
    token,
    isAuthenticated: !!token,
    login: (newToken) => {
      localStorage.setItem('token', newToken)
      setToken(newToken)
    },
    logout: () => {
      localStorage.removeItem('token')
      setToken(null)
    },
  }), [token])

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}


