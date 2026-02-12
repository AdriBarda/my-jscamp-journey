export function JobCardSkeleton() {
  return (
    <article className="job-listing-card is-skeleton">
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
