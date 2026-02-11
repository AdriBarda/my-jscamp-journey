import { useRouter } from '../hooks/useRouter'
import styles from './Link.module.css'

export function Link({ href, children, ...otherProps }) {
  const { currentPath, navigateTo } = useRouter()

  const isCurrentPath = () => {
    if (currentPath !== '/') {
      return currentPath.toLowerCase() === href.toLowerCase()
    } else {
      return false
    }
  }

  const handleClick = (event) => {
    event.preventDefault()
    navigateTo(href)
  }

  return (
    <a
      href={href}
      {...otherProps}
      onClick={handleClick}
      className={isCurrentPath() ? styles.isActive : ''}
    >
      {children}
    </a>
  )
}
