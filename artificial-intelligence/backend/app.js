import express from 'express'
import { corsMiddleware } from './middlewares/cors.js'
import { jobsRouter } from './routes/jobs.js'
import { loggerMiddleware } from './middlewares/logger.js'
import { aiRouter } from './routes/ai.js'

const PORT = process.env.PORT || 1234
const app = express()

app.set('trust-proxy', 1) // Trust the first reverse proxy so Express can read the real client IP/protocol from forwarded headers

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

app.use('/ai', aiRouter)

if (!process.env.NODE_ENV) {
  app.listen(PORT, () => {
    console.log(`✅ Server's up at http://localhost:${PORT}`)
  })
}

export default app
