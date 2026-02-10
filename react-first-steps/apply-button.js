// const buttons = document.querySelectorAll('.btn-apply-job')

// buttons.forEach((button) => {
//   button.addEventListener('click', () => {
//     button.textContent = 'Applied!'
//     button.classList.add('is-applied')
//     button.disabled = true
//   })
// })

// DE MEJOR MANERA

/* Apply interaction */
const jobsListingSection = document.querySelector('.jobs-listing')

jobsListingSection?.addEventListener('click', (event) => {
  const element = event.target

  if (element.classList.contains('btn-apply-job')) {
    element.textContent = 'Applied!'
    element.classList.add('is-applied')
    element.disabled = true
  }
})

const jobDetailsSection = document.querySelector('.job-details')

jobDetailsSection?.addEventListener('click', (event) => {
  const element = event.target

  if (element.classList.contains('btn-apply-job')) {
    element.textContent = 'Applied!'
    element.classList.add('is-applied')
    element.disabled = true
  }
})
