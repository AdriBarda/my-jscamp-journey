import express from 'express'
import { corsMiddleware } from './middlewares/cors.js'
import { jobsRouter } from './routes/jobs.js'
import { loggerMiddleware } from './middlewares/logger.js'

process.loadEnvFile()
const PORT = process.env.PORT || 1234
const app = express()

app.use(loggerMiddleware)
app.use(corsMiddleware())

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

app.use('/jobs', jobsRouter)

app.listen(PORT, () => {
  console.log(`✅ Server's up at http://localhost:${PORT}`)
})
