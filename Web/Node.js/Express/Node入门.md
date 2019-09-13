# Node/Express 入门

***

## 参考 摘抄 

[Node.js是什么?](https://www.ibm.com/developerworks/cn/opensource/os-nodejs/)

## Node.js

***
***

传统Web服务器中(比如`Apache`), 每个HTTP请求都会让服务器创建一个新的进程来处理这个请求

通过Ajax, 我们不需要一次请求整个页面, 而是请求我们需要的部分页面信息, 因此, 我们需要和服务器保持一个长久的有效连接(通常使用长轮询(long polling))

HTTP请求通常不会持续, 每次请求-响应后都会断开连接; 长轮询是一种利用HTTP模拟持续连接的技巧(浏览器主动发送请求至服务器, 等待服务器需要发送信息时, 再返回响应; 可以让浏览器始终保持等待响应的状态);

在传统服务器上, 每次新的用户连接到网站上时, 就需要一个新的连接, 每个连接都占用一个进程(大部分时间是空闲的), 过多的进程会占用过多内存, 可能导致服务器耗光内存

解决方法: 非阻塞和事件驱动

非阻塞像是一个loop循环, 会一直运行; 当有新的请求时, 就会将这个请求传给具体的请求处理程序, 然后响应一个回调. 然后继续运行, 请求处理程序执行完毕后, 就将响应返回浏览器, 然后继续运行. 这样, 服务器进程就不会等待

服务器只有在用户有事件发生时才会响应(事件驱动)

Node.js由JS编写, 使用`Google`的`V8`虚拟机(Chrome浏览器使用的JavaScript执行环境, 负责解释并运行代码; 可以下载该引擎将其嵌入任何应用程序), 来解释和执行`JavaScript`代码. 因为JS本身就是事件驱动的脚本语言(事件处理, 回调).

相对于浏览器环境, Node.js事实上就是另外一种上下文, 允许在后端(脱离浏览器环境)运行JavaScript代码

### 事件驱动编程

***

连接建立, 数据通过连接传递, 连接关闭,... 都是事件, JS是事件驱动编程语言(闭包, 匿名函数), 所以Node.js很适合进行事件驱动编程

### 优点

***

在响应客户端之前, 预计可能会有很高的流量, 但所需的服务器端逻辑和处理并不一定很多

典型示例

### Node模块

***

通过安装模块扩展Node的功能

`Node Package Module`(npm) 内置功能, 用于安装和管理Node模块, 自动处理依赖项

Node 完成了提供高度可伸缩服务器(?)的目标

## Express

* 为不同URL路径使用不同的HTTP动作的请求(路由)编写处理程序
* 集成了`View`渲染引擎(`pug`), 通过将数据插入模板来生成响应
* 设置了常见的Web应用设置, 如用于连接的端口, 以及渲染响应模板的位置
* 在请求处理管道(?)的任何位置添加额外的请求处理"中间件"(接收到请求后, 经过管道到,通过中间件进行处理?)

Express本身是极简的, 但开发人员通过创建各种兼容的中间件包(库)解决了几乎所有的Web开发问题. 这些库可以实现cookie, 会话, 用户登录, URL参数, POST数据, 安全头等功能

一个Web框架是否流行是很重要的, 这预示着它是否会得到持续的维护, 是否会有丰富的文档, 插件库和技术支持

### 固执(opinionated)与包容(unopinionated)

***

固执的Web框架认为应该有一套标准答案来解决各类具体任务. 

包容的框架, 不会限制实现目标的组件组合的最佳方式, 不限定组件的选择. 开发人员更容易选择合适的工具来完成特定任务, 但要付出寻找组件的代价

Express是高度包容的, 几乎可以将任何兼容的中间件以任意顺序插入到请求处理链中, 只要你喜欢, 可以用单一文件或多个文件构造应用, 目录结构也没有限制

### Express如何工作

***

Express可以调用特定的HTTP动作(GET, POST, SET...)函数和URL模式(路由)函数, 还可以指定模板(view)引擎的种类, 模板文件的位置以及渲染响应时所使用的模板等. 可以使用Express中间件来添加对`cookie`, 会话(session), 用户, 获取`GET/POST`参数..., 可以使用Node支持的任何数据库(Express本身并没有定义任何数据库行为)

### hell world

***

通过导出Express模块, 创建一个Express应用(命名为app), 它可以进行路由HTTP请求, 配置中间件, 渲染HTML视图, 注册模板引擎以及修改应用程序设置等操作, 从而控制应用的行为

### 创建和导入模块

***

模块是JavaScript库或文件, 可以通过Node的`require()`进行导入. Express本身就是一个模块, Express应用中使用的中间件和数据库也是

使用`require("express")`导入express模块

![导入express模块]()

> 使用自建模块可以使代码更有序. 单文件很难维护和应用. 使用模块有助于管理命名空间, 在使用模块时只会导入模块中显式导出的变量

将方法设置为`exports`对象的附加属性, 就可以将方法导入

![exports导出模块]()

也可以将对象赋值给`module.exports`, 一次性导出多个方法; 将要导出的方法作为对象方法

![module.exports一次性导出对象]()

> 在一个既定模块内, 可以把`exports`当作`module.exports`的快捷方式. `exports`本质上就是在模块初始化前为`module.exports`的值进行初始化的一个变量, 这个值是对一个对象的引用. 意味着`exports`和`module.exports`引用了同一个对象, 同时如果为`exports`赋其他值不会影响到`module.exports`

### 使用异步APIS

***

JavaScript在完成需要一段时间才能完成的操作时, 经常会使用异步API来取代同步API. 同步API下, 每个操作完成后才会执行下一个操作

操作开始后(但未完成)会立即返回. 一旦操作完成, API将使用某种机制执行附加操作(callback?)

![异步同步]()

![异步同步执行]()

通常在调用异步API时, 使用回调函数, 在API操作结束后执行回调函数

> 如果有一系列独立的异步操作必须按顺序执行, 那么使用回调可能会导致多级嵌套回调. 通常称为"回调地狱", 解决方法: 良好的编码实践, 使用`async`等模块, 迁移至ES6并使用`Promise`等特性

> Node 和 Express 存在一个约定, 使用"错误优先"回调, 回调函数的第一个参数是错误值, 后续参数则包含成功数据

### 创建route处理器

***

![route handler]()

回调函数将请求(req)和响应(res)对象作为参数, 可以调用响应方法结束请求/响应

Express应用对象还提供了为其他所有HTTP动作定义路由处理器方法, `app.copy()` `app.get()` `app.delete()` `app.post()` `app.put() ...`

`app.all()` 可以响应任意HTTP方法时调用. 在特定路径上为所有请求方法加载中间件函数

![app.all()]()

路由器可以匹配URL中特定的字符串模式, 并从URL中提取参数传递给路由处理程序(作为res的属性)

可以为站点的特定部分提供一组路由处理器(组合公共路由前缀); 将这组路由放入一个模块中, 使用exports导出

### Middleware 中间件

***

中间件函数通常是对请求或响应执行某些操作, 然后调用"栈"中下一个函数, 可能是其他中间件或路由处理器. 中间件的调用顺序由应用开发者决定

> 中间件可以执行任何操作, 运行任何代码, 更改请求和响应, 也可以结束请求-响应周期. 如果没有结束循环, 就必须调用`next()`将控制传递到下一个中间件函数

大多数应用会使用第三方中间件来简化Web开发任务 `cookie` `session`(会话), 用户验证等. 可以使用NPM进行安装, 导入程序, 并对应用对象(app)使用`use()`添加中间件函数

> 由于中间件函数按顺序调用, 所以引入顺序很重要

可以自己编写中间件函数. 和路由器回调函数的唯一区别是: 中间件函数包含第三个参数`next`, 在中间件不会结束请求周期时会调用`next()`
```js
//中间件函数和回调函数对比
//NOTE 普通路由处理回调函数
app.get("/", (req, res)=>{
    res.send("Hello World!");
});
//NOTE 中间件函数
app.get("/select", (req, res, next)=>{
    console.log("Do something..");
    //NOTE 将控制权传递给下一个处理器
    next();
})
```
`app.use()` `app.METHOD()` 添加中间件函数至请求处理链中

```js
//创建并添加中间件函数
//NOTE 实例中间件函数
const a_middleware_function = (req, res, next) => {
    //NOTE do something
    //NOTE 调用next(), express会调用请求处理链中下一个中间件函数
    next();
};

//NOTE app.use()为所有的路由和HTTP动作添加函数
app.use(a_middleware_function);

//NOTE app.use()为特定路由添加函数
app.use("/somwhere", a_middleware_function);

//NOTE app.METHOD()为特定HTTP方法和路由添加函数
app.get("/", a_middleware_function);
```
### 托管静态文件

***

`express.static`中间件来托管静态文件, 图片, CSS和JS(Express原生中间件函数)

```js
//托管public文件夹
app.use(express.static("public"));
```
托管后, public内所有文件都可以通过`/+文件夹名`来访问

```url
http://localhost:3000/images/dog.jpg
```

可以多次调用`static()`托管多个文件夹

可以为静态文件的URL添加虚拟的前缀

```js
//http://localhost:3000/media/images/dog.jpg
app.use("/media", express.static("public"));
```

### 错误处理

***

用来处理错误的特殊中间件函数有四个参数(`err`, `req`, `res`, `next`)

在调用所有其他`app.use()` 和路由调用后才能调用

`Express`内建错误处理, 默认在中间件函数栈的末尾, 错误传递给`next()`而没有函数处理它, 就会调用默认错误处理函数.

> 生产环境不保留栈跟踪轨迹(?) 可将环境变量`NODE_ENV`设置为`production`来运行所需的生产环境

### 使用数据库

可以使用Node支持的所有数据库

使用前需要先安装驱动程序(NPM)

可以直接访问, 也可以通过对象关系映射(Object Relational Mapper ORM)间接访问

```js
//NOTE 调用数据库

const MongoClient = require("mongodb").MongoClient;

//NOTE 连接数据库
MongoClient.connect("mongodb://localhost:27017/animals", (err, client)=>{
    if(err){
        throw err;
    }

    //NOTE
    let db = client.db("动物");
    //NOTE 查找哺乳动物的内容
    db.collection("哺乳动物").find().toArray((err, result)=>{
        if(err) throw err;
        console.log(result);
        client.close();
    });
});
```

### 渲染数据(view)

模板引擎为输出HTML的结构制定一个模板, 可以在其中动态填入数据, 返回特定信息

在安装模板库后, 可以使用`views` `view_engine` 来指定模板引擎

```js
//NOTE 指定模板引擎
//NOTE 设置包含模板的文件夹("views")
app.set("views", path.join(_dirname, "views"));
//NOTE 设置视图引擎
app.set("view engine", "some_template_engin_name(pug...)");

//NOTE 使用res.render()向指定模板文件(index)传入数据(title, message)
app.get("/", (req, res)=>{
    res.render("index", {title: "备忘", message: "出门带钥匙"});
})
```

### 文件结构

Express不规定任何文件结构和组件, 可以使用Express应用生成器生成结构化的框架

## Express 开发环境


完整的Express本地开发环境包括`Node.js` `NPM`包管理器 `Express`应用生成器

开发每个Express Web应用时, 由NPM针对当前应用将Express(以及模板引擎, 数据库驱动程序, 身份验证中间件, 静态文件托管中间件等其他库)作为依赖项进行安装

也可以安装(global)Express应用生成器, 可用于创建遵循MVC模式的Express应用框架. 不是必须的. 但是它更易上手, 还有助于应用结构的模块化管理

> Node和Express中并不包含独立的Web服务器, 每个Web应用自己创建, 自己运行服务器

其他依赖(模板引擎, 数据库驱动程序, 身份验证中间件)是应用的一部分, 使用NPM将它们引入到环境中

其他工具: IDE或文本编辑器, 版本控制工具...

版本: Node LIS(Long-term supported, 长期支持版)发行版, 它比当前发布版本(current)更稳定

检测是否安装成功

### 使用NPM

用于获取应用开发, 测试, 以及生产环境的所有包(JS库). 也可运行开发中使用的测试单元和工具

可以手动逐个安装, 但通常使用`package.json`来管理依赖, `packgaw.json`中包含NPM获取和运行应用程序所需的所有内容

### 添加依赖

NPM下载包, 将包保存进工程依赖树

使用`npm init` 为应用创建一个`package.json`文件, 会请求一系列信息, 保存在生成的`package.json`文件中

![使用NPM创建package]()

安装Express, 并将Express保存在`package.json`文件中的依赖表里(`dependencies`)

![使用NPM安装Express]

同时会创建`node_modules`保存Express的相关依赖

### Development dependencies 开发依赖

只在开发过程中使用的依赖; 不需要在生产环境中安装

安装`eslint`(对代码进行静态分析)

![NPM安装elsint作为开发依赖]()

会将信息保存在`package.json`的`devDependencies`中

### 定义脚本

可以使用`package.json`定义脚本, 然后可以通过`NPM`的`run-script`来运行脚本(通常用于使用`Gulp/Grunt`来运行测试单元或其他外部工具)

添加脚本为代码运行`elsint`

![添加脚本]()


## 安装Express应用生成器

可以生成一个Express应用的"框架"

使用npm进行全局安装(-g), 可以在任意位置调用

`$ npm install express-generator -g`

创建应用

![Express应用生成器创建框架]()

![epxress其他命令]()

会在当前位置的子目录中创建Express应用, 控制台会显示安装信息

进入目录安装全部依赖(保存在当前目录的`package.json`)中

![为应用安装全部依赖]

运行应用(Windows)

![运行应用]()

使用`DEBUG`命令可以展示运行时返回的有用的日志信息(?)

[本地连接](http://127.0.0.1:3000/) 就可以看到Express默认页面

