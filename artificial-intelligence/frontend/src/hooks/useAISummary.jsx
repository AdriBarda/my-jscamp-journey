import { useEffect, useState } from 'react'

const apiBaseUrl = import.meta.env.VITE_APP_BASE_URL

export function useAISummary(jobId) {
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setSummary(null)
    setError(null)
    setLoading(false)
  }, [jobId])

  const generateSummary = async () => {
    setLoading(true)
    setError(null)
    setSummary('')

    try {
      const response = await fetch(`${apiBaseUrl}/ai/summary/${jobId}`)

      if (!response.ok) throw new Error('Error fetching summary')
      if (!response.body) throw new Error('Streaming response not available')

      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunkText = decoder.decode(value, { stream: true })
        setSummary((prev) => prev + chunkText)
      }
    } catch {
      setError('Error when generating summary')
    } finally {
      setLoading(false)
    }
  }

  return {
    summary,
    loading,
    error,
    generateSummary
  }
}
