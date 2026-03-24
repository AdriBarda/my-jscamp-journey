import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  // State
  isLoggedIn: false,

  // Mock Actions
  signIn: () => set({ isLoggedIn: true }),
  signOut: () => set({ isLoggedIn: false }),
  signUp: () => set({ isLoggedIn: true })
}))
