import { useId, useRef, useState } from 'react'
import styles from './SearchFormSection.module.css'
import { FilterField } from './FilterField'

export function SearchFormSection({
  onTextFilter,
  hasFilters,
  onReset,
  textFilter,
  filters,
  onFilterChange
}) {
  const idText = useId()
  const idTechnology = useId()
  const idLocation = useId()
  const idExperienceLevel = useId()

  const [focusedField, setFocusedField] = useState(null)

  const searchBarRef = useRef()

  const handleClearSearch = () => {
    onTextFilter('')
    searchBarRef.current.focus()
  }

  const handleClearFilters = () => {
    onReset()
  }

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <section className="jobs-search">
      <h1>Find the next step in your career</h1>
      <p>Explore thousands of opportunities in the IT industry.</p>

      <form onSubmit={handleSubmit} className="search-form" id="job-search-form" role="search">
        <div className="search-bar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            className="icon icon-tabler icons-tabler-outline icon-tabler-search"
            viewBox="0 0 24 24"
          >
            <path fill="none" stroke="none" d="M0 0h24v24H0z" />
            <path d="M3 10a7 7 0 1 0 14 0 7 7 0 1 0-14 0m18 11-6-6" />
          </svg>
          <FilterField>
            <input
              id={idText}
              type="text"
              value={textFilter}
              ref={searchBarRef}
              name={idText}
              placeholder="Search a job by title, skill or company"
              onChange={(event) => onTextFilter(event.target.value)}
              onFocus={() => setFocusedField('search')}
              onBlur={() => setFocusedField(null)}
              className={focusedField === 'search' ? styles.inputFocused : ''}
            />
          </FilterField>
          <button
            type="button"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '0.5rem'
            }}
            onClick={handleClearSearch}
          >
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
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className={styles.filtersBar}>
          <select
            value={filters.technology}
            name={idTechnology}
            id={idTechnology}
            onFocus={() => setFocusedField('technology')}
            onBlur={() => setFocusedField(null)}
            onChange={(event) => onFilterChange('technology', event.target.value)}
            className={focusedField === 'technology' ? styles.inputFocused : ''}
          >
            <option value="">All Technologies</option>
            <optgroup label="Frontend">
              <option value="html">HTML</option>
              <option value="css">CSS</option>
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="react">React</option>
              <option value="vue">Vue</option>
            </optgroup>

            <optgroup label="Backend">
              <option value="node">Node.js</option>
              <option value="python">Python</option>
              <option value="php">PHP</option>
              <option value="java">Java</option>
              <option value="go">Go</option>
            </optgroup>

            <optgroup label="Database">
              <option value="mysql">MySQL</option>
              <option value="mongodb">MongoDB</option>
              <option value="postgresql">PostgreSQL</option>
              <option value="sql">SQL</option>
            </optgroup>

            <optgroup label="Cloud & DevOps">
              <option value="aws">AWS</option>
              <option value="docker">Docker</option>
              <option value="kubernetes">Kubernetes</option>
              <option value="terraform">Terraform</option>
            </optgroup>

            <optgroup label="Testing & QA">
              <option value="cypress">Cypress</option>
              <option value="jest">Jest</option>
              <option value="selenium">Selenium</option>
            </optgroup>

            <optgroup label="Design">
              <option value="figma">Figma</option>
              <option value="prototyping">Prototyping</option>
              <option value="usability-testing">Usability Testing</option>
            </optgroup>

            <optgroup label="Mobile">
              <option value="firebase">Firebase</option>
              <option value="flutter">Flutter</option>
              <option value="ios">iOS</option>
              <option value="swift">Swift</option>
              <option value="xcode">Xcode</option>
            </optgroup>

            <optgroup label="Data & AI">
              <option value="pandas">Pandas</option>
              <option value="tensorflow">TensorFlow</option>
            </optgroup>
          </select>

          <select
            value={filters.location}
            name={idLocation}
            id={idLocation}
            onFocus={() => setFocusedField('location')}
            onBlur={() => setFocusedField(null)}
            onChange={(event) => onFilterChange('location', event.target.value)}
            className={focusedField === 'location' ? styles.inputFocused : ''}
          >
            <option value="">All Locations</option>
            <optgroup label="Remote">
              <option value="remote">🌍 Remote</option>
            </optgroup>

            <optgroup label="Europe">
              <option value="amsterdam">Amsterdam, Netherlands</option>
              <option value="barcelona">Barcelona, Spain</option>
              <option value="berlin">Berlin, Germany</option>
              <option value="dublin">Dublin, Ireland</option>
              <option value="lisbon">Lisbon, Portugal</option>
              <option value="london">London, UK</option>
              <option value="madrid">Madrid, Spain</option>
              <option value="manchester">Manchester, UK</option>
              <option value="paris">Paris, France</option>
              <option value="valencia">Valencia, Spain</option>
            </optgroup>

            <optgroup label="North America">
              <option value="boston">Boston, USA</option>
              <option value="chicago">Chicago, USA</option>
              <option value="cdmx">Mexico City, Mexico</option>
              <option value="nyc">New York, USA</option>
              <option value="sf">San Francisco, USA</option>
              <option value="toronto">Toronto, Canada</option>
            </optgroup>
          </select>

          <select
            value={filters.experienceLevel}
            name={idExperienceLevel}
            id={idExperienceLevel}
            onFocus={() => setFocusedField('experienceLevel')}
            onBlur={() => setFocusedField(null)}
            onChange={(event) => onFilterChange('experienceLevel', event.target.value)}
            className={focusedField === 'experienceLevel' ? styles.inputFocused : ''}
          >
            <option value="">All Levels</option>
            <option value="junior">Junior</option>
            <option value="mid">Mid-level</option>
            <option value="senior">Senior</option>
            <option value="lead">Lead</option>
            <option value="internship">Internship</option>
            <option value="freelance">Freelance</option>
          </select>

          {hasFilters && (
            <button type="button" className={styles.clearFiltersBtn} onClick={handleClearFilters}>
              Clear Filters
            </button>
          )}
        </div>
      </form>
    </section>
  )
}
