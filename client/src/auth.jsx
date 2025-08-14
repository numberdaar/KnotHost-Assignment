// Simple authentication context using React state and localStorage
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    // Load token on first mount to keep user logged in after refresh
    const stored = localStorage.getItem('token')
    if (stored) setToken(stored)
    setIsHydrated(true)
  }, [])

  const value = useMemo(() => ({
    token,
    isAuthenticated: !!token,
    isHydrated,
    login: (newToken) => {
      // Persist token and update state
      localStorage.setItem('token', newToken)
      setToken(newToken)
    },
    logout: () => {
      // Clear token and auth state
      localStorage.removeItem('token')
      setToken(null)
    },
  }), [token, isHydrated])

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}


