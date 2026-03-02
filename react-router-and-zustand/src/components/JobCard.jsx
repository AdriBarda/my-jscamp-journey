import { Link } from './Link'
import styles from './JobCard.module.css'
import { AddToFavoritesButton } from './Buttons/AddToFavoritesButton.jsx'
import { ApplyButton } from './Buttons/ApplyButton.jsx'

export function JobCard({ job }) {
  const { id, data, title, company, location, description } = job

  return (
    <article
      className={styles.jobListingCard}
      data-location={data?.location}
      data-experience={data?.experience}
      data-technology={data?.technology}
    >
      <div>
        <h3>
          <Link className={styles.title} href={`/jobs/${id}`}>
            {title}
          </Link>
        </h3>
        <small>
          {company} | {location}
        </small>
        <p>{description}</p>
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
