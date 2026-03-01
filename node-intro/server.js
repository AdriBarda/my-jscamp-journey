import { randomUUID } from 'node:crypto'
import { createServer } from 'node:http'
import { json } from 'node:stream/consumers'

process.loadEnvFile()
const port = process.env.PORT ?? 3000

function setJson(res, statusCode, data) {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(data))
}

const users = [
  {
    id: 1,
    name: 'adribarda'
  },
  {
    id: 'c33a5e6a-e60b-4f9b-bb8c-3785b677433a',
    name: 'lasania'
  }
]

const server = createServer(async (req, res) => {
  const { method, url } = req

  const [pathname, queryString] = url.split('?')

  const searchParams = new URLSearchParams(queryString)

  if (method === 'GET') {
    if (pathname === '/health') {
      return setJson(res, 200, { status: 'ok', uptime: process.uptime() })
    }

    if (pathname === '/users') {
      const limit = Number(searchParams.get('limit')) || users.length
      const offset = Number(searchParams.get('offset')) || 0

      const paginatedUsers = users.slice(offset, offset + limit)

      return setJson(res, 200, paginatedUsers)
    }
  }

  if (method === 'POST') {
    if (pathname === '/users') {
      const body = await json(req)

      if (!body || !body.name) return setJson(res, 400, { error: 'Name Is Required' })

      const newUser = {
        id: randomUUID(),
        name: body.name
      }

      users.push(newUser)

      return setJson(res, 201, { message: 'User Created Successfully' })
    }
  }

  return setJson(res, 404, { message: 'Not Found' })
})

server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
