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



async function listAllFilesAwait(path){
  var result = []
  let stats = await fs_p.stat(path)
  if(stats.isFile()){
    return [path]
  }else{
    let entries = await fs_p.readdir(path)

    // for(let entry of entries){
    //    let newPath = path + '/' + entry
    //    let file = await listAllFilesAwait(newPath)
    //    result.push(...file)
    // }
    // 为每个文件创建异步函数(未执行, 开始调用)
    var entryPromises = entries.map((entry) => {
      let newPath = path + '/' + entry
      return listAllFilesAwait(newPath).then(files => {
        result.push(result)
      })
    })

    // // 等待每个异步返回
    // // ? Promise.all 返回数组 [[path]]
    // // Promise.all要等待数组中全部的promise object完成后才会返回
    // var entryValue = await Promise.all(entryPromises)
    // return result.push(...[].concat(entryValue))
    return [].concat(...result)
  }
}



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



function listAllFilesAsync(path, cb){
  
  fs.stat(path, (err, stats) => {
    if(stats.isFile()){
      cb([path])
    }else{
      fs.readdir(path, (err, datas) => {
        var result = []
        var count = 0
        if(datas.length === 0) cb([])
        else{
          datas.forEach(data => {
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
      }
      })
    }
  })
}



// listAllFilesAwait('./').then((files) => {
//   console.log('Await', files)
// })

// listAllFilesPromise('./').then((files) => {
//   console.log('Promise', files)
// })

// listAllFilesAsync('./', (val) => {
// console.log('Callback', val)
// })

console.log('Sync', listAllFilesSync('./'))