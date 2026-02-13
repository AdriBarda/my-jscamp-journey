import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'

export const useFilters = () => {
  const RESULTS_PER_PAGE = 4

  const [searchParams, setSearchParams] = useSearchParams()

  const [textToFilter, setTextToFilter] = useState(() => searchParams.get('text') || '')

  const [filters, setFilters] = useState(() => {
    return {
      technology: searchParams.get('technology') || '',
      location: searchParams.get('type') || '',
      experienceLevel: searchParams.get('level') || ''
    }
  })

  const [currentPage, setCurrentPage] = useState(() => {
    const rawPage = searchParams.get('page')
    if (!rawPage) return 1
    const page = Number(rawPage)
    if (!Number.isFinite(page)) return 1
    const normalized = Math.floor(page)
    return normalized < 1 ? 1 : normalized
  })

  const hasFilters = Object.values(filters).some((filter) => filter !== '')

  const [jobs, setjobs] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true)

        const params = new URLSearchParams()
        if (textToFilter) params.append('text', textToFilter)
        if (filters.technology) params.append('technology', filters.technology)
        if (filters.location) params.append('type', filters.location)
        if (filters.experienceLevel) params.append('level', filters.experienceLevel)

        const offset = (currentPage - 1) * RESULTS_PER_PAGE
        params.append('limit', RESULTS_PER_PAGE)
        params.append('offset', offset)

        const queryParams = params.toString()

        const response = await fetch(`https://jscamp-api.vercel.app/api/jobs?${queryParams}`)
        const json = await response.json()

        setjobs(json.data)
        setTotal(json.total)
      } catch (error) {
        console.error('Error fetching jobs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [filters, currentPage, textToFilter])

  useEffect(() => {
    setSearchParams(() => {
      const nextParams = new URLSearchParams()

      if (textToFilter) nextParams.set('text', textToFilter)
      if (filters.technology) nextParams.set('technology', filters.technology)
      if (filters.location) nextParams.set('type', filters.location)
      if (filters.experienceLevel) nextParams.set('level', filters.experienceLevel)

      if (currentPage > 1) nextParams.set('page', String(currentPage))
      return nextParams
    })
  }, [filters, currentPage, textToFilter, setSearchParams])

  const totalPages = Math.ceil(total / RESULTS_PER_PAGE)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleTextFilter = (newTextToFilter) => {
    setTextToFilter(newTextToFilter)
    setCurrentPage(1)
  }

  const handleUpdateFilters = (name, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }))
    setCurrentPage(1)
  }

  const handleClearFilters = () => {
    setFilters({
      technology: '',
      location: '',
      experienceLevel: ''
    })

    setTextToFilter('')
    setCurrentPage(1)
    setSearchParams(() => {})
  }

  return {
    jobs,
    total,
    loading,
    totalPages,
    currentPage,
    hasFilters,
    textToFilter,
    filters,
    handlePageChange,
    handleTextFilter,
    handleUpdateFilters,
    handleClearFilters
  }
}
