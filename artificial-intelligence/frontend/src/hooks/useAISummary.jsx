import { useEffect, useRef, useState } from 'react'

const apiBaseUrl = import.meta.env.VITE_APP_BASE_URL

function getSummaryErrorMessage(status) {
  if (status === 429) {
    return 'Too many requests. Please try again shortly.'
  }

  if (status === 404) {
    return 'This summary is unavailable right now because the job could not be found.'
  }

  return 'We could not generate an AI summary right now. Please try again in a moment.'
}

export function useAISummary(jobId) {
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const abortControllerRef = useRef(null)

  useEffect(() => {
    abortControllerRef.current?.abort()
    setSummary(null)
    setError(null)
    setLoading(false)

    return () => {
      abortControllerRef.current?.abort()
    }
  }, [jobId])

  const generateSummary = async () => {
    abortControllerRef.current?.abort()

    const controller = new AbortController()
    abortControllerRef.current = controller

    setLoading(true)
    setError(null)
    setSummary(null)

    try {
      const response = await fetch(`${apiBaseUrl}/ai/summary/${jobId}`, {
        signal: controller.signal
      })

      if (!response.ok) {
        throw new Error(getSummaryErrorMessage(response.status))
      }

      if (!response.body) throw new Error('Streaming response not available')

      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunkText = decoder.decode(value, { stream: true })
        setSummary((prev) => (prev ?? '') + chunkText)
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        return
      }

      setError(error.message || getSummaryErrorMessage())
    } finally {
      if (abortControllerRef.current === controller) {
        abortControllerRef.current = null
      }

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
