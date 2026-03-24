import express from 'express'
import rootRateLimit from './middlewares/rate-limit.js'

const app = express()
const PORT = process.env.PORT ?? 3000

app.use(express.json())

app.get('/', rootRateLimit, (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  })
})

app.get('/health', (req, res) => {
  res.json({
    status: 'ok'
  })
})

app.listen(PORT, () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`)
})

export default app
