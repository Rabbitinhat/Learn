const fs = require('fs')
const zlib = require('zlib')

// options?
var compressStream = zlib.createGzip()

var file = './185.mp3'

var rs = fs.createReadStream(file)
var ws = fs.createWriteStream('./sayHi2.gz', {
  highWaterMark: 1024 * 1024 * 100
})

rs.on('data', data => {
  if(compressStream.write(data) === false){
    rs.pause()
  }
})

rs.on('end', () => {
  compressStream.end()
})

compressStream.on('drain', () => {
  compressStream.resume()
})

compressStream.on('data', data => {
  if(ws.write(data) === false){
    compressStream.pause()
  }
})

compressStream.on('end', () => {
  ws.end()
})
ws.on('drain', () => {
  compressStream.resume()
})

