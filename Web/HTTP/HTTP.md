# HTTP入门

## HTTP简介

***

`HTTP`协议(`Hyper Text Transfer Protocol` 超文本传输协议): 用于从万维网(`WWW: World Wide Web`)服务器传输超文本到本地浏览器的传送协议

基于`TCP/IP`通信协议来传递数据(HTML文件, 图片, 查询结果等)

HTTP协议用于`B/S`(Brower/Server 浏览器/服务器)架构, `Browser`作为`HTTP`客户端通过`URL`向`HTTP`服务端即`Web Server`发送所有请求, `Web Server`根据接收到的请求向`browser`发送响应信息

## 特点

***

* 简单快速: 发送请求时, 只传送请求方法和路径. 由于协议简单, 使HTTP Sercer服务器程序规模小, 通信速度很快
* 灵活: 允许传输任意类型的数据对象, 通过Content-Type头进行标记
* 无连接: 限制每次链接只处理一个请求, 服务器处理完请求后, 收到客户端的应答, 就断开链接
* 无状态: 协议对事物处理没有记忆能力, 要处理之前的信息, 只能重传
* 支持`B/S & C/S`
## 链接

### Web 浏览器通过TCP链接与web服务器进行交互的流程

访问`https://github.com:80/WilsonLiu95`

* 浏览器解析出主机名`github.com`
* 浏览器查询这个主机名的IP地址`192.30.252.122`
* 浏览器获得端口号`80`
* 浏览器发起到`192.30.252.122`端口`80`的链接
* 浏览器向服务器发送一条`HTTP GET`报文
* 浏览器从服务器读取`HTTP`响应报文
* 浏览器关闭`TCP`链接

### TCP链接建立握手

* 客户端向服务器发送一个小的`TCP`分组(一般是40-60字节). 这个分组中设置了一个特殊的`SYN`标记, 表明这是一个链接请求
* 如果服务器接收了连接, 就会对一些连接参数进行计算, 并向客户端回送一个`TCP`分组, 这个分组中的`SYN`和`ACK`标记都被置位了?, 说明连接请求已经被接收了
* 最后, 客户端向服务器回送一条确认消息, 通知它连接已成功建立. 现代的`TCP`栈都允许客户端在这个确认分组中发送数据
  

## URL & URI

***

`HTTP`使用统一资源标识符(Uniform Resource Identifiers, URI)来传输数据和链接

### URL

`URL`(Unfiform Resource Locator 同一资源定位符), 是互联网上用于标识某一处的地址

> http://www.aspxfans.com:8080/news/index.asp?boardID=5&ID=24618&page=1#name

一个完整的URL包括

* 协议: "`http: `" 表示网页使用HTTP协议 协议后的 "`//`" 为分隔符
* 域名: "`www.apxfans.com`" URL中, 域名也可以使用`IP`地址
* 端口部分: "`8080`" 位于域名后, 使用 "`:`" 作为分隔符, 非必需, 省略则表示使用默认端口
* 虚拟目录部分: "`/news/`" 域名后第一个 `/` 到最后一个 `/` 为止, 非必需
* 文件名部分: "`index.asp` 域名后第一个 "`/`" 到 "`?`"(或 "`#`" 或 结束部分) 之间, 非必需, 省略使用默认文件
* 锚部分?: "`#name`" 从 "`#`" 开始到最后
* 参数部分: "`?boardID=5&ID=24518&page=1`" 从 "`?`" 到 "`#`" 之间(又称搜索部分, 查询部分), 允许有多个参数, 使用 "`&`" 分隔参数

### URI

### URN

## HTTP 报文

***

HTTP报文是在HTTP应用程序之间发生的数据块. 以一些文本形式的元信息(`meta-information`)开头,这些元信息描述了报文的内容和含义, 后跟可选的数据部分. 报文在客户端, 服务器和代理之间流动
报文分为两种 请求报文(request message)和响应报文(response message)

### 请求报文 request

结构如下

```
    <method> <request-URL> <version>
    <headers>

    <entity-body>

    //GET实例
    GET /hello.htm HTTP/1.1
    Accept: */*
    Accept-Language: zh-cn
    Accept-Encoding: gzip, deflate
    If-Modified-Since: Wed, 17 Oct 2007 02:15:55 GMT
    If-None-Match: W/"158-1192587355000"
    User-Agent: Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)
    Host: 192.168.2.162:8080
    Connection: Keep-Alive

    //entity-body 部分为空

    //POST 实例
    POST / HTTP1.1
    Host:www.wrox.com
    User-Agent:Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 2.0.50727; .NET CLR 3.0.04506.648; .NET CLR 3.5.21022)
    Content-Type:application/x-www-form-urlencoded
    Content-Length:40
    Connection: Keep-Alive

    name=Professional%20Ajax&publisher=Wiley
```

起始行

`<method>`

Method | 描述
---|:--
GET|从服务器获取一份文档, 向服务器发送索取数据的一种请求
POST|向服务器发送需要处理的数据
HEAD|只从服务器获取文档的首部
DELETE|从服务器上删除一份文档

常用请求方式 GET POST

GET是向服务器索取数据的一种请求, 而POST是向服务器提交数据的一种请求, 要提交的数据位于请求头部(`header`)后的实体(`entity-body`)中

GET方式: 以实体的方式得到由请求URI所指定资源的过程, 如果请求URI只是一个数据产生过程, 那么最终要在响应实体中返回的是处理过程的结果所指向的资源, 而不是处理过程的描述

POST方式: 用来向目的服务器发出请求, 要求它接收被附在请求后的实体, 并把它当作请求队列中请求URI所指定的资源的附加新子项, 被设计成用统一的方法实现下列功能
  * 对现有资源的解释
  * 向电子公告栏, 新闻组, 邮件列表或类似讨论组发信息
  * 提交数据块
  * 通过附加操作来扩展数据库

区别:

  * 在客户端中, GET通过URL提交数据, 数据明文显示在URL中; POST将数据放在`entity-body`中提交
  * GET请求的数据有字节大小限制(1024bytes?); POST则没有(?实际中不同服务器有不同配置)
  * 安全性: 由于GET会将数据在URL中明文显示, 安全性存在问题
  * (安全的和幂等的(安全指该操作用于获取信息而非修改信息; 幂等意味对同一URL的多个请求应返回同样结果)): GET请求一般不产生副作用; 而POST可能改变服务器的资源

具体操作:

GET: 将一个key/value对的序列(查询字符串)附加到URL上,字符串以`?`开始, 用`&`作为分隔符

POST: 数据放在请求中的实体(`entity-body`)部分, 要将`Content-Type`设置为`application/x-www-form-urlencoded`. POST的参数也是key/value对, 不支持复杂数据类型, 因为POST没有定义传输数据结构的语义和规则

`<header>`分类

Header | 描述
--|:--
通用头部|既可以出现在请求中也可以出现在响应中
请求头部|提供有关请求的信息
响应头部|提供有关响应的信息
实体头部|描述主体长度和内容, 或资源自身
扩展头部|规范没有定义的新首部

请求头部

Header | 描述
--|:--
Accept|浏览器可接受的MIME类型
Accept-Charset|浏览器可接受的字符集
Accept-Encoding|浏览器能够进行解码的数据编码方式(服务器返回编码后的页面,能够对应进行解码, 可减少下载时间)
Accept-Language|浏览器希望的语言种类, 服务器能够提供一种以上的语言版本时用到
Authorization|授权信息, 通常出现在对服务器发送`www-Authenticate`头的应答中
Connection|表示是否需要持久链接?
Content-Length|表示请求正文的长度
Cookie|重要
Host|初始URL中的主机和端口
Referer|包含一个URL, 用户从该URL代表的页面触发访问当前请求的页面
User-Agent|浏览器类型, 如果Servelt返回的内容和浏览器有关则该值非常有用

### 响应报文 response

```
    <version> <status> <reason-phrase>
    <headers>

    <entity-body>

    //实例
    HTTP/1.1 200 OK
    ETag: W/"158-1192590101000"
    Last-Modified: Wed, 17 Oct 2007 03:01:41 GMT
    Content-Type: text/html
    Content-Length: 158
    Date: Wed, 17 Oct 2007 03:01:59 GMT
    Server: Apache-Coyote/1.1
```

状态码

有三位数字组成, 分为5类

整体范围|已定义范围|分类
---|:--|:--
100~199| 100~101| 指示信息:表示请求已接收, 继续处理
200~299| 200~206| 成功:表示请求已被成功接收, 理解, 接受
300~399| 300~305| 重定向(?):要完成请求必须进行更进一步的操作
400~499| 400~415| 客户端错误: 请求有语法错误或者无法实现
500~599| 500~505| 服务器端错误:服务器未能实现合法的请求

常见状态码

状态码| 描述
---|:--
200| "`OK`" 请求成功
400| "`Bad Request`" 请求有语法错误, 不被服务器理解
404| "`Not Found`" 请求资源不存在
500| "`Internal Server Error`" 服务器发生不可预期错误
503| "`Server Unavailable`" 服务器当前不能处理客户端的请求, 一段时间后可能恢复

当前的HTTP版本只为每类状态定义几个状态码, 随着发展会添加更多; 遇到不认识的状态码, 可根据所属类别进行判断

响应头部

header|描述
---|:--
Allow|服务器支持的请求方法
Content-Encoding|文档的编码(`encode`)方式, 只有解码后才能得到`Content-Type`头指定的内容类型
Content-Type|表示文档数据什么`MIME`类型, 默认为`text/plain`, 通常指定为`text/xml`
Content-Length|内容长度, 浏览器使用持久`HTTP`链接时才需要这个数据
Date|当前的`GMT`时间
Last-Modified|文档最后改动时间
Refresh|浏览器在多少时间后刷新文档, 秒为单位
Location|客户端去哪里提取文档


### 其他头部

实体头

用作实体内容的元信息, 描述实体内容的属性

header|描述
---|:--
Allow|允许的方法 `GET`,`POST`
Content-Language|内容的语言类型, 如"`zh-CN`"
 |表示内容长度, `Number`
Content-Location|客户端应到哪里去提取文档, `http://wwww.dfdf.org/dfdf.html`
Content-MD5|`MD5`实体的一种`MD5`摘要, 用作校验和(?). 发送方和接收方都计算MD5摘要, 接受方将其计算的值与此投标中传递的值进行比较 `Content-MD5: <base64 of 128 MD5 digest>`
Content-Range|随部分实体一同发送, 表明被插入字节的地位与高位字节的偏移长度(标明在总体长度中的位置), 也包括总长度 `Content-Range: 1001-2000/5000`
Content-Type|标明发送或接收的实体的MIME类型, 主类型/子类型 `text/html; charset=GB2312`
Expires|为0表示不缓存
Last-Modified|`Web`服务器认为对象的最后修改时间, 如文件的最后修改时间; 动态页面的最后产生时间等 `Last-Modified: Tue, 06 May 2019 00:16:43 GMT`

扩展头

在HTTP消息中, 也可以使用一些在`HTTP1.1`正式规范里没有定义的头字段, 统称为自定义的HTTP头或扩展头, 通常作为实体头来处理

header|描述
---|:--
Refresh| `1;url=http://www.baidu.com //过一秒跳转到指定位置`
Content-Disposition|头字段
Content-Type|响应对象的类型 `Content-Type: application/xml`

## 参考

***

* Web基础---<<HTTP权威指南>>系列
  * [WilsonLiu95](https://segmentfault.com/a/1190000006723609#articleHeader5)

* 关于HTTP协议, 一篇就够了
  * [ranyonsue](https://www.cnblogs.com/ranyonsue/p/5984001.html)

* 前端必须会的!!!关于对HTTP协议的理解, HTTP协议原理分析
  * [N-Tara](https://www.cnblogs.com/n-chenjun/p/6011869.html)