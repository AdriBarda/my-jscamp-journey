import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

/*
    By wrapping it in a custom hook we can simplify the usage and
    enhance it with some extra validation. 
*/
export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider!')
  }

  return context
}
