import { Link as NavLink, useLocation } from 'react-router'
import styles from './Link.module.css'

export function Link({ href, children, ...otherProps }) {
  const location = useLocation()

  const isCurrentPath = () => {
    if (location.pathname !== '/') {
      return location.pathname.toLowerCase() === href.toLowerCase()
    } else {
      return false
    }
  }

  const combinedClassName = [otherProps.className, isCurrentPath() ? styles.isActive : '']
    .filter(Boolean)
    .join(' ')

  return (
    <NavLink to={href} {...otherProps} className={combinedClassName}>
      {children}
    </NavLink>
  )
}
