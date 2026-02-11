import { useId, useRef, useState } from 'react'
import styles from './SearchFormSection.module.css'
import { useSearchForm } from '../hooks/useSearchForm'

export function SearchFormSection({ onSearch, onTextFilter, hasFilters, onReset, initialText }) {
  const idText = useId()
  const idTechnology = useId()
  const idLocation = useId()
  const idExperienceLevel = useId()

  const [focusedField, setFocusedField] = useState(null)

  const formRef = useRef()
  const searchBarRef = useRef()

  const { handleSubmit, handleTextChange } = useSearchForm({
    idText,
    idTechnology,
    idLocation,
    idExperienceLevel,
    onSearch,
    onTextFilter
  })

  const handleReset = () => {
    // I'm taking this approach since I have a hybrid controled form for search and non formData for filters...
    // Updated this to useRef() usage since it was not necesary to use document.getSelector...
    formRef.current.reset()
    onReset()
  }

  const handleClearSearch = () => {
    searchBarRef.current.value = ''
    onTextFilter('')
    searchBarRef.current.focus()
  }

  return (
    <section className="jobs-search">
      <h1>Find the next step in your career</h1>
      <p>Explore thousands of opportunities in the IT industry.</p>

      <form
        ref={formRef}
        className="search-form"
        onChange={handleSubmit}
        id="job-search-form"
        role="search"
      >
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
          <input
            ref={searchBarRef}
            id={idText}
            name={idText}
            type="text"
            placeholder="Search a job by title, skill or company"
            onChange={handleTextChange}
            onFocus={() => setFocusedField('search')}
            onBlur={() => setFocusedField(null)}
            className={focusedField === 'search' ? styles.inputFocused : ''}
            defaultValue={initialText}
          />
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
          <div className={styles.formGroup}>
            <label className={styles.inputHint} htmlFor={idTechnology}>
              Technology:
            </label>
            <select
              name={idTechnology}
              id={idTechnology}
              onFocus={() => setFocusedField('technology')}
              onBlur={() => setFocusedField(null)}
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
              </optgroup>

              <optgroup label="DB">
                <option value="mysql">MySQL</option>
                <option value="mongodb">MongoDB</option>
                <option value="postgresql">PostgreSQL</option>
              </optgroup>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.inputHint} htmlFor={idLocation}>
              Location:
            </label>
            <select
              name={idLocation}
              id={idLocation}
              onFocus={() => setFocusedField('location')}
              onBlur={() => setFocusedField(null)}
              className={focusedField === 'location' ? styles.inputFocused : ''}
            >
              <option value="">All Locations</option>
              <optgroup label="Spain">
                <option value="barcelona">Barcelona</option>
                <option value="madrid">Madrid</option>
                <option value="valencia">Valencia</option>
              </optgroup>
              <optgroup label="Mexico">
                <option value="cdmx">Mexico City</option>
                <option value="guadalajara">Guadalajara</option>
                <option value="monterrey">Monterrey</option>
              </optgroup>
              <hr />
              <option value="remoto">🌍 Remote</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.inputHint} htmlFor={idExperienceLevel}>
              Experience Level:
            </label>
            <select
              name={idExperienceLevel}
              id={idExperienceLevel}
              onFocus={() => setFocusedField('experienceLevel')}
              onBlur={() => setFocusedField(null)}
              className={focusedField === 'experienceLevel' ? styles.inputFocused : ''}
            >
              <option value="">All Levels</option>
              <option value="junior">Junior</option>
              <option value="mid">Mid-level</option>
              <option value="senior">Senior</option>
              <option value="lead">Lead</option>
              <hr />
              <option value="internship">Internship</option>
              <option value="freelance">Freelance</option>
            </select>
          </div>
          {hasFilters && (
            <button type="button" className={styles.clearFiltersBtn} onClick={handleReset}>
              Clear Filters
            </button>
          )}
        </div>
      </form>
    </section>
  )
}
