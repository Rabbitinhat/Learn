setTimeout(() => {
  console.log(444)
}, 0)

setImmediate(() => {
  console.log(2)
})


setTimeout(() => {
  console.log(2333) 
}, 0)

var start = Date.now()
// 使等待100ms后再继续执行
while(Date.now() - start < 100){

}

setImmediate(() => {
  console.log(1)
})