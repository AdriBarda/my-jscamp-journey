import { useState } from 'react'

export function JobCard({ job }) {
  const { data, titulo, empresa, ubicacion, descripcion } = job

  const [isApplied, setIsApplied] = useState(false)

  function handleClick() {
    setIsApplied(true)
  }

  const buttonClasses = isApplied ? 'btn-apply-job is-applied' : 'btn-apply-job'
  const buttonText = isApplied ? 'Applied!' : 'Apply'
  return (
    <article
      className="job-listing-card"
      data-location={data?.modalidad}
      data-experience={data?.nivel}
      data-technology={data?.technology}
    >
      <div>
        <h3>{titulo}</h3>
        <small>
          {empresa} | {ubicacion}
        </small>
        <p>{descripcion}</p>
      </div>
      <button className={buttonClasses} disabled={isApplied} onClick={handleClick}>
        {buttonText}
      </button>
    </article>
  )
}
