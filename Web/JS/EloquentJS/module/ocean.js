(function(){
  var seajs = {
    use: function(entryPath){
      // 加载并保存所有文件及其依赖(字符串形式)loadAndSaveFileAndItsDependencies
      loadAll(entryPath, ()=>{
        require(entryPath)
      } )
    }
  }

  window.seajs = seajs

  // 同步操作
  function require(path){
    // 缓存中存在已导出的模块对象, 直接读取缓存中保存的模块对象
    if(moduleCache[path]){
      return moduleCache[path]
    }
    // 读取缓存中存储的源代码
    var code = sourceCache[path]
    var modFunc = new Function('module, exports, require', code)
    var module = {exports: {}}
    modFunc(module, module.exports, require)
    // 保存已导出的模块对象
    moduleCache[path] = module.exports
    return module.exports
  }

  // 模块导出对象的缓存
  var moduleCache = {}
  // 保存源代码
  var sourceCache = {}


  // 给定文件路径, 加载其内容及其依赖的所有文件的内容并缓存
  // 完成后调用callback, 通知加载已经完成
  // 加载源代码(将代码存入sourceCache中)
  function loadAll(path, callback){
    readFile(path, (sourceCode) => {
      sourceCache[path] = sourceCode
      var deps = getDeps(sourceCode) //=> ['digit-width.js', 'power.js']
      // 当加载的依赖数量为0时, 直接调用callback
      if(deps.length === 0){
        callback()
        return
      }
      // 记录加载文件的次数
      var loadedCount = 0
      deps.forEach(dep => {
        loadAll(dep, () => {
          loadedCount++
          if(loadedCount == deps.length){
            // 加载次数为deps.length时(全部加载), 才会调用外部loadAll的callback
            // 
            callback()
          }
        })
      })

    })
  }

  // 给定一份源代码, 返回其依赖
  // 即每个require调用的参数组成的数组
  // require   (   'foo.js'   )
  // 获取源代码中的依赖(require语句中参数)
  // 可以分离为单独功能的代码就封装为函数
  function getDeps(sourceCode){
    // 拿到代码中的require语句
    var requireCalls = sourceCode.match(/require\s*\(\s*(['"])(.+)(\1)\s*\)/g)
    if(requireCalls){
      // 获得require语句中的path
      return requireCalls.map(call => {
        // console.log(call)
        return call.match(/require\s*\(\s*(['"])(.+)(\1)\s*\)/)[2]
        // console.log(requireFile)
        // return requireFile[2]
      })
    }else{
      // 没有require语句则返回[]
      return []
    }
  }

  // 给定文件路径, 并传入文件内容
  function readFile(path, done){
    var req = new XMLHttpRequest
    req.open('get', path)
    req.addEventListener('load', () => {
      done(req.responseText)
    })
    req.send()
  }
}())