const fs = require('fs')
const fs_p = fs.promises

function listAllFilesSync(path){
  var result = []
  let stats = fs.statSync(path)
  if(stats.isFile()){
    return [path]
  }else{
    let files = fs.readdirSync(path)
    files.map(file => {
      let newPath = path + '/' + file
      // result = result.concat(listAllFilesSync(newPath))
      result.push(...listAllFilesSync(newPath))
    })
    return result
  }
}

console.log(listAllFilesSync('./'))

// return 为then的返回值
function listAllFilesPromise(path){
  var result = []
  return fs_p.stat(path).then((stats) => {
    if(stats.isFile()){
      return [path]
    }else{
      return fs_p.readdir(path).then(files => {
        //? 将含有promise, 和原生数据的数据转换为正常数组
        // 等待每个数据执行完后(包括原始数据和promise(返回后)), 才会执行then, 传入全部数据(array形式)
        return  Promise.all(files.map(file => {
          var newPath = path + '/' + file
          return listAllFilesPromise(newPath)
        }))
        })  
      }
    })
    // Promise.all 与 [path]同样返回数组
    .then(arrays => {
      // arrays => [Array(1), Array(1), Array(1)]
      // 展开一层数组
      return result.concat(...arrays)
    })
}

listAllFilesPromise('./').then(console.log)

function listAllFilesAsync(path, cb){
  
  fs.stat(path, (err, stats) => {
    if(stats.isFile()){
      cb([path])
    }else{
      fs.readdir(path, (err, datas) => {
        var result = []
        var count = 0
        datas.map(data => {
          let newPath = path + '/' + data
          listAllFilesAsync(newPath, (files) => {
            result.push(...files)
            count++
            // 计数, 当子文件夹都加载完后, 调用上一级函数的callback
            if(count === datas.length){
              cb(result)
            }
          })
        })
      })
    }
  })
}

listAllFilesAsync('./', (result) => {
  console.log(result)})