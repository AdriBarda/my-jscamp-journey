import { useRouter } from '../hooks/useRouter'

export function Link({ href, children, ...otherProps }) {
  const { navigateTo } = useRouter()

  const handleClick = (event) => {
    event.preventDefault()
    navigateTo(href)
  }

  return (
    <a href={href} {...otherProps} onClick={handleClick}>
      {children}
    </a>
  )
}
