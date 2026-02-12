import styles from './Pagination.module.css'
export function Pagination({ currentPage = 1, totalPages = 10, onPageChange }) {
  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === totalPages

  const stylePrevButton = isFirstPage ? styles.isDisabled : ''
  const styleNextButton = isLastPage ? styles.isDisabled : ''

  const handlePrevClick = (event) => {
    event.preventDefault()
    if (!isFirstPage) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNextClick = (event) => {
    event.preventDefault()
    if (!isLastPage) {
      onPageChange(currentPage + 1)
    }
  }

  const buildPageURL = (page) => {
    const url = new URL(window.location)
    url.searchParams.set('page', page)
    return `${url.pathname}?${url.searchParams.toString()}`
  }
  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <a href={buildPageURL(currentPage - 1)} className={stylePrevButton} onClick={handlePrevClick}>
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path fill="none" stroke="none" d="M0 0h24v24H0z" />
          <path d="m15 6-6 6 6 6" />
        </svg>
      </a>

      <span className={styles.pageLabel}>
        Page {currentPage} of {totalPages}
      </span>

      <a href={buildPageURL(currentPage + 1)} className={styleNextButton} onClick={handleNextClick}>
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path fill="none" stroke="none" d="M0 0h24v24H0z" />
          <path d="m9 6 6 6-6 6" />
        </svg>
      </a>
    </nav>
  )
}
