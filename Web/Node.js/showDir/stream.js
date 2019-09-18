const fs = require('fs')

var file = '185.mp3'
var sign = 'running'
fs.readFile(file, (err, data) => {
  if(err) console.log(err)
  fs.writeFile('4.mp3', data, () => {
    sign = 'done'
    console.log('done')
  })
})

setInterval(() => {
  if(sign === 'running'){
    // rss 属性 显示数据占用量
  console.log(process.memoryUsage())
  }
})


const fs = require('fs')

var file = ''

var rs = fs.createReadStream(file)
var ws = fs.createWriteStream('', {
  // option 最大内存占用
  // write(data), drain 已该值为准
  highWaterMark: 65536,
})

rs.on('data', data => {
  // 内存已满, 暂停写入
  // 不暂停时, 会继续进行读取, 使得内存占用高于highWaterMark的限制
  // .write(data) 表示内存是否已满
  if(ws.write(data) === false){
    // 暂停读取数据
    rs.pause()
  }
})

// rs.on('end', () => {
//   ws.end()
// })
// drain '枯竭' 占用内存为空, 需要继续读取
ws.on('drain', () => {
  // 继续开始读取数据
  rs.resume()
})

// 简单写法
// rs(可读流)中读取的数据直接传输到ws(可写流)中
rs.pipe(ws)

rs.on('data', data => {
  if(compressStream.write(data) === false){
    rs.pause()
  }
})

// rs.on('drain', data => {
//   if()
// })

compressStream.on('data', data => {
  
})

ReadableStream.prototype.pipe = function(writable){
  var rs = this
  this.on('data', data => {
    if(writable.write(data) === false){
      rs.pause()
    }
  })
  this.on('end', () => {
    writable.end()
  })
  this.on('drain', () => {
    rs.resume()
  })

  return writable
}