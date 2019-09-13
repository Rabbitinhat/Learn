(function(){
  var seajs = {
    use: function(entryPath){
      // 加载并保存所有文件及其依赖(字符串形式)loadAndSaveFileAndItsDependencies
      loadAll(entryPath, ()=>{
        require(entryPath)
      } )
    }
  }

  // 暴露出seajs
  window.seajs = seajs

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

  // 模块导出对象的缓存
  var moduleCache = {}
  // 保存源代码
  // var sourceCode = {}
  // 模块函数缓存
  var modFuncCache = {}


  // 给定文件路径, 加载其内容及其依赖的所有文件的内容并缓存
  // 完成后调用callback, 通知加载已经完成
  // 加载源代码(将代码存入modFuncCache中)

  function loadAll(path, callback){
    readFile2(path, (moudleFunction) => {
      modFuncCache[path] = moudleFunction
      var deps = getDeps(moudleFunction.toString()) //=> ['digit-width.js', 'power.js']
      // 当加载的依赖数量为0时, 直接调用callback
      if(deps.length === 0){
        callback()
        return
      }
      // 记录加载文件的次数
      var loadedCount = 0
      deps.forEach(dep => {
        // 此时loadAll是在dep加载完后使用
        // path指向的资源和全部依赖加载完毕后, 调用callback
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

  var tmpSourceCode
  window.define = function(f){
    // 取得调用f的源代码
    tmpSourceCode = f
  }

  // 给定文件路径, 并传入文件内容
  function readFile2(path, done){
    var script = document.createElement('script')
    script.addEventListener('load', function(){
      // 通过创建script标签, 调用跨域的js资源, 将跨域的js中调用defined函数
      // 通过调用defined函数取得跨域js的代码
      // script运行=>window.define()运行, 取得源代码=>script.onload
      document.head.removeChild(script)
      done(tmpSourceCode)
    })
    script.src = path
    document.head.appendChild(script)
  }
}())
