import styles from './Pagination.module.css'
export function Pagination({ currentPage = 1, totalPages = 10, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

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

  const handleChangePage = (event, page) => {
    event.preventDefault()
    if (page !== currentPage) {
      onPageChange(page)
    }
  }

  const buildPageURL = (page) => {
    const url = new URL(window.location)
    url.searchParams.set('page', page)
    return `${url.pathname}?${url.searchParams.toString()}`
  }
  return (
    <nav className={styles.pagination}>
      <a href={buildPageURL(currentPage - 1)} className={stylePrevButton} onClick={handlePrevClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-left"
          viewBox="0 0 24 24"
        >
          <path fill="none" stroke="none" d="M0 0h24v24H0z" />
          <path d="m15 6-6 6 6 6" />
        </svg>
      </a>

      {pages.map((page) => (
        <a
          key={page}
          href={buildPageURL(page)}
          className={currentPage === page ? styles.isActive : ''}
          onClick={(event) => handleChangePage(event, page)}
        >
          {page}
        </a>
      ))}

      <a href={buildPageURL(currentPage + 1)} className={styleNextButton} onClick={handleNextClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"
          viewBox="0 0 24 24"
        >
          <path fill="none" stroke="none" d="M0 0h24v24H0z" />
          <path d="m9 6 6 6-6 6" />
        </svg>
      </a>
    </nav>
  )
}
