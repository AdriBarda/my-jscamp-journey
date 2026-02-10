import { useState } from 'react'

export function JobCard({ job }) {
  const { data, title, company, location, summary } = job

  const [isApplied, setIsApplied] = useState(false)

  function handleClick() {
    setIsApplied(true)
  }

  const buttonClasses = isApplied ? 'btn-apply-job is-applied' : 'btn-apply-job'
  const buttonText = isApplied ? 'Applied!' : 'Apply'
  return (
    <article
      className="job-listing-card"
      data-location={data?.locationCode}
      data-experience={data?.experience}
      data-technology={data?.technology}
    >
      <div>
        <h3>{title}</h3>
        <small>
          {company} | {location}
        </small>
        <p>{summary}</p>
      </div>
      <button className={buttonClasses} disabled={isApplied} onClick={handleClick}>
        {buttonText}
      </button>
    </article>
  )
}
