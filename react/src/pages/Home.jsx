import { useRouter } from '../hooks/useRouter'

export function HomePage() {
  const { navigateTo } = useRouter()

  const handleSearch = (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const searchQuery = formData.get('search')

    const url = searchQuery ? `/search?text=${encodeURIComponent(searchQuery)}` : '/search'
    navigateTo(url)
  }
  return (
    <main>
      <section>
        <img
          src="./background.webp"
          alt="Hero Image"
          width="100%"
          style={{ aspectRatio: 640 / 427 }}
        />
        <h1>Find your dream job</h1>
        <p>
          Join the biggest developer community in the world and take the next step in your career.
        </p>

        <form className="search-form" role="search" onSubmit={handleSearch}>
          <div>
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
              <path d="M3 10a7 7 0 1 0 14 0 7 7 0 1 0-14 0m18 11-6-6" />
            </svg>
            <input
              name="search"
              required
              type="text"
              placeholder="Search a job by title, skill or company"
            />
            <button type="submit">Search</button>
          </div>
        </form>
      </section>
      <section>
        <header>
          <h2>Why MyDevJobs?</h2>
          <p>
            MyDevJobs is the best platform to find developer jobs in the world. We connect
            developers with the most innovative companies around the globe.
          </p>
        </header>
        <footer>
          <article>
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
              <path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zm5-2V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m-4 5v.01" />
              <path d="M3 13a20 20 0 0 0 18 0" />
            </svg>
            <h3>Find your dream job</h3>
            <p>Search thousands of job offers from top-class companies around the globe.</p>
          </article>
          <article>
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
              <path d="M5 7a4 4 0 1 0 8 0 4 4 0 1 0-8 0M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2m1-17.87a4 4 0 0 1 0 7.75M21 21v-2a4 4 0 0 0-3-3.85" />
            </svg>
            <h3>Connect with the best companies</h3>
            <p>Connect with companies that are looking for developers with your skills.</p>
          </article>
          <article>
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
              <path d="M3 12a9 9 0 1 0 18 0 9 9 0 1 0-18 0" />
              <path d="M15 9a2 2 0 1 0-4 0v5a2 2 0 0 1-2 2h6m-6-4h4" />
            </svg>
            <h3>Get the salary you deserve</h3>
            <p>Get the salary you deserve with our salary calculator and market insights.</p>
          </article>
        </footer>
      </section>
    </main>
  )
}
