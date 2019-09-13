// 发送请求request, 获取响应response
fetch('http://example.com/movies.json').then(response => {
  console.log(response.status)
  console.log(response.headers.get('Content-Type'))
})

// 获取response中实际内容
fetch('example/data.txt').then(resp => resp.text()).then(text => console.log(text))

// fetch默认使用get发送request, 添加第二个参数修改
fetch('example/data.txt', {method: 'DELETE'}).then(resp => {
  console.log(resp.status)
});

// 配置headers参数
fetch('example/data.txt', {headers: {Range: 'bytes=8-19'}}).then(resp => resp.text()).then(console.log)

// homeWork
fetch('https://eloquentjavascript.net/author', {headers: {Accept: 'text/plain'}}).then(resp => resp.text()).then(console.log)
fetch('https://eloquentjavascript.net/author', {headers: {Accept: 'text/html'}}).then(resp => resp.text()).then(console.log)
fetch('https://eloquentjavascript.net/author', {headers: {Accept: 'application/json'}}).then(resp => resp.text()).then(console.log)
fetch('https://eloquentjavascript.net/author', {headers: {Accept: 'application/rainbows+unicorns'}}).then(resp => {
	console.log(resp.status)
})

const url = 'https://eloquentjavascript.net/author'
const type = ['text/plain', 'text/html', 'application/json', 'application/rainbows+unicorns']


// 通过fetch第二个参数进行设置
async function showTypes(){
  for(let type of types){
    let resp = await fetch(url, {headers: {accept: type}})
    console.log(`${type}: ${await resp.text()}\n`)
  }
}

showTypes()

postData('http://examplem.com/answer', {answer: 42})
.then(data => console.log(data))
.catch(error => console.error(error))

function postData(url, data){
  return fetch(url, {
    body: JSON.stringify(data),
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST',
    mode: 'cors',
    redirect: 'follow',
    referrer: 'no-referrer',
  })
  .then(response => response.json()) //parses repsonse to JSON
}

// 
var url = 'https://example.com/profile'
var data = {username: 'example'}

fetch(url, {
  method: 'POST',
  body: JSON.stringify(data),
  headers: new Headers({
    'Content-Type': 'application/json'
  })
}).then(res => res.join())
.catch(error => console.error('Error:', error))
.then(response => console.log('Success:', response))

// 自定义request
// Headers
var myHeaders = new Headers()
var myInit = {
  method: 'GET',
  headers: myHeaders,
  mode: 'cors',
  cache: 'default'
}

// Request
var myRequset = new Request('flowers.jpg', myInit)

fetch(myRequset).then(function(response){
  // blob()
  return response.blob()
}).then(function(myBlob){
  var objectURL = URL.createObjectURL(myBlob)
  myImage.src = objectURL
})

// var anotherRequest = new Request(myResquest, myInit)

// Promise
// sucess
function successCallback(result){
  console.log('audio create successful: ' + result)
}

// fail
function failureCallback(error){
  console.log('create audio failly: ' + error)
}

function createAudioFileAsync(success, fail){
  return new Promise(() => {
    setTimeout(() => {
    if(Math.random() < .5){
      success('good luck')
      return 'success'
    }else{
      fail('bad luck')
      return 'fail'
    }
  }, 3000)
})
}
var promise = createAudioFileAsync(successCallback, failureCallback)
promise.then(result => console.log(result))



// var promise1 = new Promise(function(resolve, reject){
//   setTimeout(function(){
//     resolve('foo')
//   }, 3000)
// })

// promise1.then(function(value){
//   console.log(value)
// })

// console.log(promise1)