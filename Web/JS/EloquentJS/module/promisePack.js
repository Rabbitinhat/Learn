function readFile2(path) {
  return new Promise(resolve => {
    readFile2(path, content => {
      resolve(content);
    });
  });
}

function loadAll2(path) {
  readFile2(path).then(moduleFunction => {
    modFuncCache[path] = moduleFunction;
    var deps = getDeps(moduleFunction.toString());
    return Promise.all(deps.map(loadAll2));
  });
}

// Promise.all
// parameter: Promise组成的数组
// 全部Promise成功后, 成功返回一个promise

Promise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected);
};

Array.prototype.copy = function() {
  return this.slice(0, this.length);
};

Promise.resolve = function(resolve) {
  return new Promise(() => {
    resolve();
  });
};

Promise.all = function(promises) {
  return new Promise((resolve, reject) => {
    var result = []
    var resolvedCount = 0
    for(var i=0; i<promises.length; i++){
      promises[i].then(val => {
        result[i] = val
        resolvedCount++
        if(resolvedCount === promises.length){
          resolve(result)
        }
      }, reason => {
        reject(reason)
      }
      )
    }
  });
};

Promise.race = function(values){
  return new Promise((resolve, reject) =>{
    for(var i=0; i<values.length; i++){
      Promise.resolve(values[i]).then(resolve, reject)
    }
  })
}