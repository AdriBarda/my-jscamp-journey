import { test, describe, before, after } from 'node:test'
import assert from 'node:assert'
import app from './app.js'
let server
const PORT = 3456
const BASE_URL = `http://localhost:${PORT}`

function buildJob(overrides = {}) {
  return {
    title: 'Frontend Developer',
    company: 'TechNova Solutions',
    location: 'Remote',
    description:
      'We are looking for a frontend engineer passionate about building modern interfaces using React and TypeScript.',
    data: {
      technology: ['react', 'javascript', 'typescript', 'css'],
      location: 'Remote',
      experience: 'mid'
    },
    content: {
      description:
        'You will work primarily with React, writing scalable TypeScript code and crafting responsive UI components.',
      responsibilities:
        'Develop reusable UI components, optimize JavaScript performance, collaborate with backend teams.',
      requirements:
        'Solid experience with React and TypeScript, strong JavaScript fundamentals, understanding of REST APIs.',
      about:
        'TechNova Solutions is a fast-growing SaaS company focused on digital transformation products.'
    },
    ...overrides
  }
}

async function postJob(job) {
  return fetch(`${BASE_URL}/jobs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(job)
  })
}

async function patchJob(id, job) {
  return fetch(`${BASE_URL}/jobs/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(job)
  })
}

before(async () => {
  return new Promise((resolve, reject) => {
    server = app.listen(PORT, () => resolve())
    server.on('error', reject)
  })
})

after(async () => {
  return new Promise((resolve, reject) => {
    server.close((err) => {
      if (err) return reject(err)
      resolve()
    })
  })
})

describe('GET /jobs', () => {
  test('has to respond with 200 and a jobs array', async () => {
    const response = await fetch(`${BASE_URL}/jobs`)
    assert.strictEqual(response.status, 200)

    const json = await response.json()
    assert.ok(Array.isArray(json.data), 'Response must be an array')
  })

  test('Must filter jobs by tech', async () => {
    const tech = 'react'
    const response = await fetch(`${BASE_URL}/jobs?technology=${tech}`)
    assert.strictEqual(response.status, 200)

    const json = await response.json()
    assert.ok(
      json.data.every((job) => job.data.technology.includes(tech)),
      `Jobs technology must match provided technology filter: ${tech}`
    )
  })

  test('Must filter jobs by location', async () => {
    const location = 'Barcelona'
    const response = await fetch(`${BASE_URL}/jobs?location=${location}`)
    assert.strictEqual(response.status, 200)

    const json = await response.json()
    assert.ok(
      json.data.every((job) => job.data.location.includes(location.toLowerCase())),
      `Jobs location must match provided location filter: ${location}`
    )
  })

  test('Must filter jobs by experience', async () => {
    const experience = 'senior'
    const response = await fetch(`${BASE_URL}/jobs?experience=${experience}`)
    assert.strictEqual(response.status, 200)
    const json = await response.json()
    assert.ok(
      json.data.every((job) => job.data.experience.includes(experience)),
      `Jobs experience must match provided experience filter: ${experience}`
    )
  })
})

describe('POST /jobs', () => {
  test('creates a job when payload is valid', async () => {
    const response = await postJob(buildJob())
    assert.strictEqual(response.status, 201)

    const json = await response.json()
    assert.strictEqual(json.title, 'Frontend Developer')
    assert.strictEqual(json.company, 'TechNova Solutions')
    assert.ok(json.id)
  })

  test('rejects a job when a required field is missing', async () => {
    const job = buildJob()
    delete job.company

    const response = await postJob(job)
    const json = await response.json()

    assert.strictEqual(response.status, 400)
    assert.strictEqual(json.error, 'Invalid request')
  })

  test('rejects a job when experience is invalid', async () => {
    const response = await postJob(
      buildJob({
        data: {
          technology: ['react', 'javascript', 'typescript', 'css'],
          location: 'Remote',
          experience: 'expert'
        }
      })
    )
    const json = await response.json()

    assert.strictEqual(response.status, 400)
    assert.strictEqual(json.error, 'Invalid request')
  })
})

describe('PATCH /jobs', () => {
  test('updates only the provided fields', async () => {
    const createdResponse = await postJob(buildJob())
    const createdJob = await createdResponse.json()

    const response = await patchJob(createdJob.id, {
      title: 'Senior Frontend Developer',
      data: {
        experience: 'senior'
      }
    })

    assert.strictEqual(response.status, 200)

    const json = await response.json()
    assert.strictEqual(json.id, createdJob.id)
    assert.strictEqual(json.title, 'Senior Frontend Developer')
    assert.strictEqual(json.company, createdJob.company)
    assert.strictEqual(json.data.experience, 'senior')
    assert.deepStrictEqual(json.data.technology, createdJob.data.technology)
  })

  test('rejects an empty patch body', async () => {
    const createdResponse = await postJob(buildJob())
    const createdJob = await createdResponse.json()

    const response = await patchJob(createdJob.id, {})
    const json = await response.json()

    assert.strictEqual(response.status, 400)
    assert.strictEqual(json.message, 'No fields to update')
  })

  test('rejects invalid partial data', async () => {
    const createdResponse = await postJob(buildJob())
    const createdJob = await createdResponse.json()

    const response = await patchJob(createdJob.id, {
      data: {
        experience: 'expert'
      }
    })
    const json = await response.json()

    assert.strictEqual(response.status, 400)
    assert.strictEqual(json.error, 'Invalid request')
  })
})
