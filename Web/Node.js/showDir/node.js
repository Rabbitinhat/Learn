const fs = require('fs')

function readFilePromise(path){
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if(err) reject(err)
      else resolve(data)
    })
  })
}

function writeFilePromise(path, content){
  return new Promise((resolve, reject) => {
    fs.writeFile(path, content, (err, data) => {
      if(err) reject(err)
      else resolve(data)
    })
  })
}

// 将异步函数转换为返回promise object
function promisefy(f){
  return function(...args){
    return new Promise((resolve, reject) => {
      f(...args, (err, data) => {
        if(err) reject(err)
        else resolve(data)
      })
    })
  }
}

function callbackfy(promiseBased){
  return function(...args){
    var cb = args.pop()
    promiseBased(...args).then(val => {
      cb(null, val)
    }, reason => {
      cb(reason)
    })
  }
}


