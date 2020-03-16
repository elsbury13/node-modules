const http = require('http')
const url = require('url')

const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 8080

const server = http.createServer((req, res) => {
  if (req.method !== 'GET') return error(res, 405)
  if (req.url === '/') return index(res)
  const { pathname, query } = url.URL(req.url, true)
  if (pathname === '/users') return users(query, res)
  error(res, 404)
})

const userList = [
  {'id': 1, 'first_name': 'Bob', 'last_name': 'Smith', 'type': 'red'},
  {'id': 2, 'first_name': 'Jane', 'last_name': 'Smith', 'type': 'blue'}
]

function users ({ type }, res) {
  const list = !type
    ? userList
    : userList.filter((user) => user.type === type)
  res.end(`{"data": ${JSON.stringify(list)}}`)
}

function index (res) {
  res.end('{"name": "my-test-server", "version": 0}')
}

function error (res, code) {
  res.statusCode = code
  res.end(`{"error": "${http.STATUS_CODES[code]}"}`)
}

server.listen(port, host)
