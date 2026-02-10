export function Link({ href, children, ...otherProps }) {
  const handleClick = (event) => {
    event.preventDefault()
    window.history.pushState({}, '', href)

    const navigationEvent = new PopStateEvent('popstate')
    window.dispatchEvent(navigationEvent)
  }

  return (
    <a href={href} {...otherProps} onClick={handleClick}>
      {children}
    </a>
  )
}
