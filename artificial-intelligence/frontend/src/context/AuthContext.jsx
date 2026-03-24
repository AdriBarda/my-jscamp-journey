import { createContext, useState } from 'react'

// Consumer
export const AuthContext = createContext()

// Provider
export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const signIn = () => {
    setIsLoggedIn(true)
  }

  const signOut = () => {
    setIsLoggedIn(false)
  }

  const value = {
    isLoggedIn,
    signIn,
    signOut
  }

  return <AuthContext value={value}>{children}</AuthContext>
}
