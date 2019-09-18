const stream = require('stream')
const {Readable, Writable} = stream

var myrs = new Readable({
  highWaterMark: 5,
  read(size){
    setTimeout(() => {
      // 将随机数转换为16进制, 获取0-f字符
      var char = Math.random().toString(16). slice(2, 3)
      // 读取数据, 不限来源
      this.push(char)
    }, 50)
  }
})

var myws = new Writable({

  write(chunk, encoding,  done){
    setTimeout(() => {
      console.log(chunk.toString())
      done()
    }, 1000)
  }
})


myrs.on('pause', () => {
  console.log('myrs paused')
})
myrs.on('resume', () => {
  console.log('myrs resumed')
})
myws.on('drain', () => {
  console.log('memory drain')
})

myrs.pipe(myws)
