const stream = require('stream')
const { Readable, Writable } = stream

// 想要生成一个新的class, 继承stream的api
class TCPConnect extends Readable {
  constructor(){

  }

  _read(size){

  }
}
class TCPConnect extends Writable {
  _write(chunk, encoding, done){
    
  }
}
class TCPConnect extends Duplex {
  constructor(){}
  _read(size){
    // stream 使用者需要数据时
  }
  _write(chunk, encoding, done){
    // stream被其他使用者输入数据时, 处理写入的数据
  }
}


class Compress extends Transform{
  constructor(){}
  
}

// var myrs = new Readable({
//   highWaterMark: 20,
//   read(size){
//     setTimeout(() => {
//       // slice ?
//     var char = Math.random().toString().slice(2, 3)
//     this.push(char)
//   }, 100)
//   }
// })

// myrs.on('data', data => {
//   console.log(data)
// })


// var myws = new Writable({
//   highWaterMark: 20,
//   write(chunk, encoding, done){
//     setTimeout(() => {
//       console.log(chunk.toString())
//       done()
//     }, 500)
//   }
// })


// myrs.on('pause', () => {
//   console.log('rs paused')
// })

// myws.on('drain', () => {
//   console.log('ws drain')
// })

// myrs.pipe(myws)