import { JobListings } from '../components/JobListings.jsx'
import { Pagination } from '../components/Pagination.jsx'
import { SearchFormSection } from '../components/SearchFormSection.jsx'
import { useFilters } from '../hooks/useFilters.jsx'
import { PageTitle } from '../components/PageTitle.jsx'

export default function SearchPage() {
  const {
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
  } = useFilters()

  const title = `Results: ${total}, page ${currentPage} - MyDevJobs`

  return (
    <main>
      <PageTitle title={title} />
      <SearchFormSection
        onTextFilter={handleTextFilter}
        hasFilters={hasFilters}
        onReset={handleClearFilters}
        textFilter={textToFilter}
        filters={filters}
        onFilterChange={handleUpdateFilters}
      />
      <section className="job-results">
        <JobListings jobs={jobs} loading={loading} />
        {jobs.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </section>
    </main>
  )
}
