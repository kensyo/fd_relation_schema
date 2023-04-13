const http = require('http')
const fs = require('fs')
const path = require('path')
const url = require('url')

const port = 8000
const docRoot = './docs'

const server = http.createServer((req, res) => {
  const reqUrl = url.parse(req.url)
  const filePath = path.join(
    docRoot,
    reqUrl.pathname === '/' ? 'index.html' : reqUrl.pathname
  )

  fs.stat(filePath, (err, stat) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/plain')
        res.end('404 Not Found\n')
      } else {
        res.statusCode = 500
        res.setHeader('Content-Type', 'text/plain')
        res.end('500 Internal Server Error\n')
      }
      return
    }

    if (stat.isFile()) {
      const ext = path.extname(filePath).substring(1)
      const contentType = getContentType(ext)

      res.statusCode = 200
      res.setHeader('Content-Type', contentType)

      const stream = fs.createReadStream(filePath)
      stream.pipe(res)
    } else {
      res.statusCode = 403
      res.setHeader('Content-Type', 'text/plain')
      res.end('403 Forbidden\n')
    }
  })
})

server.listen(port, () => {
  console.log(`Server running at port ${port}`)
})

function getContentType(ext) {
  const contentTypes = {
    html: 'text/html',
    css: 'text/css',
    js: 'application/javascript',
    json: 'application/json',
    txt: 'text/plain',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    svg: 'image/svg+xml',
  }

  return contentTypes[ext] || 'application/octet-stream'
}
