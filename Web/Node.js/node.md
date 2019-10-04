/*
 * @Author: chyon71 
 * @Date: 2019-09-18 16:59:57 
 * @Last Modified by: chyon71
 * @Last Modified time: 2019-09-27 11:39:17
 */


# Node.js

- 不同于框架, 库, Node 为 JS 的新的运行环境(浏览器, 微信小程序, MongoDB), 操作本地环境(网络, 文件)
- chrome v8/Chakala
- 单线程, 异步实现一个高性能服务器(不同于多线程, 线程池)
- 前端工程化
  - es6 -> es5
  - 压缩, 混淆(将代码变为不可读, 减少体积)
  - 打包(将多个文件合并为一个文件)
  - 爬虫(获取网络中的信息)
  - 命令行软件
  - Electron 开源桌面软件框架

并行时

```js
var conn1 = connect();
var conn2 = connect();
var conn3 = connect();

while (true) {
  // 返回已经建立链接的资源
  let readyCounts = select([conn1, conn2, conn3]);

  for (let readyCount of readyCounts) {
    // 逐个进行读取, 和处理
    var data = read(readyCount);
    var process = process(data);
    var result = getData(process);
  }
}
```

Node 调试

- `--inspect-brk` 会在程序第一行暂停执行,`chrome://inspect/#devices`
- vscode
- NDB

## Module

require
[require 方式总结](http://nodejs.cn/api/modules.html)

- 相对路径 relative path
- string
  - 指向内置模块(core module)或位于 node_modules 文件夹中的模块, 如果未发现
  - 查找 package.json 中 main 字段对应的 string
  - 向上层文件夹中 node_modules 文件

导出

- module.exports

  ***

  |

  ***

  | |

  ***

## fs module

`file system`

callback: function(err, data){do something} 错误优先(err 作为第一个参数)

`fs.readFile('filepath', 'utf8', callback)`

如果忽略编码参数, 默认返回 Buffer object(array-like 对象, 包含 16 进制数字表示文件的 bytes 表示)
`readFileSync` 表示同步(sync)版本

`fs.writeFile('filename' 'content', callback)`

`fs.readdir('dirpath', callback)` 当前目录所有文件

`fs.stat('filename', callback)` 文件信息

`fs.rename('filename', 'newname', callback)`

`fs.unlink`

File Descriptor 文件

## 异步操作与生成器 generator

### async await

并行加载 串行显示

只有 async 函数中可以添加 await

## 常用模块

path '/'

- basename
- dirname
- extname 扩展名
- parse => object{root, dir, base(文件名+扩展), ext, name,}
- isAbsoulte 绝对路径
- join('foo/bar', 'baz/', '/baa/') 拼接路径
- resolve('/foo/bar/baz', '../zz') 计算正确路径
- relative('')

var getPath = path.join('/a/v/c.js', 'sds/aw.js') 是什么结果,
var m = path.join('/a/v/c.js/', 'sds/aw.js')又是什么结果

- "\a\v\c.js\sds\aw.js"
- "\a\v\c.js\sds\aw.js"

util

- format('%s foo %s foo', '1', '2')

- URL
- class URLSearchParams()
- class URL
  - url.domainToASCII('') 将 domain 解析为 ASCII(转换中文域名)

require('fs').promises => 提供返回 promises object 的异步文件系统方法(asynchronous file system methods),
而不是返回 callback

fs.readdirSync/readdir(path, {withFileTypes: true}) => 带有 withFileTypes 参数时, 方法返回 fs.Dirent object 组成的数组, 而非字符串; 每个 fs.Dirent object 带有 isFile()方法, 可以判断是否为文件

## http module

http 模块作用

- 建立服务器 http.createServer
- 发送请求 http.request

server.on ?

linux 中, 使任意文件可执行

- sudo chmod 777 filename
- 在文件头部添加 #! node

## events

- events.EventEmitter() 返回 EventEmitter object 可以进行事件绑定, 调用相关方法
- events.on(event, callback) 绑定事件
- events.emit(eventName, ...args) 触发事件

  - ...args 事件处理器的参数

- event.off(eventName, eventlistener(绑定时的函数对象))) 解除对应的事件处理函数

## Stream

为什么要使用流

- readFile, writeFile 通常使将数据一次性读取出来
- 当读取大容量文件时，耗费大量时间和空间
- 网络和内存的对于数据传输的数量存在限制

Stream 实例

- request
- response WritableStream
- (Buffer object) 字节流对象

流的特点

- 分段处理数据(节省空间, 时间)
- 流量可控(每次传输的数据量可以调节, 适应传输环境(网络))
- 内存占用可控(避免一次占用过大的内存)

流的分类(stream)

- 可读流, 可写流
- 双工流(可读写, 但写入, 和读取的内容可能并不相同)
  - TCP
- 转换流(也是双工流 输出的文件流是经由输入的流转换而来)
  - 压缩

pipe 方法含义, 如何使用

-

- rs.pipe(gzip).pipe(ws).pipe(conn)
  - 传入 rs => pipe(gzip)处理 => 数据输出 => 传入 pipe(ws)

如何创建压缩流

REVIEW

- compressStr

可以使用fs.createReadStream(path)创建可读流
创建一个ReadStream时, 就会自动开始读取

## process

显示当前工作目录

- process.cwd()




### others

write(chunk: any, encoding: string, callback: (error?: Error) => void): void 含义是什么

- 参数 chunk, 类型为 any
- 参数 encoding 类型为 string
- 回调函数 callback
  - 参数 error, ?表示可选, 类型为 Error(new Error)
  - 返回值为 void
- 返回值为 void

readFile(path, (err, data)=>{}) 读取大于 2G 的数据会报错(可以解除限制)

添加网络位置
WebDAV standard 使用 HTTP 协议 MKCOL(创建文件夹, 非标准 HTTP method)

Linux任务管理器

- htop

## Buffer

`buf.read[type][BE LE](offset)`
`buf.write[type][BE LE](value, offset)`

type

- Float 32bits
- Double 64bits
- [integer]
- Int8
- Int16
- Int32
- [unsigned integer]
- UInt8
- UInt16
- UInt32

BE LE 含义是什么

- BE 大端, 较大的内存地址作为末尾
- LE 小端, 较小的内存地址作为末尾(字节顺序相反)

二进制补码, 反码怎么操作

ArrayBuffer Object

## child process

tldr 命令的简单介绍
man 命令的详细介绍

如何删除一个文件夹

- rm -r

## Express

中间件函数
- server.use()

什么是静态文件, 动态文件
- 静态文件static: 操作该文件时, 不需要进行任何修改
- 动态文件: 根据情况对文件的数据进行修改

服务端触发下载
Content-Disposition: attachment; filename="logo.png"

## Repl

作用
- 打开一个交互式控制台
- reql.start

## VM

作用
- visual machine 使用虚拟机来运行js代码
- vm.Script


## Worker Treads

作用
- 添加新的进程

集群

## Event-loop

事件循环

当前线程没有任务正在执行, 但存在一些稍后执行的代码(setTimeout, callback, promise...), node是如何处理.
异步操作的具体实现
- 依靠事件循环

Node打开后, 执行流程
- initialize 初始化 event loop
- 执行 input script(处理要执行的js代码, 可能会在不同的循环阶段添加不同的待执行函数, 不同阶段执行的函数也可能产生其他函数. 当整个事件循环中没有任何函数需要执行, 则当前进程就会退出)
- 开启event loop

不同 Event-loop pharse 的结构和作用

- timers 
  - 执行 setTimout() setInterval() 设置的 callback
- pending callbacks
  - 执行上一轮loop被推迟的 i/o callback
(- idle prepare) 内部使用
- poll
  - I/O callback
- check 
  - setImmedicate()
- close callback
  - 一些close callback

pharse 的细节

setTimout() Vs setImmediate()
- 初始代码在 input scripts 处执行
- 根据 input scripts 处代码到被 event loop 处理时的时间不同, 如果时间大于 setTimeout() 设置的时间, 则进入 event loop 时, 在 timers pharse 中 setTimeout 的 ** ** 会被执行, setImmediate 的 callback 会在之后执行; 如果小于 setTimeout 设置的时间, 则进入 event loop 时, 在 timers pharse 中, setTimeout 函数不会立刻执行

process.nextTick(f)
- f 的执行位置
  - 在任意两个 pharse 之间被执行(包含在进入 event loop 后, 进入 timers pharse 之前时)

顺序为
- 4444 2333 2 1
- 4444 2 1 2333
- 4444 2 2333 1
- FIXME 两次setTimeout之间为什么会有时间差?


```js
setTimeout(() => {
  console.log(4444)
}, 0)

setImmediate(() => {
  console.log(2)
})


setTimeout(() => {
  console.log(2333) 
}, 0)

setImmediate(() => {
  console.log(1)
})
```

顺序为: 2 1
- setImmediate 按顺序执行
- FIXME 是一个队列, 还是两次event loop

```js
setImmediate(() => {
  console.log(2)
})
setImmediate(() => {
  console.log(1)
})
```

顺序: 444 2333 2 1

```js
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
```






进入事件循环的代码状态 ?

不同函数进行事件循环的初始位置 ?

对具体例子的事件循环过程分析 ?

### 浏览器中的事件循环

- micro task 微任务
  - 后于宏任务执行
  - 但当微任务执行中产生了新的微任务时, 会继续执行微任务. 阻碍宏任务的执行
- macro task 宏任务
  - 先于微任务执行
  - 当宏任务执行过程中, 如果产生新的宏任务, 并不会阻碍之后的微任务执行

```js
setTimout(() => console.log(1))

var start = Date.now()

// ?
promise.then(function f(){
  if(Date.now() - start < 1000){
    setTimeout(f)
  }
})
```

#### 微任务

(promise.)then

MutainObserver

不同微任务会按照代码顺序执行

## package.json

```json
{
  "name": "vote",
  "version": "0.0.1",
  "description": "a voting website",
  // 用于 npm search
  "keywords": ["voting", "sqlite3"],
  "homepage": "",
  // ?
  "bugs": {
    "url": "",
    "email": ""
  },
  // 使用的协议
  "license": "MIT",
  "files": "",
  // 程序的入口文件
  "main": "./libs/main.js",
  "brower": "",
  // 设置命令行命令
  // -g 安装
  "bin": {
    "myapp": "app.js"
  },

// 项目仓库位置
  "repository": {
    "type": "git",
    "url": "github url"
  },

// 为程序添加的脚本命令
// node run foo => node run node foo.js
// 优先尝试 node_modules/.bin/ 中的命令, 如果不存在, 则使用全局命令
// start, test 两个命令运行时, 可以省略run
  "script": {
    "foo": "node foo.js",
    "bar": "ls -ha"
    "start": "",
    // 构建上线的版本
    "build": "",
    // 开发版本
    "dev": ""
  },

  // modules 的依赖module ^主版本号保持不变的情况下更新版本号 ~次要版本号不变的情况下, 使用较新的module
  // package-lock.json 保持精确的module依赖的信息(防止module版本更新导致不兼容))
  "dependencies": {
    "colors": "^1.8.1"
  },

// 包含该项目的开发工具的module
  "devDependencies": {
  }

  // 阻止module发布
  "private": true

}
```

npm init 创建package.json文件
npm publish 发布npm包

.npmrc 修改npm的源(不要淘宝)

shebang `#!/usr/bin/env node` 将文件转换为可执行


### some command

linux command

- mcedit file `显示格式化后的文档`
- chmod +x file 为文件添加可执行权限
- man 查询
- which file 确认命令位置