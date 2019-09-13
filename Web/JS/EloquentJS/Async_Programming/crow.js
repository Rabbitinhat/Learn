import {bigOak} from './crow-tech'

bigOak.readStorage('food caches', caches => {
  let firstCache = caches[0]
  bigOak.readStorage(firstCache, info => {
    console.log(info)
  })
})

bigOak.send('Cow Pasture', 'note', 'Let\'s caw louadly at 7pm', () => console.log('Note delivered.'))

import {defineRequestType} from './crow-tech'

defineRequestType('note', (nest, content, source, done) => {
  console.log(`${nest.name} received note: ${content}`)
  done()
})

// Promise
// Promise.resolve() => promise

let fifteen = Promise.resolve(15)
console.log(fifteen)
// then 调用 promise 的结果
console.log(new Date())
fifteen
.then(value => {
console.log(`Got ${value}`)
console.log(new Date())
return Promise.resolve(20)})
.then(value => console.log(value))

// promise简化异步操作, 想要执行异步操作时, 可以将函数作为参数传入Promise构造函数, 返回值调用then方法作为callback接收结果
function storage(nest, name){
  return new Promise(resolve => {
    nest.readStorage(name, result => resolve(result))
  })
}

storage(bigOak, 'enemies').then(value => console.log('Got', value))

var i = 0
function runLate(){
  return new Promise(() => {
    for(; i < 200000000; i++){}
    return i
  })
}
var now = i
console.log('now', now)
runLate().then(result => {
  console.log('promise', result)
})
var now = i
console.log('now', now)

function test(resolve, reject){
  var timeOut = Math.random() * 2
  console.log('Set Timeout to: ' + timeOut + 'seconds')
  setTimeout(function(){
    if(timeOut < 1){
      console.log('call resolve()...')
      resolve('200 OK')
    }else{
      console.log('call reject()...')
      reject('timeout in ' + timeOut + ' seconds')
    }
  }, timeOut * 1000)
}