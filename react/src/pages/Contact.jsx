import { useEffect, useState } from 'react'
import { ContactFormSection } from '../components/ContactFormSection'

export function ContactPage() {
  const [questions, setQuestions] = useState([])
  const handleSubmit = (question) => {
    setQuestions((prevQuestions) => [...prevQuestions, question])
  }

  useEffect(() => {
    console.log(questions)
  }, [questions])

  return (
    <main>
      <ContactFormSection onSubmit={handleSubmit} />
    </main>
  )
}
