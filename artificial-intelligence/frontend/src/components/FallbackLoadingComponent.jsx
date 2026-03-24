import { useEffect, useState } from 'react'

import styles from './FallbackLoadingComponent.module.css'

export function FallbackLoadingComponent() {
  const loadingElements = ['🌍', '💸', '🔎']
  const [activeIndex, setActiveIndex] = useState(0)
  const durationMs = 500

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % loadingElements.length)
    }, durationMs)

    return () => clearInterval(intervalId)
  }, [durationMs, loadingElements.length])

  return (
    <main className={styles.container}>
      <div
        key={activeIndex}
        className={styles.emoji}
        aria-live="polite"
        style={{ animationDuration: `${durationMs}ms` }}
      >
        {loadingElements[activeIndex]}
      </div>
    </main>
  )
}
