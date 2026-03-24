import jobs from '../data/jobs.json' with { type: 'json' }

export class JobModel {
  static async getAll({ text, experience, limit = 10, technology, location, offset = 0 }) {
    let filteredJobs = jobs

    if (text) {
      const searchTerm = text.toLowerCase()
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm) ||
          job.company.toLowerCase().includes(searchTerm) ||
          job.description.toLowerCase().includes(searchTerm)
      )
    }

    if (experience) {
      filteredJobs = filteredJobs.filter((job) => job.data.experience.includes(experience))
    }

    if (technology) {
      filteredJobs = filteredJobs.filter((job) => job.data.technology.includes(technology))
    }

    if (location) {
      const normalizedLocation = location.toLowerCase()
      filteredJobs = filteredJobs.filter(
        (job) => job.data.location.toLowerCase() === normalizedLocation
      )
    }

    const limitNumber = Number(limit)
    const offsetNumber = Number(offset)

    const paginatedJobs = filteredJobs.slice(offsetNumber, offsetNumber + limitNumber)

    return {
      total: jobs.length,
      limitNumber,
      offsetNumber,
      results: filteredJobs.length,
      data: paginatedJobs
    }
  }

  static async getById(id) {
    const job = jobs.find((job) => job.id === id)
    if (!job) return null
    return job
  }

  static async create({ title, company, location, description, data, content }) {
    const newJob = {
      id: crypto.randomUUID(),
      title,
      company,
      location,
      description,
      data,
      content
    }

    // In memory atm, later will migrate to DB.
    jobs.push(newJob)
    return newJob
  }

  static async update({ id, title, company, location, description, data, content }) {
    const jobIndex = jobs.findIndex((job) => job.id === id)

    if (jobIndex === -1) return null

    const updatedJob = {
      id,
      title,
      company,
      location,
      description,
      data,
      content
    }

    jobs[jobIndex] = updatedJob

    return updatedJob
  }

  static async partialUpdate({ id, updates }) {
    const job = jobs.find((job) => job.id === id)

    if (!job) return null

    for (const [key, value] of Object.entries(updates)) {
      if (key === 'id') continue

      const isNestedObject = ['data', 'content'].includes(key)

      if (isNestedObject && value && typeof value === 'object') {
        Object.assign(job[key], value)
      } else {
        job[key] = value
      }
    }

    return job
  }

  static async delete(id) {
    const jobIndex = jobs.findIndex((job) => job.id === id)

    if (jobIndex === -1) return false

    jobs.splice(jobIndex, 1)

    return true
  }
}
