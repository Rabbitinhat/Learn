(function(){
  var seajs = {
    use: function(entryPath){
      // 加载并保存所有文件及其依赖(字符串形式)loadAndSaveFileAndItsDependencies
        require(entryPath)
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

var moduleCache = {}

// 加載全部模塊, 將代碼存放在一個對象中
var modFuncCache = {
  "./prime1000.js": function(require, exports, module){
      var isPrime = require('./is_Prime.js')
    
    console.log('in 1000')
    for(let i=0; i<1000; i++){
        if(isPrime(i)){
          console.log(i)
      }
  }
  
},
  "./is_Prime.js": function(require, exports, module){
      var isPrime = function(n) {
        if (n < 2) {
          return false;
      }
    
      var sqrt_n = Math.floor(Math.sqrt(n));
    
      for (var i = 2; i <= sqrt_n; i++) {
          if (n % i == 0) {
            return false;
        }
    }
    
      return true;
  };
    
    module.exports = isPrime
}
}})()