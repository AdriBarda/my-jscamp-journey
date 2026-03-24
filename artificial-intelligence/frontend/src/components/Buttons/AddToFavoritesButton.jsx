import { useAuthStore } from '../../store/auth'
import { useFavoriteStore } from '../../store/favoritesStore'
import styles from './AddToFavoritesButton.module.css'

export function AddToFavoritesButton({ jobId }) {
  const { toggleFavourite, isFavourite } = useFavoriteStore()
  const { isLoggedIn } = useAuthStore()
  return (
    <button
      className={styles.favoriteButton}
      disabled={!isLoggedIn}
      onClick={() => toggleFavourite(jobId)}
    >
      {isFavourite(jobId) ? '❤️' : '🩶'}
    </button>
  )
}
