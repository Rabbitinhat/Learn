const {Readable, Writable} = require('stream')
// fs 读取path的文件内容, 分段读取
const fs = require('fs')

exports.createReadStream = function createReadStream(path){
  // open 打开文件, 开始读取
  var fd  = fs.openSync(path, 'r')
  // 读取文件尺寸
  var fileStat = fs.statSync(path)
  var fileSize = fileStat.size
  // 初始读取位置
  var position = 0

  return new Readable({
  read(size){
    // 打开1024字节的缓存
    var buf = Buffer.alloc(1024)
    if(position >= fileSize ){
      // 停止读取
      this.push(null)
      fs.close(fd, err => {
        if(err){
          console.log(err)
        }
      })
    }else{
      fs.read(fd, buf, 0, 1024, position, (err, bytesRead) => {
        if(err){
          console.log(err)
          return 
        }
        if(bytesRead < 1024){
          // 剩余字符不足1024时, 全部读取
          this.push(buf.slice(0, bytesRead))
        }else{
          this.push(buf)
        }
      })
      position += 1024
    }
    }
  })
}

exports.createWriteStream = function createWriteStream(path){
  // 打开写入文件(flag 为 a+, 表示打开文件并写入, 如果文件不存在则创建)
  var fd = fs.openSync(path, 'a+')
  // 初始位置为0(应该可以通过文件状态读取)
  var position = 0

  // 创建新的写入流
  return new Writable({
    // 写入片段
    write(chunk, encoding, done){
      fs.write(fd, chunk, 0, chunk.length, position, () => {
        done()
      })
      // 更新写入的位置
      position += chunk.length
    }
  })
}

