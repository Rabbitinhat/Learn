// 组合生成器函数 和 promise 优化异步函数书写
function * natureNumber(n){
  for(let i=0; i<n; i++){
    setTimeout(() => (console.log('before',i, ':', a)), 200)
    // yeild 操作符, 会返回结果
    // 不会有赋值操作
    // console.log(a) 输出undefined
    // yield 后的值为next输出结果的value
    // yield i 为一体 (类似typeof a?)
 
    // yield throw() 抛出错误
    // yield return () 函数结束, 返回return()中参数, yield也会结束
    console.log(yield i)
  }
}

var con = natureNumber(10)

for(let i=0; i<10; i++){
  console.log('con', con.next().value)
}

// REVIEW done 为true时, value中保存着function 的返回值

function getVal(val){
  return new Promise(resolve => {
    setTimeout(() => resolve(val * val), 1000 + Math.random() * 2000)
  })
}

function * foo(){
  var x = yield getVal(8)
  console.log(x)
}

var conn = foo()
var obj = conn.next()
console.log(obj.value) // => {value: [Promise], done: false}

conn.value.then((val) => {
  // next()传入参数相当于yield 的返回值
  conn.next(val).value.then(val => {
    conn.next(val).value.then(val => {
      conn.next(val).value.then(val => {
        conn.next(val)
      })
    })
  }) // => x => val
})