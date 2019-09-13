# HTTP

## the protocol

请求-响应 模型(request-response)

使用TCP protocol
- 传输消息数量大, 要确保送达

request: client向server发送的信息

method of request
- GET
- PUT
- POST
- DELETE

server 并不一定会执行所有请求

Termux

https://www.twitter.com/marjinjh

```
GET /marjinjh HTTPS/
Host: twitter.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36

HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 
...

<!DOCTYPE html>
<html><head>...</head><body>...<body></html>
```

status-code: 2xx 4xx: request wrong 5xx: server wrong
status-text: OK

HOST

GET/DELETE 不包含request body
POST/PUT 包含request body

## Browser and HTTP

GET: src(img, script)

https://www.xxx.com/example/message?name=xx&message=xx

GET /example/message?name=xx&message=xx HTTP/1.1
HOST: www.xx.com
User-Agent: xxx

encodeURICompoent() decodeURICompoent()
escape()

幂等的: 没有副作用的函数

## XMLHttpRequest()

同步运行 false send() 会等待数据返回后才继续运行

xhr = new XMLHttpRequest()

- xhr.status
- xhr.statusText
- xhr.getResponseHeader('header-name'), header-name 大小写不敏感

### Asynchronous Request


### Fetching XML Data

XML

xhr.responseXML

```xml
<?xml version='1.0'>
<tag>
  <foo azz='15'></foo>
</tag>
```

xhr.open('get', 'http://xieranmaya.github.io/img/cats.json')

XML缺点
- 冗余太多
- 解析困难
- DOM操作复杂, 同时读取数据不如JSON方便

### HTTP sandboxing

同源策略
跨域限制 JS请求位于不同域名的服务器时, 会被阻止(协议, 域名, 端口都相同)

浏览器中不同标签中也存在同源策略

access-control-allow-origin: * 允许跨域访问

CORB (Cross-Reading Read Blocking)

```js
function get(url, callback){
  let xhr = new XMLHttpRequest()
  xhr.open('get', url, true)
  xhr.addEventListener('load', function(){
    if(xhr.status < 400){
      callback(xhr.responseText)
    }
  })
  xhr.send(null)
}
```

很多库和框架提供对XMLHttpRequest()的封装
```js
// 处理请求失败情况
function get(url, callback, onerror){
  var req = new XMLHttpRequest()
  req.open('get', url)
  req.addEventListener('load', () => {
    if(req.status < 400) callback(req)
    else onerror(req)
  })

  req.addEventListener('error', (e) => {
    onerror(e)
  })

  req.send()
}
```

```js
// try无法捕获延时调用的函数错误
// 对callback同理
try{
  setTimeout(()=>{
    throw new Error(2)
  }, 3000)
}catch(e){
  console.log(e)
}
```

error event

```js
req.addEventListener('error', function(){
  callback(null, new Error('Network error'))
})

getURl('data/nonsense.txt', function(content, error){
  if(error !== null){
    // do Something
  }else{
    // handler error
  }
})
```

HTTP request response 做字符串拼接时, 注意空格. 要求严格
 
内容不受控时, 避免使用eval()

9-27`

XSS Cross Sit Scripting: 跨站脚本攻击

document.append

同时下载3张(数组)

### taskQueue

任务队列

先输出1, 2秒后输出2, 3秒后输出3, 4秒后输出4

class Queue
- constructor
- add
  - 判断当前函数是否处于正在执行状态
  - 否则将函数存储
  - 未处于执行状态时, 调用传入add的函数, 传入next(从存储的函数中读取下一个, 作为next执行)
  - 当函数队列中所有的函数都执行完毕后, 结束运行, 将hasRunning状态修改为false

瀑布流图片展示
- 避免大量加载图片内容
- 只加载显示在当前视口的图片
- 保留所有图片的信息(url, width, height,...)
- 视口中未显示的图片会被动态删除(显示则会动态加载)
- 虚拟化列表 visual List

Vistual List
- scrollTop
- Node.append()
- Math.max(NaN, 2) => NaN

js运行完毕 => 触发js.onload事件
图片加载完毕

status code

401 UnAuthorized 未授权(未登录)
403 Forbidden 隐藏
404 Not Found未找到
  Soft 404 返回200响应, 但页面为404; 运营商404劫持
  https加密, SSL/TLS
  浏览器对小于512字节的页面不给展示
451 Unavailable For Legal Reason

301 Move Permanently 永远跳转到新位置
302 Move Temporarily 暂时跳转到新位置(?)
  location.href = 'newAddress'
304 Not Modified 内容未改变
- If-Modified-Since: date
- last-Modified: date
- If-None-Match

REVIEW 
协商缓存
强缓存
- 直接从浏览器缓存中读取相关数据
- Headers
  - expires: 标记缓存到期的时间
  - age: 以s为单位标记寿命
  - cache-control: 控制与缓存(cache)相关的头部信息(请求头/响应头)

刷新操作会进行协商缓存操作, 正常打开操作则以强缓存优先(优先读取缓存, 而非发送请求)

501 Not implemented 请求的方法不被服务器支持('get', 'post'...)
502 Internal Server Error 服务器内部错误

content-length

content-Security-Policy: 内容安全策略
`CSP`

```js
Content-Security-Policy: default-src 'none' //限制当前html页面的安全策略
 base-uri 'self'
 block-all-mixed-content //禁止安全与不安全的混合协议
 connect-src 'self' uploads.github.com www.githubstatus.com collector.githubapp.com api.github.com www.google-analytics.com github-cloud.s3.amazonaws.com github-production-repository-file-5c1aeb.s3.amazonaws.com github-production-upload-manifest-file-7fdce7.s3.amazonaws.com github-production-user-asset-6210df.s3.amazonaws.com wss://live.github.com
 font-src github.githubassets.com //=>字体来源限制
 form-action 'self' github.com gist.github.com // => 
 frame-ancestors 'none' //=> 当前页面可以被iframe嵌套在哪个页面, none表示任何页面都不行
 frame-src render.githubusercontent.com // 可以嵌套来自哪个域名的iframe
 img-src 'self' data: github.githubassets.com identicons.github.com collector.githubapp.com github-cloud.s3.amazonaws.com *.githubusercontent.com
 manifest-src 'self'
 media-src 'none' //=> 禁止媒体资源
 script-src github.githubassets.com //页面可以运行哪个页面的js
 style-src 'unsafe-inline' github.githubassets.com
 ```

REVIEW 
预检请求
- 简单请求不会触发预检请求

为什么有的请求有预检请求, 有的没有
- 不能破坏Web的兼容性

RPC
- 远程调用函数
- jsonrpc
  - aria2c

RESTful
- 请求资源

webAPI

referer