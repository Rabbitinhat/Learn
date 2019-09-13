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

## async await

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

util
- format('%s foo %s foo', '1', '2')

- URL
-  class URLSearchParams()
-  class URL
   -  url.domainToASCII('') 将domain解析为ASCII(转换中文域名)


require('fs').promises => 提供返回promises object的异步文件系统方法(asynchronous file system methods),
而不是返回callback

fs.readdirSync/readdir(path, {withFileTypes: true}) => 带有withFileTypes参数时, 方法返回fs.Dirent object组成的数组, 而非字符串; 每个fs.Dirent object带有isFile()方法, 可以判断是否为文件

## http module

http模块作用
- 建立服务器 http.createServer
- 发送请求 http.request

