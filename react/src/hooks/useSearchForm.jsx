import { useState } from 'react'

let timeoutId = null

export const useSearchForm = ({
  idText,
  idTechnology,
  idLocation,
  idExperienceLevel,
  onSearch,
  onTextFilter
}) => {
  const [searchText, setSearchText] = useState('')
  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    if (event.target.name === idText) return

    const filters = {
      search: formData.get(idText),
      technology: formData.get(idTechnology),
      location: formData.get(idLocation),
      experienceLevel: formData.get(idExperienceLevel)
    }

    onSearch(filters)
  }

  const handleTextChange = (event) => {
    const text = event.target.value
    setSearchText(text)

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      onTextFilter(text)
    }, 500)
  }

  return {
    searchText,
    handleSubmit,
    handleTextChange
  }
}
