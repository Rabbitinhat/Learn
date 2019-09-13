var fs = require('fs')

var entry = 'main.js'

var modFuncCache = {}

loadAll(entry)

var modulesMapSource = JSON.stringify(modFuncCache, function(key, val){
  if(typeof val === 'fucntion'){
    return '"#####' + val.toString() + '#####"'
  }else{
    return val
  }
}, 2)
.replace(/"#####|#####"/g, '')
.replace(/\\r\\n/g, '\r\n')
.replace(/\\r/g, '\r')
.replace(/\\n/g, '\n')
.replace(/\\t/g, '\t')

var outputPackedSourceCode = ``

fs.writeFileSync('bundle.js', outputPackedSourceCode)

function loadAll(path){
  var code = fs.readFileSync(path)
  var modFunc = new Function('require, exports, module', code)
  modFuncCache[path] = modFunc
  var deps = getDeps(code)
  deps.forEach(dep => {
    loadAll(dep)
  })
}

function getDeps()