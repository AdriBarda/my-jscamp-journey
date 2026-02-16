import { useAuthStore } from '../../store/auth'
import { useFavoriteStore } from '../../store/favoritesStore'

export function AddToFavoritesButton({ jobId }) {
  const { toggleFavourite, isFavourite } = useFavoriteStore()
  const { isLoggedIn } = useAuthStore()
  return (
    <button disabled={!isLoggedIn} onClick={() => toggleFavourite(jobId)}>
      {isFavourite(jobId) ? '❤️' : '🩶'}
    </button>
  )
}
