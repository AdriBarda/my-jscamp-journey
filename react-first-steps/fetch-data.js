/* Fetch jobs from fake API */

const container = document.querySelector('.jobs-listing')

let currentPage = 1
const RESULTS_PER_PAGE = 3

fetch('./data.json')
  .then((response) => response.json())
  .then((jobs) => {
    const paginationContainer = document.querySelector('.pagination')

    const renderJobs = () => {
      if (!container) return
      container.innerHTML = ''

      const startIndex = (currentPage - 1) * RESULTS_PER_PAGE
      const endIndex = startIndex + RESULTS_PER_PAGE
      const jobsToShow = jobs.slice(startIndex, endIndex)

      jobsToShow.forEach((job) => {
        const article = document.createElement('article')
        article.className = 'job-listing-card'

        article.dataset.jobTitle = job.title.toLowerCase()
        article.dataset.location = job.data.locationCode
        article.dataset.technology = job.data.technology.join(',')
        article.dataset.experience = job.data.experience

        article.innerHTML = `
        <div>
          <h3>${job.title}</h3>
          <small>${job.company} | ${job.location}</small>
          <p>
            ${job.summary}
          </p>
        </div>
        <button class="btn-apply-job">Apply</button>
      `
        container.appendChild(article)
      })
    }

    const renderPagination = () => {
      if (!paginationContainer) return
      const totalPages = Math.ceil(jobs.length / RESULTS_PER_PAGE)

      paginationContainer.innerHTML = ''

      for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button')
        button.textContent = i
        button.className = 'page-button'

        if (i === currentPage) {
          button.classList.add('active')
        }

        paginationContainer.appendChild(button)
      }
    }

    paginationContainer?.addEventListener('click', (event) => {
      const element = event.target

      if (element.classList.contains('page-button')) {
        currentPage = Number(element.textContent)
        renderJobs()
        renderPagination()
      }
    })

    renderJobs()
    renderPagination()
  })
