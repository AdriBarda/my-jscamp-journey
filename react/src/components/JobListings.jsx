import { JobCard } from './JobCard.jsx'
import { JobCardSkeleton } from './JobCardSkeleton.jsx'

export function JobListings({ jobs, loading = false }) {
  const skeletonItems = Array.from({ length: 3 }, (_, index) => index)

  return (
    <>
      <h2>Search results</h2>
      <div className="jobs-listing">
        {loading && skeletonItems.map((item) => <JobCardSkeleton key={`skeleton-${item}`} />)}

        {!loading && jobs.length === 0 && (
          <p
            style={{
              color: 'var(--text-muted)',
              textAlign: 'center',
              padding: '2rem 5rem',
              textWrap: 'balance'
            }}
          >
            No available job offers match your search parameters.
          </p>
        )}
        {!loading && jobs.map((job) => <JobCard key={job.id} job={job} />)}
      </div>
    </>
  )
}
