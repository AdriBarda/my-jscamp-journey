import { JobCard } from './JobCard.jsx'

export function JobListings({ jobs }) {
  return (
    <>
      <h2>Search results</h2>
      <div className="jobs-listing">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </>
  )
}
