import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  // State
  isLoggedIn: false,

  // Actions
  signIn: () => set({ isLoggedIn: true }),
  signOut: () => set({ isLoggedIn: false })
}))
