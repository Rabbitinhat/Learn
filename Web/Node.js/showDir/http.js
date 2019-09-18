const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')
const server = http.createServer()
const port = 8080

const base = './'

var type = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.ico': 'image/icon'
}

server.on('request', (req, resp) => {
  let reqpath = url.parse(req.url).path
  console.log(`getPath from ${reqpath}`)
  console.log(req.url)
  var stats = fs.statSync(path.join(base + reqpath))
  if(stats.isFile()){
    var files = fs.readFileSync(base + reqpath, 'utf-8')
    var ext = path.extname(reqpath)
    console.log(ext)
    resp.writeHead(200, {
      'Content-Type': `${type[ext]}; charset=utf-8`
    })
    resp.write(`
    ${files}
    `)
  }else{
    var dirs = fs.readdirSync(base + reqpath, 'utf-8')
    console.log(dirs)
    if(dirs.indexOf('index.html') === -1){
      resp.writeHead(200, {
        'Content-Type': `${type['.html']}; charset=utf-8`
      })
      resp.write(`
        <ul>
          ${dirs.map(dir => {
            return '<li>' + dir + '</li>'
          }).join('')}
        </ul>
      `)
    }else{
      var files = fs.readFileSync(base + reqpath + '/index.html', 'utf-8')
      resp.writeHead(200, {
        'Content-Type': `${type['.html']}; charset=utf-8`
      })
      resp.write(`
      ${files}
      `)
    }
  }
  resp.end()
})

server.listen(port, () => {
  console.log('server listening on port', port)
})