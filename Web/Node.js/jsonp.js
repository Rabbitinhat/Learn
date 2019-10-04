script = document.createElement('script')

script.src = 'https://api.douban.com/v2/movie/search?q=后天&callback=foo'

function foo(movie){
  console.log(foo)
}

// 使用JSONP跨域获取数据
function jsonp(url, data){
  return new Promise((resolve, reject) => {
    var script = document.createElement('script')
    var url = url + '&' +
    [...Object.entries(data)].map(pair => {
      return pair.join('=')
    }).join('&')

    var callbackName = 'JSONP_CALLBACK_' + Date.now() + Math.random().toString(16).slice(2)
    console.log(callback)

    window[callbackName] = function(data){
      // TODO 为什么删除window
      delete window[callbackName]
      document.head.removeChild(script)
      resolve(data)
    }

    url += '&callback=' + callbackName

    script.src = url
    script.onerror = function(e){
      delete window[callbackName]
      document.head.removeChild(script)
      reject(e)
    }

    document.head.appendChild(script)
  })
}


// 使用iframe + window.win

/**
 * iframe src='url'
 */

var win = iframe.contentWindow
win.postMessage({
  url: 'https://www.b.com/foo'
})

// other origin
window.addEventListener('message', async e => {
  var data = (await axios.get(e.data.url)).data

  window.top.postMessage(data, 'http://www.a.com')
})