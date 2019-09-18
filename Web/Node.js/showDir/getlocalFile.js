const http = require("http");
const fs = require("fs");
const path = require("path");

const port = 8090;
const baseDir = __dirname;

const type = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".ico": "image/icon",
  ".md": "text/markdown"
};

const server = http.createServer((req, res) => {
  var targetPath = path.join(baseDir, req.url);
  console.log(targetPath)
  fs.stat(targetPath, (err, stat) => {
    if (err) {
      res.writeHead(404, {
        "Content-Type": `${type[".html"]}; charset=utf-8`
      });
    } else if (stat.isFile()) {
      var ext = path.extname(targetPath)
      fs.readFile(targetPath, (err, data) => {
        res.writeHead(200, {
          'Content-Type': `${type[ext]}; charset=utf-8`
        })
        res.end(data);
      });
    }else if(stat.isDirectory()){
      var indexPath = path.join(targetPath, 'index.html')
      fs.stat(indexPath, (err, stat) => {
        if(err){
          // index.html not exist
          if(!req.url.endsWith('/')){
            res.writeHead(301, {
              'Location': req.url + '/'
            })
            res.end()
            return
          }
          fs.readdir(targetPath, {withFileTypes: true}, (err, entries) => {
            res.writeHead(200, {
              'Content-Type': `${type['.html']}; charset=utf-8`
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
          })
        }else{
          fs.readFile(indexPath, (err, data) => {

          })
        }
      })
    }
  });
});

server.listen(port, () => {
  console.log('server listening on port', port)
})
