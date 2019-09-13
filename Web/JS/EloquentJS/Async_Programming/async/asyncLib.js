async.map(
  [2, 3, 4, 5, 6],
  (coll, callback) => {
    setTimeout(() => {
      // ?
      callback(null, coll * coll);
    }, 5000);
  },
  (err, result) => {
    console.log(result);
  }
);

// async map
function myAsyncMap(ary, asyncMapper, callback) {
  // 返回一个新数组
  let result = [];
  for (let i = 0; i < ary.length; i++) {
    // 使用let可以避免闭包中引用问题

    let idx = i;
    asyncMapper(ary[idx], (err, mapped) => {
      console.log(idx);
      result[idx] = mapped;
      if (idx === ary.length - 1) {
        callback(null, ary);
      }
    });
  }
}

// FIXME
function myAsyncMap(ary, asyncMapper, callback) {
  let result = [];
  let count = 0;
  for (let i = 0; i < ary.length; i++) {
    asyncMapper(ary[idx], (err, mapped) => {
      result[i] = mapped;
      count++;
      if (count === ary.length) {
        callback(null, result);
      }
    });
  }
}

function myAsyncFilter(ary, filterFunc, callback){
  let result = []
  let idx = 0
  let count = 0
  for(let i=0; i<ary.length; i++){
    filterFunc(ary[i], (err, filter) => {
      if(filter){
        result[idx++] = ary[i]
      }
      count++
      if(count === ary.length){
        callback(err, result)
      }
    })
  }
}

function myAsyncEvery(ary, everyFunc, callback){
  if(ary.length === 0) callback([])
  let sign = true
  let count = 0
  for(let i=0; i<ary.length; i++){
    everyFunc(ary[i], (err, test) => {
      if(!test){
        sign = false
      }
      count++
      if(count === ary.length){
        callback(null, sign)
      }
    })
  }
}

myAsyncEvery([-1, 2, 3, 4], (item, callback) => {
  setTimeout(() => {if(item > 0){
    callback(null, true)
  }else{
    callback(null, false) 
  }}
  , 5000)}, (err, result) => {
  console.log(result)
})

// 进行limit操作
class Queue2 {
  constructor(maxParallel = 1){
    this.tasks = []
    this.runningCount = 0
    this.maxParallel = max
  }

  add(f){
    var next
    if(this.runningCount < this.maxParallel){
      this.runningCount++
      f(next = () => {
        if(this.tasks.length){
          var nextTask = this.tasks.shift()
          nextTask(next)
        }else{
          // 当任务队列为0
          // 取消掉runningCount的自增操作
          this.runningCount--
        }
      })
    }else{
      this.tasks.push(f)
    }
    return this
  }
}

// 使用Queue实现同一时间最多limit数量的回调执行
function myAsyncMapLimit(ary, limit, mapper, callback){
  let queue = new Queue2(limit)
  var result = []
  let count = 0
  for(let i=0; i<ary.length; i++){
    queue.add((next) => {
      mapper(ary[i], (err, item) => {
        result[i] = item
        count++
        if(count === ary.length){
          callback(result)
        }
        next()
      })
    })
  }
}

