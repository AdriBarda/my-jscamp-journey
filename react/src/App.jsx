import { useState } from 'react'
import { Footer } from './components/Footer.jsx'
import { Header } from './components/Header.jsx'
import { JobListings } from './components/JobListings.jsx'
import { Pagination } from './components/Pagination.jsx'
import { SearchFormSection } from './components/SearchFormSection.jsx'

import jobsData from './data.json'

const RESULTS_PER_PAGE = 4

function App() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(jobsData.length / RESULTS_PER_PAGE)

  const pageResults = jobsData.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  )
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  return (
    <div className="app">
      <Header />
      <main>
        <SearchFormSection />
        <section className="jobs-results">
          <JobListings jobs={pageResults} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default App
