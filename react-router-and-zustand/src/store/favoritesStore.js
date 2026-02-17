import { create } from 'zustand'

export const useFavoriteStore = create((set, get, store) => ({
  favorites: [],

  clearFavorites: () => {
    set(store.getInitialState())
  },

  addFavourite: (jobId) => {
    set((state) => ({
      favorites: state.favorites.includes(jobId) ? state.favorites : [...state.favorites, jobId]
    }))
  },

  removeFavourite: (jobId) => {
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== jobId)
    }))
  },

  isFavourite: (jobId) => {
    return get().favorites.includes(jobId)
  },

  toggleFavourite: (jobId) => {
    const { addFavourite, removeFavourite, isFavourite } = get()
    const isFav = isFavourite(jobId)
    isFav ? removeFavourite(jobId) : addFavourite(jobId)
  },

  countFavorites: () => get().favorites.length
}))
