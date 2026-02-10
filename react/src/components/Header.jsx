export function Header() {
  return (
    <header>
      <h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          className="icon icon-tabler icons-tabler-outline icon-tabler-device-imac-code"
          viewBox="0 0 24 24"
        >
          <path fill="none" stroke="none" d="M0 0h24v24H0z" />
          <path d="M11.5 17H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v9M3 13h18M8 21h3.5M10 17l-.5 4M20 21l2-2-2-2m-3 0-2 2 2 2" />
        </svg>
        MyDevJobs
      </h1>
      <nav>
        <a href="/react-first-steps/">Home</a>
        <a href="jobs.html">Job Offers</a>
        <a href="">Companies</a>
        <a href="">Salaries</a>
      </nav>
      <div>
        <devjobs-avatar></devjobs-avatar>
      </div>
    </header>
  )
}
