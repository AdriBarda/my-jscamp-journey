/* Filters interaction */

const jobSearchForm = document.getElementById('job-search-form')

jobSearchForm?.addEventListener('submit', (event) => {
  event.preventDefault()
  // apply filters here.
})

const searchInput = document.getElementById('job-searchbar')

searchInput?.addEventListener('keydown', (event) => {
  const searchQuery = event.target.value
  console.log(searchQuery)

  const jobCards = document.querySelectorAll('.job-listing-card')

  let resultsShownNumber = 0
  jobCards.forEach((card) => {
    const jobTitle = card.dataset.jobTitle
    const isShown = !searchQuery || jobTitle.toLowerCase().includes(searchQuery.toLowerCase())

    card.classList.toggle('is-hidden', !isShown)

    if (isShown) {
      resultsShownNumber++
    }
  })

  const resultsShown = document.querySelector('#results-shown')

  if (resultsShownNumber > 0) {
    resultsShown.textContent = `Shoiwing ${resultsShownNumber} results`
  } else {
    resultsShow.textContent = ''
  }
})

const selectedFilters = document.querySelector('#selected-filters')

const filterTechnology = document.getElementById('filter-tecnology')

filterTechnology?.addEventListener('change', (event) => {
  const selectedTechnology = event.target.value
  const jobCards = document.querySelectorAll('.job-listing-card')

  if (selectedTechnology) {
    selectedFilters.textContent = `Selected filters: ${selectedTechnology}`
  } else {
    selectedFilters.textContent = ''
  }

  jobCards.forEach((card) => {
    const technology = card.dataset.technology
    const isShown = !selectedTechnology || technology.includes(selectedTechnology)
    card.classList.toggle('is-hidden', !isShown)
  })
})

const filterLocation = document.getElementById('filter-location')

filterLocation?.addEventListener('change', (event) => {
  const selectedLocation = event.target.value
  const jobCards = document.querySelectorAll('.job-listing-card')

  if (selectedLocation) {
    selectedFilters.textContent = `Selected filters: ${selectedLocation}`
  } else {
    selectedFilters.textContent = ''
  }

  jobCards.forEach((card) => {
    const location = card.dataset.location
    const isShown = !selectedLocation || location === selectedLocation
    card.classList.toggle('is-hidden', !isShown)
  })
})

const filterExperience = document.getElementById('filter-experience-level')

filterExperience?.addEventListener('change', (event) => {
  const selectedExperience = event.target.value
  const jobCards = document.querySelectorAll('.job-listing-card')

  if (selectedExperience) {
    selectedFilters.textContent = `Selected filters: ${selectedExperience}`
  } else {
    selectedFilters.textContent = ''
  }

  jobCards.forEach((card) => {
    const experience = card.dataset.experience
    const isShown = !selectedExperience || experience === selectedExperience
    card.classList.toggle('is-hidden', !isShown)
  })
})
