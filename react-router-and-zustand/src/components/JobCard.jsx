import { Link } from './Link'
import styles from './JobCard.module.css'
import { AddToFavoritesButton } from './Buttons/AddToFavoritesButton.jsx'
import { ApplyButton } from './Buttons/ApplyButton.jsx'

export function JobCard({ job }) {
  const { id, data, titulo, empresa, ubicacion, descripcion } = job

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
        <ApplyButton jobId={job.id} />
        <AddToFavoritesButton jobId={job.id} />
      </div>
    </article>
  )
}
