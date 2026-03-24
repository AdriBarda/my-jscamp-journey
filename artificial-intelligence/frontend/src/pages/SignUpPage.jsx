import { useNavigate } from 'react-router'
import { useAuthStore } from '../store/auth'
import styles from './Auth.module.css'
import { useId } from 'react'

export default function SignUpPage() {
  const { signUp } = useAuthStore()
  const navigate = useNavigate()

  const fullNameId = useId()
  const emailId = useId()
  const passwordId = useId()
  const passwordRepeatId = useId()

  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)

    const fullName = formData.get(fullNameId)
    const email = formData.get(emailId)
    const password = formData.get(passwordId)
    const passwordRepeat = formData.get(passwordRepeatId)
    // Mock login
    if (fullName && email && password && passwordRepeat) {
      signUp()
      navigate('/')
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <div className={styles.loginCardHeader}>
          <h1>Create an account</h1>
          <p>Sign up to apply to your dream job</p>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor={fullNameId}>
              Name: <small>*</small>
            </label>
            <input name={fullNameId} required type="text" placeholder="John Doe" />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor={emailId}>
              Email: <small>*</small>
            </label>
            <input name={emailId} required type="email" placeholder="john.doe@example.com" />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor={passwordId}>
              Password: <small>*</small>
            </label>
            <input name={passwordId} required type="password" placeholder="Type your password" />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor={passwordRepeatId}>
              Repeat password: <small>*</small>
            </label>
            <input
              name={passwordRepeatId}
              required
              type="password"
              placeholder="Type your password"
            />
          </div>
          <button onClick={signUp}>Sign Up</button>
        </form>
        <div className={styles.secondaryActionContainer}>
          <p>Already registered?</p>
          <a href="/login">
            <small>Sign In instead!</small>
          </a>
        </div>
      </div>
    </div>
  )
}
