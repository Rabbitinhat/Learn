var fs = require('fs')

var entry = 'main.js'

// 作为缓存?
var modFuncCache = {}

loadAll(entry)


// 加载并运行文件源码(?)
let outputPackedSourceCode = `
(function(){
  function require(path){
    if(moduleCache[path]){
      return moduleCache[path]
    }
    let modFunc = modFuncCache[path]
    let module = {export: {}}
    modFunc(require, module.exports, module)
    moduleCache[path] = module.exports
    return module.exports
  }

    let moduleCache = {}
    let modFuncCache = ${getObjSource(modFuncCache)}

    require('${entry}')
}())
`
// 将结果写入bundle.js
fs.writeFileSync('bundle.js', outputPackedSourceCode)

// 将对象中的代码转换为字符串
function getObjSource(obj){
  let objSource = '{'
  for(let key in obj){
    let val = obj[key]
    // 简单对象, 对象内不包含obj
    objSource += '"' + key + '": ' + val.toString() + ',\n'
  }
  objSource = objSource.slice(0, -2) // ',\n'
  objSource += '}'
  return objSource
}

function loadAll(path){  
  let code = fs.readFileSync(path).toString()
  let modFunc = new Function('require, exports, module', code)
  // 存入缓存
  modFuncCache[path] = modFunc
  let deps = getDeps(code)
  des.forEach(dep => {
    loadAll(dep)
  })
}

function getDeps(sourceCode){
  // 拿到所有require语句
  let requireCalls = sourceCode.match(/require\s*\(\s*(['"])([^'"]*)\1\s*\)/g)

  if(requireCalls){
    return requireCalls.map(call => {
      // [2] 第一个匹配项
      return call.match(/require\s*\(\s*(['"])([^'"]*)\1\s*\)/)[2]
    })
  }else{
    return []
  }
}