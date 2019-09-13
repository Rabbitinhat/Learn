var fs = require('fs')

var entry = './prime1000.js'

var modFuncCache = {}

debugger
loadAll(entry)
debugger

// 將保存的函數對象轉換為可執行的字符串形式
var moduleMapSource = JSON.stringify(modFuncCache, function(key, val){
  if(typeof val === 'function'){
    return '#####' + val.toString() + '#####'
  }else{
    return val
  }
}, 2)
.replace(/['"]#####|#####['"]/g, '')
.replace(/\\n/g, '\n')
.replace(/\\r/g, '\n')

// 拼接可執行文件
var outputPacked = `
(function(){
  var seajs = {
    use: function(entry){
      // 加载并保存所有文件及其依赖(字符串形式)loadAndSaveFileAndItsDependencies
        require(entry)
    }
  }

  // 暴露出seajs
  window.seajs = seajs
  var modFuncCache = ${moduleMapSource}
  var moduleCache = {}

  // 同步操作
  function require(path){
    // 缓存中存在已导出的模块对象, 直接读取缓存中保存的模块对象
    // 解决循环依赖问题
    if(moduleCache[path]){
      return moduleCache[path]
    }
    // 读取缓存中存储的源代码
    var modFunction = modFuncCache[path]
    // var modFunc = new Function('module, exports, require', code)
    var module = {exports: {}}
    modFunction(require, module.exports, module)
    // 保存已导出的模块对象
    moduleCache[path] = module.exports
    return module.exports
  }
})()
`

fs.writeFileSync('bundle.js', outputPacked)


function loadAll(path){
  var code = fs.readFileSync(path).toString()
  var modFunc = new Function('require, exports, module', code)
  modFuncCache[path] = modFunc
  var deps = getDeps(code)
  deps.forEach(dep => {
    loadAll(dep)
  })
}

function getDeps(sourceCode){
  var deps = sourceCode.match(/require\s*\((['"])(.*)(\1)\s*\)/g)
  if(deps){
    return deps.map((dep) => dep.match(/require\s*\((['"])(.*)(\1)\s*\)/)[2])
  }else{
    return []
  }
}