import { useState } from 'react'
import { useAuthStore } from '../../store/auth'
import styles from './ApplyButton.module.css'

export function ApplyButton({ jobId }) {
  const { isLoggedIn } = useAuthStore()
  const [isApplied, setIsApplied] = useState(false)

  const handleApply = () => {
    console.log('Applying to: ', jobId)
    setIsApplied(true)
  }

  const buttonStyles = [styles.applyButton, isApplied ? styles.isApplied : '']
    .filter(Boolean)
    .join(' ')

  return (
    <button className={buttonStyles} disabled={!isLoggedIn || isApplied} onClick={handleApply}>
      {isApplied ? 'Applied!' : 'Apply'}
    </button>
  )
}
