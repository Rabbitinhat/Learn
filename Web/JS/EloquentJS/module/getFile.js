// @ts-check

// 将module.exports的内容修改为通过指定路径读取的函数/对象
function require(path){
  var code = readFileContent(path)
  var modFunc = new Function('moudle, exports', code)
  // REVIEW 
  // 收集导出的值
  // 导出module.exports
  var module = {exports: {}}
  modFunc(module, module.exports)
  return module.exports
}


function readFileContent(path){
  // 读取并返回文件内容
  // 读取文件耗时很长, 特别是加载大量模块时
  // readFileSync同步操作, 读取文件字节
  // readFile(path, callback(err, data){do something}) 异步读取文件
  // readFileContent(path, whendone) => (readFile)callback( whenDone(data.toString()) )
  // 异步具有传染性, 内部使用异步函数时, 外层函数都要使用异步函数
  return fs.readFileSync(path).toString()
}

// 从网络上读取文件内容
// function readWebFile(path){
//   var req = new XMLHttpRequest()
  // 避免异步传染性, 使用同步操作
  // 但是加载大量内容耗时很长(比本地读取耗时更长), 同时会冻结JS的加载.
  // 使用异步则需要考虑传染性
  // 异步加载, 同步返回
  // require的返回需要同步
  // sea.js
//   req.open('get', path, false)
//   req.send()
//   return req.responseText
// }


