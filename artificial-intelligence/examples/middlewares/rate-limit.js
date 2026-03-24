const RATE_LIMIT_WINDOW_MS = 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 10
const rateLimitStore = new Map()

const rootRateLimit = (req, res, next) => {
  const clientIp = req.ip
  const now = Date.now()
  const requestLog = rateLimitStore.get(clientIp)

  if (!requestLog || now > requestLog.resetAt) {
    rateLimitStore.set(clientIp, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS
    })

    return next()
  }

  if (requestLog.count >= RATE_LIMIT_MAX_REQUESTS) {
    return res.status(429).json({
      status: 'error',
      message: 'Too many requests',
      retryAfter: Math.ceil((requestLog.resetAt - now) / 1000)
    })
  }

  requestLog.count += 1
  return next()
}

export default rootRateLimit
