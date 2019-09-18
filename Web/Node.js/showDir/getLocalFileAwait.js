const http = require("http");
const fsp = require("fs").promises;
const path = require("path");
const mime = require('mime-types')

const port = 8090;
const baseDir = path.resolve('./');

const server = http.createServer(async (req, res) => {
  var targetPath = path.join(baseDir, req.url)

  if(!targetPath.startsWith(baseDir)){
    res.end()
    return
  }

  try {
    var stat = await fsp.stat(targetPath)
    if(stat.isFile()){
      var ext = path.extname(targetPath)
      // readFile 一次性 读出全部的文件内容
      // 当读取大容量文件时，耗费大量时间和空间
      // 使用stream可以将文件分段传输
      var data = await fsp.readFile(targetPath)
      res.writeHead(200, {
        'Content-Type': `${mime.lookup(ext)}; charset=utf-8`
      })
      res.end(data)
    }else if(stat.isDirectory()){
      var indexPath = path.join(targetPath, 'index.html')
      try {
        var indexContent = await fsp.readFile(indexPath)
        res.end(indexContent)
      }catch(e){
        if(!req.url.endsWith('/')){
          res.writeHead(301, {
            'Location': req.url + '/'
          })
          res.end()
          return
        }
        var entries = await fsp.readdir(targetPath, {withFileTypes: true})
        res.writeHead(200, {
          'Content-Type': `text/html; charset=utf-8`
        })
        res.end(`
        ${
          entries.map(entry => {
            var slash = entry.isDirectory() ? '/' : ''
            return `
              <div>
                <a href="${entry.name}${slash}">${entry.name}${slash}</a>
              </div>
            `
          }).join('')
        }
        `)
      }
    }
  }catch(e){

  }
})

server.listen(port, () => {
  console.log('server listening on port', port)
})