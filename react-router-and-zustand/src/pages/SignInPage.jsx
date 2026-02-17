import { useId } from 'react'
import { useAuthStore } from '../store/auth'
import styles from './Auth.module.css'
import { useNavigate } from 'react-router'

export default function SignInPage() {
  const { signIn } = useAuthStore()
  const navigate = useNavigate()

  const emailId = useId()
  const passwordId = useId()

  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const email = formData.get(emailId)
    const password = formData.get(passwordId)

    // Mock login
    if (email && password) {
      signIn()
      navigate('/')
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <div className={styles.loginCardHeader}>
          <h1>Welcome Back</h1>
          <p>Sign in to find your next oportunity</p>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor={emailId}>Email</label>
            <input name={emailId} required type="email" placeholder="john.doe@example.com" />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor={passwordId}>Password</label>
            <input name={passwordId} required type="password" placeholder="Type your password" />
          </div>

          <button type="submit">Sign In</button>
        </form>
        <div className={styles.secondaryActionContainer}>
          <p>Don't have an account?</p>
          <a href="/register">
            <small>Sign up here!</small>
          </a>
        </div>
      </div>
    </div>
  )
}
