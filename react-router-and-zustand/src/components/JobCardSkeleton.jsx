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
      <span className="skeleton-button" />
    </article>
  )
}
