import styles from './JobCard.module.css'

export function JobCardSkeleton() {
  return (
    <article className={`${styles.jobListingCard} ${styles.isSkeleton}`}>
      <div className="skeleton-block">
        <span className="skeleton-line skeleton-title" />
        <span className="skeleton-line skeleton-meta" />
        <span className="skeleton-line skeleton-text" />
        <span className="skeleton-line skeleton-text short" />
      </div>
      <div className={styles.actions}>
        <span className="skeleton-line skeleton-text short" style={{ width: '50px' }} />
        <span className="skeleton-button" />
      </div>
    </article>
  )
}
