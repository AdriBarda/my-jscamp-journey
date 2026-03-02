import express from 'express'
import jobs from './jobs.json' with { type: 'json' }
import cors from 'cors'

process.loadEnvFile()
const PORT = process.env.PORT || 1234
const app = express()

const ACCEPTED_ORIGINS = ['http://localhost:5173']

app.use((req, res, next) => {
  const timeString = new Date().toLocaleTimeString()
  console.log(`[${timeString}] ${req.method} ${req.url}`)
  next()
})

app.use(
  cors({
    origin: (origin, callback) => {
      if (ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null, true)
      }
      return callback(new Error('Origin Not Allowed'))
    }
  })
)

// Parse to JSON based on headers
app.use(express.json())

app.get('/', (req, res) => {
  return res.send('<h1>Hello World! 🌍</h1>')
})

app.get('/health', (req, res) => {
  return res.json({
    status: 'ok',
    uptime: process.uptime()
  })
})

// CRUD: Create, Read, Update, Delete

app.get('/jobs', (req, res) => {
  const { text, experience, limit = 10, technology, location, offset = 0 } = req.query
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

  return res.json({
    total: jobs.length,
    limit: limitNumber,
    offset: offsetNumber,
    results: filteredJobs.length,
    data: paginatedJobs
  })
})

app.get('/jobs/:id', (req, res) => {
  const { id } = req.params

  const job = jobs.find((job) => job.id === id)

  if (!job) return res.status(404).json({ message: 'Job Not Found' })

  return res.json(job)
})

app.post('/jobs', (req, res) => {
  const { title, company, location, description, data, content } = req.body

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

  return res.status(201).json(newJob)
})

// Fully replace a resource
app.put('/jobs/:id', (req, res) => {
  const { id } = req.params
  const { title, company, location, description, data, content } = req.body

  const jobIndex = jobs.findIndex((job) => job.id === id)

  if (jobIndex === -1) return res.status(404).json({ message: 'Job Not Found' })

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

  return res.status(200).json(updatedJob)
})

// Partially update a resource
app.patch('/jobs/:id', (req, res) => {
  const { id } = req.params
  const updates = req.body

  const job = jobs.find((job) => job.id === id)

  if (!job) {
    return res.status(404).json({ message: 'Job Not Found' })
  }

  for (const [key, value] of Object.entries(updates)) {
    if (key === 'id') continue

    const isNestedObject = ['data', 'content'].includes(key)

    if (isNestedObject && value && typeof value === 'object') {
      Object.assign(job[key], value)
    } else {
      job[key] = value
    }
  }

  return res.status(200).json(job)
})

app.delete('/jobs/:id', (req, res) => {
  const { id } = req.params

  const jobIndex = jobs.findIndex((job) => job.id === id)

  if (jobIndex === -1) return res.status(404).json({ message: 'Job Not Found' })

  jobs.splice(jobIndex, 1)

  return res.status(200).send()
})

app.listen(PORT, () => {
  console.log(`✅ Server's up at http://localhost:${PORT}`)
})
