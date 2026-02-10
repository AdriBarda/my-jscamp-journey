import { useState, useEffect } from 'react'
import { JobListings } from '../components/JobListings.jsx'
import { Pagination } from '../components/Pagination.jsx'
import { SearchFormSection } from '../components/SearchFormSection.jsx'

import jobsData from '../data.json'

const RESULTS_PER_PAGE = 4

export function SearchPage() {
  const [filters, setFilters] = useState({
    technology: '',
    location: '',
    experienceLevel: ''
  })
  const [textToFilter, setTextToFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const jobFilteredByFilters = jobsData.filter((job) => {
    return (
      (filters.technology === '' ||
        job.data.technology.includes(filters.technology.toLowerCase())) &&
      (filters.location === '' ||
        job.data.locationCode.toLowerCase() === filters.location.toLowerCase()) &&
      (filters.experienceLevel === '' ||
        job.data.experience.toLowerCase() === filters.experienceLevel.toLowerCase())
    )
  })

  const jobsWithTextFilter =
    textToFilter === ''
      ? jobFilteredByFilters
      : jobFilteredByFilters.filter((job) => {
          return job.title.toLowerCase().includes(textToFilter.toLowerCase())
        })

  const totalPages = Math.ceil(jobsWithTextFilter.length / RESULTS_PER_PAGE)

  const pageResults = jobsWithTextFilter.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  )
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleSearch = (filters) => {
    setFilters(filters)
    setCurrentPage(1)
  }

  const handleTextFilter = (newTextToFilter) => {
    setTextToFilter(newTextToFilter)
    setCurrentPage(1)
  }

  useEffect(() => {
    document.title = `Results: ${jobsWithTextFilter.length}, page ${currentPage} - MyDevJobs`
  }, [jobsWithTextFilter, currentPage])

  return (
    <main>
      <SearchFormSection onSearch={handleSearch} onTextFilter={handleTextFilter} />
      <section className="jobs-results">
        <JobListings jobs={pageResults} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </section>
    </main>
  )
}
