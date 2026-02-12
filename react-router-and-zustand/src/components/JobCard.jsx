import { useState } from 'react'
import { Link } from './Link'
import styles from './JobCard.module.css'

export function JobCard({ job }) {
  const { id, data, titulo, empresa, ubicacion, descripcion } = job

  const [isApplied, setIsApplied] = useState(false)

  function handleClick() {
    setIsApplied(true)
  }

  const buttonClasses = isApplied ? 'btn-apply-job is-applied' : 'btn-apply-job'
  const buttonText = isApplied ? 'Applied!' : 'Apply'
  return (
    <article
      className={styles.jobListingCard}
      data-location={data?.modalidad}
      data-experience={data?.nivel}
      data-technology={data?.technology}
    >
      <div>
        <h3>
          <Link className={styles.title} href={`/jobs/${id}`}>
            {titulo}
          </Link>
        </h3>
        <small>
          {empresa} | {ubicacion}
        </small>
        <p>{descripcion}</p>
      </div>
      <div className={styles.actions}>
        <Link href={`/jobs/${id}`} className={styles.details}>
          Details
        </Link>
        <button className={buttonClasses} disabled={isApplied} onClick={handleClick}>
          {buttonText}
        </button>
      </div>
    </article>
  )
}
