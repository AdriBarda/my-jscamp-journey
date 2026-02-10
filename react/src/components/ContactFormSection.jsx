import { useId } from 'react'
import styles from './ContactFormSection.module.css'
import { useContactForm } from '../hooks/useContactForm'

export function ContactFormSection({ onSubmit }) {
  const idName = useId()
  const idSurname = useId()
  const idEmail = useId()
  const idMessage = useId()

  const {
    name,
    surname,
    email,
    message,
    focusedField,
    errors,
    success,
    setNameValue,
    setSurnameValue,
    setEmailValue,
    setMessageValue,
    setFocusedField,
    handleSubmit
  } = useContactForm({
    onSubmit
  })

  const nameInputClassName = `${focusedField === 'name' ? styles.inputFocused : ''} ${errors.name ? styles.inputError : ''}`
  const surnameInputClassName = `${focusedField === 'surname' ? styles.inputFocused : ''} ${errors.surname ? styles.inputError : ''}`
  const emailInputClassName = `${focusedField === 'email' ? styles.inputFocused : ''} ${errors.email ? styles.inputError : ''}`
  const messageInputClassName = `${focusedField === 'message' ? styles.inputFocused : ''} ${errors.message ? styles.inputError : ''}`
  const hasErrors = Object.values(errors).some(Boolean)

  return (
    <div className={styles.contactPage}>
      <section className={styles.contactFormSection}>
        <h1>Contact Page</h1>
        <p>Any questions? Contact us!</p>
        {success && (
          <div className="success-alert">
            Your message has been succeessfully sent! We will get back to you shortly.
          </div>
        )}
        <form className={styles.form} onSubmit={handleSubmit} id="contact-form" role="contact">
          <div className={styles.formGroup}>
            <label className={styles.inputHint} htmlFor={idName}>
              Name:
              <span> *</span>
            </label>
            <input
              value={name}
              id={idName}
              name={idName}
              type="text"
              placeholder="John"
              onFocus={() => setFocusedField('name')}
              onChange={(event) => setNameValue(event.target.value)}
              onBlur={() => setFocusedField(null)}
              className={nameInputClassName}
            />
            <label htmlFor={idName} className={styles.labelError}>
              {errors.name}
            </label>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.inputHint} htmlFor={idName}>
              Surname:
              <span> *</span>
            </label>
            <input
              value={surname}
              id={idSurname}
              name={idSurname}
              type="text"
              placeholder="Doe"
              onFocus={() => setFocusedField('surname')}
              onChange={(event) => setSurnameValue(event.target.value)}
              onBlur={() => setFocusedField(null)}
              className={surnameInputClassName}
            />
            <label htmlFor={idSurname} className={styles.labelError}>
              {errors.surname}
            </label>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.inputHint} htmlFor={idName}>
              Email:
              <span> *</span>
            </label>
            <input
              value={email}
              id={idEmail}
              name={idEmail}
              type="text"
              placeholder="john.doe@example.com"
              onFocus={() => setFocusedField('email')}
              onChange={(event) => setEmailValue(event.target.value)}
              onBlur={() => setFocusedField(null)}
              className={emailInputClassName}
            />
            <label htmlFor={idEmail} className={styles.labelError}>
              {errors.email}
            </label>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.inputHint} htmlFor={idName}>
              Question:
              <span> *</span>
            </label>
            <textarea
              value={message}
              id={idMessage}
              name={idMessage}
              placeholder="Dear MyDevJobs team..."
              onFocus={() => setFocusedField('message')}
              onChange={(event) => setMessageValue(event.target.value)}
              onBlur={() => setFocusedField(null)}
              className={messageInputClassName}
            />
            <div className={styles.messageMeta}>
              {message.trim().length >= 0 && message.trim().length < 10 && (
                <div className={styles.labelError}>{errors.message}</div>
              )}
              <div className={`${styles.charCount} ${errors.message ? styles.charCountError : ''}`}>
                {message.length}/1000
              </div>
            </div>
          </div>
          <button type="submit" className={styles.submitButton} disabled={hasErrors}>
            Submit
          </button>
        </form>
      </section>
    </div>
  )
}
