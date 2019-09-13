var promise1 = new Promise(function(resolve, reject) {
  setTimeout(function() {
    resolve('foo');
  }, 300);
});

var p1 = new Promise(function executor(resolve, reject){
  setTimeout(() => {
    resolve(5)
  }, 5000)
})

p2 = p1.then()

function getImg(url){
  return new Promise((resolve, reject) => {
    var img  = new Image()
    img.onload = function(){
      resolve(img)
    }
    img.onerror = function(e){
      reject(e)
    }
    img.src = url
  })
}

var imgUrls = []
var i = 0

// 串行下载?
getImg(imgUrls[i++])
.then(() => {
  return getImg(imgUrls[i++])
})
.then(() => {
  return getImg(imgUrls[i++])
})


// 使用promise处理XMLHttpRequest
function get(url){
  return new Promise(function(resolve, reject){
    var req = new XMLHttpRequest()
    req.open('GET', url)
    // REVIEW 
    req.setRequestHeader('Accept', 'text/plain')
    req.addEventListener('load', function(){
      if(req.status === 200){
        resolve(req.response)
      }else{
        reject(Error(req.statusText))
      }
    })

    req.addEventListener('error', function(){
      reject(Error('Network Error'))
    })

    req.send()
  })
}

var testUrl = 'https://eloquentjavascript.net/author'
// call的参数是什么?
get(testUrl).then(function(response){
  console.log('Success', response)
}, function(error){
  console.error('Failed', error)
})

// then的链式操作
var promise = new Promise(function(resolve, reject){
  resolve(1)
})

promise.then(function(val){
  console.log(val)
  return val + 2
}).then(function(val){
  console.log(val)
})

get(testUrl).then(function(response){
  return JSON.parse(response)
}).then(function(response){
  console.log('JSON', response)
})

// 改进
get(testUrl).then(JSON.parse).then(function(response){
  console.log('Get JSON', response)
})

function getJSON(url){
  return get(url).then(JSON.parse)
}

getJSON(testUrl).then(function(story){
  return getJSON(story.charpterUrls[0])
}).then(function(chapter1){
  // 等待上一个then处理完后调用
  console.log('Got chapter 1', chapter1)
})

var storyPromise

function getChapter(i){
  storyPromise = storyPromise || getJSON(storyUrl)

  return story.then(function(story){
    return getJSON(story.chapterUrls[i])
  })
}

getChapter(0).then(function(chapter){
  console.log(chapter)
  return getChapter(1)
}).then(function(chapter){
  console.log(chapter)
})

getJSON(storyUrl).then(function(story){
  return getJSON(story.chapterUrl[0])
}).then(function(chapter1){
  addHTMLtoPage(chapter1)
})
.catch(function(){
  addErrortoPage('wrong')
}).then(function(){
  document.querySelector('.spinner').style.display = 'none'
})
