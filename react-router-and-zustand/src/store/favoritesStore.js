import { create } from 'zustand'

export const useFavoriteStore = create((set, get) => ({
  favorites: [],

  addFavorite: (jobId) => {
    set((state) => ({
      favorites: state.favorites.includes(jobId) ? state.favorites : [...state.favorites, jobId]
    }))
  },

  removeFavorite: (jobId) => {
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== jobId)
    }))
  },

  isFavourite: (jobId) => {
    return get().favorites.includes(jobId)
  },

  toggleFavourite: (jobId) => {
    const { addFavorite, removeFavorite, isFavourite } = get()
    const isFav = isFavourite(jobId)
    isFav ? removeFavorite(jobId) : addFavorite(jobId)
  },

  countFavorites: () => get().favorites.length
}))
