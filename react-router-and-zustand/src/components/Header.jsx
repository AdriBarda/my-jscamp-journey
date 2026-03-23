import { NavLink, useNavigate } from 'react-router'
import styles from './Header.module.css'
import { useAuthStore } from '../store/auth'
import { useFavoriteStore } from '../store/favoritesStore'

function SigninButton() {
  const { isLoggedIn, signIn, signOut } = useAuthStore()
  const { clearFavorites } = useFavoriteStore()
  const navigate = useNavigate()

  const handleSignOut = () => {
    signOut()
    clearFavorites()
    navigate('/login')
  }

  return isLoggedIn ? (
    <button onClick={handleSignOut}>Sign Out</button>
  ) : (
    <button onClick={signIn}>Sign In</button>
  )
}

export function Header() {
  const { isLoggedIn } = useAuthStore()
  const { countFavorites } = useFavoriteStore()

  const favoritesNumber = countFavorites()
  return (
    <header className={styles.header}>
      <NavLink to="/" className={styles.brand}>
        <h1 className={styles.title}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            className={`${styles.icon} icon icon-tabler icons-tabler-outline icon-tabler-device-imac-code`}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path fill="none" stroke="none" d="M0 0h24v24H0z" />
            <path d="M11.5 17H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v9M3 13h18M8 21h3.5M10 17l-.5 4M20 21l2-2-2-2m-3 0-2 2 2 2" />
          </svg>
          MyDevJobs
        </h1>
      </NavLink>
      <nav className={styles.nav}>
        <NavLink className={({ isActive }) => (isActive ? styles.linkIsActive : '')} to="/search">
          Job Offers
        </NavLink>
        {isLoggedIn && (
          <NavLink
            className={({ isActive }) => (isActive ? styles.linkIsActive : '')}
            to="/profile"
          >
            Profile ❤️{favoritesNumber}
          </NavLink>
        )}
        <NavLink className={({ isActive }) => (isActive ? styles.linkIsActive : '')} to="/contact">
          Contact
        </NavLink>
      </nav>
      <div className={styles.actions}>
        <SigninButton />
      </div>
    </header>
  )
}
