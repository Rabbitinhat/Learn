# Async

## Promise

promise
- 返回普通值
- 抛出错误
- 返回promise

Promise
- parameter `function(resolve, reject){}`
- return a new promise instance

promise.then
- parameter1 when resolve `function`
- parameter2 when reject `function`
- 两个函数以promise中传入resolve, reject的参数为参数
- return a new promise instance
- then可以进行链式调用
- 当then返回value时, 下一个then获取该value, 并且会立即执行; 而返回promsie时, 下一个then会等待当前promise处理完毕后才会执行
- 如果对应位置的函数缺失, 对应状态触发时?
  - 结果的状态为调用then的promise对象的状态
- p2 = p1.then() => p2 = p1.then(val => val, reason => throw reject)

## JavaScript Promise 简介

[promise](https://developers.google.com/web/fundamentals/primers/promises?hl=zh-cn)

img 事件
- complete
- loaded
- error

相对于事件监听
promise
- 只执行一次(成功/失败)
- 即使在事件发生前(?), 只要添加了正确的回调, 就会返回相应结果

promise
- promise相关操作成功执行
- 相关操作执行失败
- 还没有执行
- 执行完毕(不论成功或失败)


创建Promise
包含一个带有两个参数的callback
- resolve 当回调中的操作成功时调用并执行
- reject 当回调执行失败或被拒绝时, 调用并执行(通常会创建一个Error对象, 便于调试)


```js
var promise = new Promise(function(resolve, reject){
  // do something
  if(/*something successed, loaded*/){
    resolve(succeed)
  }else{
    reject(Error('fail'))
  }
})
```

promise.then 包含两个参数, 


```js
promise.then(function(result){
  // promise 调用resolve时
  console.log(result)
}, function(err){
  // promise调用reject时
  console.log(err)
})
```

then 的链式调用

Promise.catch()
- then(undefined, func)
- Promise调用reject时, 会调用下一个带有reject函数的then(或catch()), 跳过任何不带有reject处理的then语句
- 在resolve调用时的错误会触发隐式拒绝(implicitly rejects, 而不是明确调用reject), 也会被catch(或带有rejct处理的then)捕获到

## Promise resolution procedure

thenable

链式调用时, then/catch会立刻调用, 其中的参数会等待调用的promise完成(?)后才会执行, 如果上一个参数未返回promise(返回其他值), 则then中的参数会立刻执行

```js
result = result.then((url) => {
return getJSON(url) // return promise
})
```

promise.then 只以function作为参数

## async.js

JS函数的异步版本

异步函数返回的时机和调用的位置

设置好asyncFunction中的callback函数, 判断好总的callback的执行位置

async.parallel
.bind

```js
async.parallel([
  function(iamdone) {
    async.series([
      (done) => {console.log(1); setTimeout(done, 1200)},
      (done) => {console.log(1); setTimeout(done, 1200)},
      (done) => {console.log(1); setTimeout(done, 1200)},
      (done) => {console.log(1); setTimeout(done, 1200)},
    ], iamdone)
  },
  function(iamdone) {
    async.series([
      (done) => {console.log(2); setTimeout(done, 1000)},
      (done) => {console.log(2); setTimeout(done, 1000)},
      (done) => {console.log(2); setTimeout(done, 1000)},
      (done) => {console.log(2); setTimeout(done, 1000)},
      (done) => {console.log(2); setTimeout(done, 1000)},
    ], iamdone)
  }
], function(){
  console.log('all done')
})


async.parallel([
  async.series.bind(null, [
    (done) => {console.log(1); setTimeout(done, 1200)},
    (done) => {console.log(1); setTimeout(done, 1200)},
    (done) => {console.log(1); setTimeout(done, 1200)},
    (done) => {console.log(1); setTimeout(done, 1200)},
  ]),
  async.series.bind(null, [
    (done) => {console.log(2); setTimeout(done, 1000)},
    (done) => {console.log(2); setTimeout(done, 1000)},
    (done) => {console.log(2); setTimeout(done, 1000)},
    (done) => {console.log(2); setTimeout(done, 1000)},
    (done) => {console.log(2); setTimeout(done, 1000)},
  ])
], function(){
  console.log('all done')
})
```

## Promise

async 库不够通用
Promise是原生的

异步操作时, try-catch无法很好地捕获错误

对于异步操作, 通常有两种状态
- 正常执行
- 发生错误

```js
try {
  var content = readFile(path)
}catch(e){

}

foo(a, b, c, function(err, result){
  if(err){
    // handle error
  }else{
    // do something
  }
})
```

可以使用Queue队列来限制同时运行的回调数量, 可以限制大量回调的嵌套
Promise
- 减少回调嵌套层次
- 合理抽象一个异步操作(对不同异步操作进行包装)

一个promise对象代表一个异步操作的结果(成功执行/失败抛出错误)

以一个回调函数作为参数构建新的promise对象, 返回函数的结果(通过新的回调函数获取)

```js
var promise = new Promise((resolve, reject) => {
  doSomething((err, data) => {
    if(err){
      reject(err)
    }
    resolve(data)
  })
})
```

## 使用Generator 生成器来处理异步函数

为什么要使用Generator函数来处理异步函数
- 根据种类不同(普通异步调用, promise), 异步函数书写时总会使用大量的缩进, 相较于同步来说不够美观
- 使用Generator函数处理异步函数, 可以将异步函数书写转换为类似同步的形式

缺点(只根据创建的函数而言)
- 没有处理含有参数的generator函数
- 生成器实际上不符合语义

## Async await

注意事项
- async function 为一个keyword
- await 后参数一般为Promise, 但原始值也可以, 会立刻返回
- await 语句会返回promise的结果
- async function 返回一个promise, 可以调用then
- 虽然书写形式和同步相似, 但本质上仍为异步函数, 在递归操作时需要注意

```js
  async function f() {
    console.log(1)
    var a = await Promise.resolve(5)
    console.log(a)
  }

  run(f)

  console.log(2) 
//  操作的输出是什么, 为什么
  // 1 run会先运行同步代码, 在等待异步操作完成
  // 2
  // 5

  async function f(){
    console.log(1)
    var a = await Promise.resolve(5)
    console.log(a)
    var a = await Promise.resolve(5)
    console.log(a)
    var a = await Promise.resolve(5)
    console.log(a)
  }

  async function g(){
    console.log(2)
    var b = await Promise.resolve(6)
    console.log(b)
    var b = await Promise.resolve(6)
    console.log(b)
    var b = await Promise.resolve(6)
    console.log(b)
  }

  f()
  g()
  console.log(3)

  // 输出是什么
  // 1 => 2 => 3 => 5 => 6 => 5 => 6
  // 协程
  // f, g会立刻运行同步代码, 然后各自等待异步代码完成
  // f的第一个异步完成后, 会接着查看g中的第一个异步
```