import { test, describe, before, after } from 'node:test'
import assert from 'node:assert'
import app from './app.js'
import { resolve } from 'node:path'
let server
const PORT = 3456
const BASE_URL = `http://localhost:${PORT}`

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
