import { useEffect, useState } from 'react'

export function useRouter() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname)
    }

    window.addEventListener('popstate', handleLocationChange)

    return () => {
      window.removeEventListener('popstate', handleLocationChange)
    }
  }, [])

  function navigateTo(path) {
    window.history.pushState({}, '', path)
    const navigationEvent = new PopStateEvent('popstate')
    window.dispatchEvent(navigationEvent)
  }

  return {
    currentPath,
    navigateTo
  }
}
