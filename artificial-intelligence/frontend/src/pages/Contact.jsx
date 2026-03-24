import { useEffect, useState } from 'react'
import { ContactFormSection } from '../components/ContactFormSection'
import { PageTitle } from '../components/PageTitle'

export default function ContactPage() {
  const [questions, setQuestions] = useState([])
  const handleSubmit = (question) => {
    setQuestions((prevQuestions) => [...prevQuestions, question])
  }

  useEffect(() => {
    console.log(questions)
  }, [questions])

  return (
    <main>
      <PageTitle title="MyDevJobs - Contact" />
      <ContactFormSection onSubmit={handleSubmit} />
    </main>
  )
}
