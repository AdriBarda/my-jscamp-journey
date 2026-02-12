import { useEffect, useState } from 'react'

export const useContactForm = ({ onSubmit }) => {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const [focusedField, setFocusedField] = useState(null)
  const [errors, setErrors] = useState({})

  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!success) return

    const successTimeoutId = setTimeout(() => {
      setSuccess(false)
    }, 3000)

    return () => {
      clearTimeout(successTimeoutId)
    }
  }, [success])

  const validations = {
    name: /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,50}$/,
    surname: /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,50}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
    message: /^[\s\S]{10,1000}$/
  }

  const validationReasons = {
    name: 'Name must be 2-50 letters and may include spaces, hyphens, or apostrophes.',
    surname: 'Surname must be 2-50 letters and may include spaces, hyphens, or apostrophes.',
    email: 'Email must be a valid address like name@example.com.',
    message: 'Message must be between at least 10 characters long.'
  }

  const validateField = (key, value) => {
    const trimmedValue = value.trim()
    const isValid = validations[key].test(trimmedValue)
    setErrors((prevErrors) => ({
      ...prevErrors,
      [key]: isValid ? '' : validationReasons[key]
    }))
  }

  const setNameValue = (value) => {
    setName(value)
    validateField('name', value)
  }

  const setSurnameValue = (value) => {
    setSurname(value)
    validateField('surname', value)
  }

  const setEmailValue = (value) => {
    setEmail(value)
    validateField('email', value)
  }

  const setMessageValue = (value) => {
    setMessage(value)
    validateField('message', value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const userQuestion = {
      name: name.trim(),
      surname: surname.trim(),
      email: email.trim(),
      message: message.trim()
    }

    const nextErrors = {}
    let hasValidationErrors = false

    for (const [key, value] of Object.entries(userQuestion)) {
      const trimmedValue = value.trim()
      const isValid = validations[key].test(trimmedValue)
      if (!isValid) {
        nextErrors[key] = validationReasons[key]
        hasValidationErrors = true
      }
    }

    if (hasValidationErrors) {
      setErrors((prevErrors) => ({ ...prevErrors, ...nextErrors }))
      return
    }

    onSubmit(userQuestion)
    setSuccess(true)
    setErrors({})
    setName('')
    setSurname('')
    setEmail('')
    setMessage('')
  }

  return {
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
    handleSubmit,
    setFocusedField
  }
}
