export function JobSearchForm() {
  return (
    <form id="job-search-form" role="search">
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
          id="job-searchbar"
          name="search"
          required
          type="text"
          placeholder="Search a job by title, skill or company"
        />
      </div>

      <div className="search-filters">
        <select name="tecnology" id="filter-tecnology">
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

        <select name="location" id="filter-location">
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
          <option value="remote">🌍 Remote</option>
        </select>

        <select name="experience-level" id="filter-experience-level">
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
    </form>
  )
}
