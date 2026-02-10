export function Pagination({ currentPage = 1, totalPages = 10, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === totalPages

  const stylePrevButton = isFirstPage ? 'is-disabled' : ''
  const styleNextButton = isLastPage ? 'is-disabled' : ''

  function handlePrevClick(event) {
    event.preventDefault()
    if (!isFirstPage) {
      onPageChange(currentPage - 1)
    }
  }

  function handleNextClick(event) {
    event.preventDefault()
    if (!isLastPage) {
      onPageChange(currentPage + 1)
    }
  }

  function handleChangePage(event, page) {
    event.preventDefault()
    if (page !== currentPage) {
      onPageChange(page)
    }
  }
  return (
    <nav className="pagination">
      <a href="#" className={stylePrevButton} onClick={handlePrevClick}>
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
          href="#"
          className={currentPage === page ? 'is-active' : ''}
          onClick={(event) => handleChangePage(event, page)}
        >
          {page}
        </a>
      ))}

      <a href="#" className={styleNextButton} onClick={handleNextClick}>
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
