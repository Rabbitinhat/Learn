
* 应用程序接口(`Application Programming Interfaces` (API))
* 已经建立好的一套代码组件, 供开发者调用

API 通常分为两类
* 浏览器API
  * DOM API
  * 地理位置API (Geolocation API): 获取地理信息
  * 画布(Canvas) WebGL API: 创建2D和3D图像
  * 影音类API(HTMLmediaElement WebRTC)

* 第三方API
  * twitter API 新浪微博API

## 安全

每个标签页的代码独立运行, 彼此不能互相影响

## 动态

按需要生成新内容来更新Web页面/应用. 是不同环境下显示不同内容

## 脚本调用策略

HTML元素是按其在页面中出现的次序调用的, 如果放置js代码为于HTML `<head>`元素中, 可能会在DOM未被生成时, 就调用; 导致错误.
避免

```js
//保证在DOM生成完毕后(触发DOMContentLoaded事件); 在执行js代码
document.addEventListener("DOMContentLoaded", function(){
    /* ... */
})
```

使用`<script>`中的`async`属性(异步); 告知浏览器遇到`<script>`元素时不停止加载DOM(多个脚本执行顺序可能不同)

如果想要保证脚本的执行顺序, 使用defer属性

### variable constent

variable: 值的容器 let
constent: 存储不希望改变的值(DOM object)

Math.floor
Math.random

js的变量声明通常在其余代码执行前完成; 所以你可以先使用变量, 再声明.
保留字: 组成JavaScript的实际语法的单词

对象是现实生活中的模型的一种代码结构

路由器可以匹配 URL 中特定的字符串模式，并从 URL 中提取一些值作为参数传递给路由处理程序（作为请求对象的属性）

* npm 用于获取应用开发, 测试以及生产所需的所有包; 也可运行开发过程中使用的测试单元和工具( npm install <Modules>)
`npm install express`
* Dependencies 依赖 开发, 测试时要使用的包(javascript库)
* package.json包含NPM获取和运行应用所需的所有内容(`npm init`)

* Development dependencies 开发依赖(只在开发过程中使用的依赖; 不需要在生产环境中安装)
`npm install esline --save-dev`

* package.json 添加脚本
```
"scripts": {
    ...
    "lint": "eslint src/js"
    ...
}
```

## Express

启动服务器
`DEBUG=express-locallibrary-tutorial:* npm start`: 指定DEBUG变量可启用控制台日志记录/调试
`npm start` 也可以启动, 但无法看到调试信息

停止服务器

`Ctrl + z`

### 文件改动时重启服务器

nodemon `sudo npm install -g nodemon` (全局安装(?), 因为是"工具")
`npm install --save-dev nodemon` 作为开发依赖

```
"script": {
    ...
    "devstart": "nodemon ./bin/www"
    ...
}
```
添加脚本 使用 `nodemon` 打开服务器

`$DEBUG=express-locallibrary-tutorial:* npm run devstart`

## 
package.json 定义依赖项和其他信息; 一个调用入口(/bin/www, js文件)的启动脚本, 脚本中还设置了一些错误处理, 加载app.js来完成其余工作

/routes 目录中用不同模块保存应用路由
/views 目录保存模板

### package.json
dependencies

* cookie-parser: 解析cookie头来填充`req.cookie`(提供了访问cookie的便捷方法)
* debug: 一个小型node调试程序
* http-errors: 处理错误中间件(Middleware?)
* morgan: node专用HTTP请求记录器中间件

script

* start: node ./bin/www
  * start脚本 运行`npm start`时调用它来启动服务器
* devstart: node ./bin/www
  * devstart脚本: `npm run devstart`

### /bin/www

应用入口
* `var app = require("../app")`: 请求真实的应用入口(app.js) app.js会设置并返回`express()`应用对象
* 其余部分为`app`设置端口(`app.set("port", port)`); 再创建一个`HTTP`服务器, 然后监听请求(server.listen(port)); 报告服务器错误和链接信息(server.on("error", onError); server.on("listening", onListening));

### app.js
* 创建一个`express`应用对象(`var express = require("express")`); 然后通过各种设置和中间件来设置应用; 最后导出(`module.exports = app;`);(`www`中导入的`app`)
* `require()`导入了一些实用`node`库; `express http-errors morgan cookie-parser path(用于解析文件和目录的核心node库)`
* 导入用户路由目录中的模块; 处理特定路由(URL path); 可以通过添加新文件来扩展
```js
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
```
    

* 导入 `express` 模块创建 `app`对象, 设置视图(模板)引擎
  * 设置`views`指定模板的存储文件夹
  * `view engine`指定模板库
```js
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
```
* `app.use()` 将中间件库添加进请求处理链; 处理之前导入的第三方库外. 还使用`express.static`中间件将项目根目录下所有静态文件托管至`/public`目录
* 中间件设置完毕后, 把路由处理器添加到请求处理链中, 为网站的不同部分定义具体的路由
* 最后为错误和`404`响应添加处理方法
* `app`对象设置完成, `module.exports = app` 导出对象

### 路由(route)

* 加载express模块, 并获取`express.Router()`路由对象
* `router.get()` 指定路由
* next 参数(中间件函数)

### 视图模板(view)

* 保存在 `/views` 目录中(`app.js`中指定), 使用`.pug`扩展名
* Response.render()用某个对象的某个变量值一同渲染一个特定的模板, 将结果作为响应发送
```js
router.get("/", function(req, res){
    res.render("index", {title: "Express"});
});
```

## database

Express 支持多款数据库(`MySQL, SQlite MongoDB`), 执行新建(create), 读取(read), 更新(update)
和删除(Delete) 操作(crud)

### 与数据交互的最佳方式

* 使用数据库原生查询语言(SQL)
* 使用对象数据模型(Object Data Model)或对象关系模型(Object Relational Model ORM); ODM/ORM 能将网站中的数据表示为`javascript`对象, 然后将它们映射(?)到底层数据库; 一些`ORM`只适用与特定数据库, 还有一些是普遍适用的

`ODM`通常会慢一些

### 选用哪种`ORM/ODM`
要考虑功能和社区活跃度
Mongoose (MongoDB(面向文档数据模型的开源`NoSQL`数据库))
MongoDB "集合"中的"文档"类似于关系数据库里的"表"中的"行"

### 设计 Mongoose 模式和模型

#### 模型

* 存储什么样的数据
  * 图书信息(书名, 摘要, 作者, 种类, ISBN)
* 有必要为每个"对象"(一组相关信息)设计独立的模型
  * 书籍, 书籍副本, 作者
* 使用模型而不是站点代码来表示选项表(下拉列表)
* 确定模型和字段后还要考虑它们之间的关系(UML图?)
  * 藏书, 藏书副本, 作者, 书籍种类模型(可以动态选择)
  * 模型之间的关系(是否有连线表示是否存在关系)和重复度(Multiplicity 图中两框间连线两端的数字, 表示连个模型之间存在的关系的数量(一本藏书可以有多个种类(0..*), 一个种类可以有多个藏书(0..*)))?

### Mongoose 入门

使用 npm 安装 Mongoose

```bash
$ npm install mongoose
```

下载安装 MongoDB 数据库

导入 Mongoose 模块, 通过 mongoose.connect() 链接到本地数据库
> 可以使用 mongoose.createConnection() 创建其他链接, 该函数与 connect() 的参数(数据库URI, 主机地址, 数据库名, 端口, 选项等)一致, 返回一个Connection 对象

### 定义和添加模型

`Schema`接口定义: 定义每个文档中存储的字段, 及字段的验证要求和默认值

`mongoose.model()` 将模式"编译"为模型.模型可以用来查找, 创建, 更新和删除特定类型的对象

> MongoDB 数据库中, 每个模型都映射至一组文档. 这些文档包含`Schema`模型定义的字段名和模式类型

### 定义模式

导入 `mongoose`; 然后使用`Schema`构造器创建一个新的模式实例(`var someSchema = new Schema({字段名: 值})`); 使用构造器的参数对象定义各个字段

### 创建模型

`mongoose.model()`使用模式实例创建模型(类);定义模型类后, 可以使用它们来创建, 更新和删除记录; 通过查询来获取所有记录或特定子集

### 模式类型(字段)

模式可以包含任意数量的字段, 每个字段代表`MongoDB`文档中的一段存储区域.
大多数模式类型(Schema Type, 字段后的描述符) 都是自解释的
除了:
* `ObjectId` 表示数据库中某一模型的特定实例(一本书使用它表示作者对象). 只包含指定对象的唯一ID`_id`. 可以使用`populate()`方法在需要时提取相关信息
* Mixed: 任意类型模式
* []: 对象数组. 在此类模型上执行`JavaScript`数组操作(`push`, `pop`, `unshift`等). 上例中有一个没有指定类型的对象数组和一个`String`对象数组, 数组中的对象可以是任意类型的
```js
const schema = new Schema(
{
  name: String,
  binary: Buffer,
  living: Boolean,
  updated: { type: Date, default: Date.now },
  age: { type: Number, min: 18, max: 65, required: true },
  mixed: Schema.Types.Mixed,
  _someId: Schema.Types.ObjectId,
  array: [],
  ofString: [String], // 其他类型也可使用数组
  nested: { stuff: { type: String, lowercase: true, trim: true } }
})
```

声明字段的两种方法:
* 字段名和type作为key-value对(`name:String`)
* 字段名后跟一个对象, 在对象中定义`type`和字段其他选项
  * 默认值
  * 内置验证器(如最大值/最小值)和自定义验证函数
  * 该字段是否必须
  * 是否将`string`字段自动转换为小写, 大写, 或截断两端空格
    * `{type: String, lowercase: true, trim: true}`

### 验证

Mongoose 内置和自定义的验证器, 以及同步和异步的验证器

内置验证器包括
* 所有模式类型内置 required 验证器, 指定当前字段是否为保存文档所必须的
* Number 有效数值范围 min max
* String: 
  * enum: 指定当前字段允许值的集合 
  * match: 字符串必须匹配的正则
  * 最大长度 maxlength 最小长度 minlength

### 虚拟属性

可以获取和设置值, 但不会保存到 MongoDB 的文档属性

?
* getter: 格式化或组合字段
* setter: 将单个值分解为多个值

### 方法和查询助手(?)

实例方法: 针对特定记录, 可以访问当前对象
静态方法 
查询助手: 扩展Mongoose的链式查询API

## 使用模型
使用创建好的模式来使用模型. 模型即数据库中可以搜索的一类文档
模型的实例即可以存取的单个文档

### 创建和修改文档
通过定义模型的实例并调用save()来创建记录
记录的创建(更新, 删除和查询)操作都是异步的, 可以提供一个回调函数在操作完成时调用. 由于API遵循错误参数优先, 第一个参数必为错误值(无错误时值为null);
如果需要返回结果, 可以添加第二个参数

每个模型都有相关链接(mongoose.model()时将作为默认链接). 可以通过创建新连接并对其调用`.model()` 从而在另一个数据库上创建文档(?)

使用 `.` + 字段名 访问, 修改新记录中的字段. 操作后要调用`save()` 或`upadate` 保存改动

### 搜索记录

使用查询方法搜索记录
```
    Model.find({搜索字段}, function(){
    //callback
});
```

查询条件可列在JSON文档中

> Mongoose 中所有回调都使用 `callback(error, result)`模式, 查询发生错误, `error`包含错误文档, `result`为`null`; 成功, 则`error`为`null`, 结果填充至`result`
如果未指定回调, API返回 `Query`类型的变量; 可以使用该查询对象来构建查询, 随后使用`exec()`执行回调

`find()` 会取得所有匹配记录, 通常只要一个
* `findById()` 指定`id`查找`文档
* `findOne()` 查找与指定条件匹配的第一个文档
* `findByIdAndRemove()` `findByIdAndUpdate` `findOneAndRemove` `findOneAndUpdate()` 通过`id`或`条件`查询单个文档, 同时进行更新或删除
* `count()` 获得匹配条件的项目个数

### 文档间协同 -- population

可以使用 `ObjectId` 模式字段来创建两个文档/模型实例间一对一的引用, (一组`ObjectIds`可创建一对多引用). 该字段存储相关模型id, 如果需要相关文档的实际内容, 可以在查询中使用`populate()`方法, 将id替换为实际数据

可以通过分配`_id`值保存相关文档的引用

## 一模式(模型)一文件
建议将单一模式定义在单一模块(文件)中, 并通过导出方法来创建模型

## 架设 MongoDB 数据库

设置 MongoDB 数据库

云`mLab`/本地

安装 Mongoose
`npm install mongoose`

连接到 MongoDB
`app.js`

定义 `LocalLibrary`模式 `/models/` `author.js book.js bookinstance.js genre.js`

作者模型 `Author`: 为`AuthorSchema`声明了一个`url`属性, 返回模型特定实例的绝对`URL`, 模板中需要获取特定作者的连接时可使用该属性. 最后对模型进行导出
> 有必要将`URL`声明为虚拟属性, 这样一来, 项目的URL就只需在一处进行更改(?). 

## 路由和控制器

目标: 理解简单路由的创建方法, 设置示例中所有`URL`端点

### 概览

首先确定页面应该显示哪些信息, 然后定义适当的`URL`返回这些资源, 随后应创建路由(URL处理器)和视图(模板)来显示这些页面

HTTP请求/响应处理的主数据流和需要实现的行为.
* 路由(route): 需要把支持的请求(以及请求URL中包含的任何信息)转发到适当的控制器函数
* 控制器(Controller 实际的请求处理函数): 从模型中获取请求的数据, 创建一个HTML页面显示出数据, 并将页面返回给用户, 以便在浏览器中查看
* 视图(模板)(view(Template): 供控制器渲染数据
* 模型(Model 转换数据库信息)
* 数据库(Database 存储数据)

### 路由入门

路由是一段Express代码, 将HTTPmethod(GET, POST, PUT, DELETE等), URL路径/模式和处理函数三者关联起来

创建路由有几种方法

express.Router 中间件(?): 使用它可以将站点特定部分的路由处理程序打包, 并通过通用路由前缀访问它们; 我们会将所有与图书馆有关的路由保存在`catalog`模块中, 在添加处理账户或其他功能的路由时, 可以分开保存

### 定义和使用单独的路由模块

例中路由处理callback直接定义在路由函数中, library中路由处理callback定义在单独的Controller模块中

### 路由函数

Router.get() 定义的路由仅响应HTTP GET请求

Router.get("URL路径", callback(req, res){
    //响应请求
}

callback(req, res, next(中间链的下一个函数))

> 路由函数就是Express中间件, 意味着它们必须(通过完成响应)结束请求, 否则必须调用链中的next函数
> 可以根据需要指定任意数量的回调参数, 或一个回调函数数组. 每个函数都将加入中间件链, 并且将按添加顺序调用(若有回调完成请求则中止当前周期)

`res.send("关于此维基");` 此处回调响应对象调用`send()`方法, 收到`path`为(`/about`)的`GET`请求时返回字符串; 还有许多其他结束请求/响应的响应方法
* `res.json()` 返回`JSON`响应
* `res.sendFile()`发送文件
* library中最常使用`render()`, 使用模板和数据创建并返回``HTML`文件

### HTTP 方法

Router还有其他为特定HTTP请求提供路由方法
* post()
* put()
* delete()
* ...

### 路由 path

定义可请求的端点, 可以是具体字符串; 也可以是字符串模式(String Pattern)

字符串模式: 用部分正则表达式语法来定义端点的模式(`~`, `.`在字符串路径中解释为字面量, 不作为正则)
* `?`: 之前的一个字符只能出现零次或一次 `/ab?cd`匹配`acd` 或`abcd`
* `+`: 之前的一个字符至少出现一次 `/ab+cd` `/abcd` `/abbbcd`
* `*`: 可以替换为任意字符串 `/ab*cd` `/abXcd` `/abcd` `/abSOMErandomTexTcd`
* `()`: 将一个字符串是为一体执行`?` `+` `*` 操作 `/ab(cd)?e` `/abcde` `/abe`

也可以使用 JavaScript 正则表达式

```js
//NOTE 匹配 catfish dogfish , 不匹配 catflap catfishhead
app.get(/.*fish$/, (req, res)=>{
    //dosomething
});
```

### 路由参数

路由参数是命名的URL字段, 用于捕获URL中特定位置的值. 命名字段以`:`为前缀, 然后是名称(`/:your_parameter_name`). 值保存在`req.params` Object中(req.parems.your_parameter_name)
```js
//NOTE http://localhost:3000/users/34/books/8989 提取信息
app.get("/users/:userId/book/:bookId", (req, res)=>{
    //NOTE 通过req.params.userId 访问 userId
    //NOTE 通过req.params.bookId 访问 bookId
    res.send(req.params);
});
```

路由参数名必须由单词字符(`[A-Za-z0-9]`)组成

> `/book/create` 会匹配 `/book/:bookId` 路由(`bookId`值为`create`). 第一个与传入URL相匹配的路由会被使用, 因此`/book/create`的路由处理器要放在`/book/:bookId`之前

## Library 所需路由

* `<object>`模型名称(`book` `author` `bookinstance` `genre`)
* `<objects>` 一组模型
* `<id>` 是每个Mongoose模型实例默认的标识字段(`_id`)

路由列表
* `catalog/` 主页
* `catalog/<objects>/` 模型的完整列表(`/catalog/books/`)
* `catalog/<object>/id` 具有`_id`字段值的特定模型的详细信息(`/catalog/book/584493c1f4887f06c0e67d37`)
* `catalog/<object>/create` 添加新模型的表单 (`/catalog/book/create`)
* `catalog/<object>/<id>/update` 更新具有`_id`字段值的特定模型的表单(`/catalog/book/584493c1f4887f06c0e67d37/update`) 
* `catalog/<object>/<id>/delete` 删除具有`_id`字段值的特定模型的表单(`/catalog/book/584493c1f4887f06/delete`)

首页和模型列表页面没有包含任何额外信息, 它们返回的结果只取决于模型类型和数据库内容, 获取信息的查询操作时恒定不变的(同样, 创建对象的代码也没有较大改动)

相反, 其他URL是用于处理特定文档/模型实例的, 它们会将项目的标识嵌入URL(`<id>`).可以用路径参数来提取嵌入的信息, 并传递给路由处理器(动态获取数据库的信息).通过在URL中嵌入信息, 使得每种类型的所有资源只需要一个路由(所有藏书副本的显示操作只需要一个路由)

> Express 可以通过任何方式构造URL, 可以在URL正文中嵌入信息, 或使用URL GET方法(`/book/?id=6`)
> URL应保持整洁, 合理且易读

### 创建路由处理器回调函数

定义路由之前应使用单独的`Controller` 模块创建回调的结构骨架.(文件/模块结构没有限制)

#### Author控制器

`/controllers/authorController.js`

先导入用于访问和更新的模型(author.js), 然后为每个需要处理的URL导出一个函数

所有的函数都遵循Express中间件函数的标准形式, 参数依次为: 请求`req` `res` 当前方法无法完成请求循环时,调用的`next`函数

接收路径参数的控制器函数可将参数输出到消息字符串中(`req.params.id`)

#### BookInstance, Genre, Book 控制器
同上
### 创建藏书编目的`catalog`路由模组

在站点骨架中的`./routes`中添加一个`catalog.js`的路由文件

调用`express.Router()`, 控制器; 使用`router.get/post`为具体路由添加控制器方法, 最后将其导出

对`router`对象调用`.get()`或`.post()`函数即可定义路由, 所有路径都是用字符串定义. 某些特定资源(藏书)的路由使用路径参数从URL中获取对象标识
处理函数导入自控制器模块

### 更新index路由模块

我们将网站的首页重定向(redirect)至刚创建的地址`/catalog`

使用`res.redirect()`方法, 它会使路由重定向到指定的页面, 默认发送HTTP状态码`302 Found`, 可以根据需要更改返回的状态代码, 设置绝对或相对路径

### 更新app.js

在`app.js`中将路由添加到中间件链
* 添加catalog路由 `require("./routes/catalog")`
* 在已定义的路由下方将目录路由添加进中间件栈 `app.use("catalog", catalogRouter)`

> 我们将图书编目模块添加到了`/catalog`路径, 该路径是`catalog`模块所有路径的前缀(访问藏书列表 /catalog/books/)

### 测试路由

先启动网站

## 呈现图书馆数据

现在准备好由新增网页, 以显示本地图书馆网站的书本和其他资料, 这些网页将包括一个主页, 显示我们每个模型的形态由多少笔记录, 以及我们所有模型的清单与细节页面. 我们将得到从数据库取得记录, 以及使用样板的经验

### 概览

下一步, 为显示图书馆信息的网页, 提供充分的实作(包含更新控制器函数, 利用我们的模型取得记录, 定义模板, 为使用者显示这些信息)

## 使用 async 进行非同步流控制

本地图书馆网页的控制代码, 会依赖多重非同步要求的结果, 可能会需要以某种特定次序运行, 或者以平行方式运行(同时访问不同页面?). 为了管理流控制, 并在我们所有需要用到的信息, 都已经可以取用的时候, 再绘制网页, 我们将使用许多人采用的node `async` 模组

> javaScript中有许多其他方法, 可以管理异步行为和流控制, 包括相对较新的 JavaScript 语言功能 (`Promises`)

Async有很多有用的方法, 最重要的是
* async.parallel() 执行必须并行执行的任何操作
* async.series() 用于当需要确保异步操作是序列执行的
* async.waterfall() 用于必须序列运行的操作, 每个操作取决于前面操作的结果

### 为什么需要这么做

我们在Express中的大多数方法, 都是异步的-指定执行的操作, 传递回调. 方法立即返回, 请求的操作完成时, 调用回调. 按照Express中的惯例, 回调函数将错误值作为第一个参数传递(或成功时为null), 并将函数的结果(有的话)作为第二个参数传递

如果控制器只需要执行一个异步操作, 来获取呈现页面所需要的信息. 实现很简单
```js
//NOTE 呈现模型SomeModel的计数(Mongoose的count()方法)
exports.some_model_count = function(req, res, next) {
    SomeModel.count({a_model_field: "match_value"}, function(err, count){
        //...do something if there is an err

        //on success, render the result by passing count into the render function(here, as the variable 'data').
        res.render("the_template", {data: count});
    });
}
```
但是, 如果要进行多个异步查询, 并且在完成所有操作之前, 无法呈现页面, 怎么办?

一个单纯的实现可以用"菊花链(?)"连接请求, 在先前请求的回调中, 启动后续请求, 并在最终回调中呈现响应. 这个方法的问题是我们的请求必须串行运行, 即使并行运行它们可能更有效, 同时也会导致复杂的嵌套代码, 通常称为"回调地狱"

更好的办法是: 并行执行所有请求, 然后在所有查询完成后执行单个回调, 这就是Async模块简化的流操作

### 平行的非同步操作

`async.parallel()` 并行运行多个异步操作

`async.parallel()` 第一个参数是运行的异步函数的集合(数组,对象或其他可迭代); 每个函数都传递一个回调函数`callback(err, result)`, 必须在完成时调用错误`err`和可选的结果值

可选的第二个参数是一个回调, 在第一个参数中的所有函数完成时运行. 回调的调用, 是使用错误参数和包含各个异步操作结果的集合. 结果集合与第一个参数的类型相同(即, 如果传递异步函数数组, 则将使用结果数组,(如果传递的时对象, 则返回的result也是对象类型) 调用最终回调?) 如果任何并行函数报告错误, 则提前调用回调(具有err)

```js
//NOTE 传入包含回调函数的对象参数
async.parallel({
    one: function(callback){...},
    two: function(callback){...},
    ...
    something_else: function(callback){...}
},

//NOTE option callback, parallel第二个参数
function(err, results){
    //"results" is now equal to : {one: 1, two: 2, ... , something_else: some_value}
}
);
```
如果将一组函数, 作为第一个参数传递, 结果将是一个数组(? 数组顺序结果, 将于声明函数的原始顺序匹配, 而不是完成时的顺序)

### 序列的非同步操作

`async.series()` 方法用于按顺序运行多个异步操作, 后续函数不依赖于先前函数的输出. 它本质上是声明的(?declared)并且行为同`async.parallel()`相同
```js
async.series({
    one: function(callback){...},
    two: function(callback){...},
    ...
    something_else: function(callback){...}
},
//optinal callback after the last asynchronous function completes.
//在异步函数完毕后可选的回调函数
function(err, results){
    //"results" is now equals to : {one: 1, two: 2, ... , something_else: some_value}
}
);
```
> `ECMAScript`规范指出, 对象的枚举顺序是未定义的, 因此可能不会按照在所有平台上指定它们的顺序, 从而调用这些函数. 如果顺序很重要, 应该传递数组

```js
//NOTE 传递数组确保调用函数顺序
async.series([
    function(callback){
        //do some stuff
        callback(null, "one");
    },
    function(callback){
        //do some more stuff ...
        callback(null, "two");
    }
    ],
    // optional callback
    function(err, results){
        //result is now equal to ["one", "two"]
    }
);
```

### 依赖序列的非同步操作

`async.waterfall()`用于每个操作依赖于前一个操作的结果时, 依次运行多个异步操作

每个异步函数调用的回调, 包含第一个参数的`null`, 与后续参数里的结果. 序列中每个函数都将前一个回调的结果参数(err参数以外的参数), 作为第一个参数, 然后是回调函数.

完成所有操作后, 将使用上一操作的结果, 调用最终回调.
```js
async.waterfall([
    function(callback){
        callback(null, "one", "two");
    },
    function(arg1, arg2, callback){
        //arg1 now equals 'one' and arg2 now equals "two"
        callback(null, "three");
    },
    function(arg1, callback){
        //arg1 now equals "three"
        callback(null, "done");
    }
    ],
    function(err, result){
        //result now equals "done"
    }
);
```

## 模板入门 `Template`

模板是一个文字文件, 定义了一个输出文件的结构或`layout(布局)`, 使用定位符号表示, 当模板被绘制时, 资料将插入到何处(`Express`中, 模板称为视图(`views`))

### Express模板选择

可以和很多模板渲染引擎一起使用, 本例中使用`Pug`(之前称为`Jade` 官方描述受`Haml`影响很大)

不同的模板语言使用不同的方法来定义布局和标记数据的占位符--一些使用`HTML`来定义布局, 另一些则会使用可以编译为`HTML`的不同标记格式(Pug: 使用HTML的表示形式, 其中任何行中的第一个单词, 通常表示HTML元素, 后序行中的缩进表示嵌套在元素中的任何内容, 最后将一个页面定义直接转换为HTML)

缺点: 对空格和缩进敏感

### 模板形态(Template configuration)

创建骨架网站时, `library`配置为使用`Pug`(作为依赖, `package.json` `app.js`)
`views`中包含需要用自己内容替换的`index.pug`(主页模板) `layout.pug`(基本模板)

### 模板语法(Template syntax)

pug文件映射典型的HTML文件的结构, 其中(几乎)每一行的第一个单词时HTML元素, 并且缩进用于指示嵌套元素

元素属性被定义在其关联元素之后的括号中. 在括号内, 属性定义在以逗号或空格分隔的属性名称和属性值对的列表中

* `script(type="text/javascript")`, `link(rel="stylesheet", href="/stylesheets/style.css")`
* `meta(name="viewport" content="width=device-width initial-scale=1")`

所有属性的值都被转义(`>` `&gt;`) 防止注入JavaScript或跨站点脚本攻击

如果标记后跟`=`, 则以下文本将被视为JavaScript表达式. 默认行为是转义该行

```pug
h1= title
p= "Evaluated and <em>escaped expression</em>: " + title
```
没有`=`, 内容视为纯文本, 可以使用`#[]` 和`!{}` 语法, 插入转义和非转义数据

```pug
//#[]中存放需要转义的数据, !{}中存放不需转义的数据(原始HTML元素)
p This is #[em some emphasis] and !{"<strong>text</strong>"}, and ...
```
总是希望转义来自用户的数据, 可信任数据可以先不转义就显示

`|` 表示纯文本, 将显示在与前一个锚点相同的行上, 但不会连接

允许条件操作`if else else if unless(?)`

使用`each-in` `while` 执行循环/迭代操作, 迭代的值也可以传递给模板作为变量

```pug
ul
    each val in [1, 2, 3, 4, 5]
        li= val
```

支持注释(`<!---->` `//` `//-(不会渲染到HTML文档中)` )

### 扩展模板

支持声明一个基本模板, 然后只替换每个特定页面中不同的地方

`block` 用于标记"可在派生模板中替换的内容部分"(未重新定义块, 则使用在基类中的实现)

`extends` 标识要使用的基本模板, 使用`block section_name` 指示我们将覆盖的部分的新内容

## 本地图书馆基础模板

`./views/layout.pug`

使用来自`Bootstrap`的JS和CSS, 使用Bootstrap或其他客户端网页框架, 是一种快速的方式, 可以创建吸引人的网页, 能够良好的适应不同浏览器尺寸, 并允许我们处理页面的呈现, 而不需要纠结具体尺寸细节

基础模板也参考了一个本地CSS档, 提供一些额外样式

接下来, 根据模板创建各部分具体页面

## 主页

可以从`/`(root目录), 或`catalog/`(catalog的根目录)

我们已经为主页创建了一个路由, 我们需要更新Controller函数, 以从数据库中提取记录的"计数", 创建一个用于呈现页面的视图

### 路由

### 控制器

索引控制器函数需要以下信息, 即数据库中有多少`book` `bookinstance`, 可用的`bookinstance` `genre` `author`记录, 将数据渲染到模板中, 创建HTML页面, 然后将其返回到HTTP响应中

> 使用`count()`方法获取每个模型的实例数量, 在具有一组可选条件的模型上调用, 匹配第一个参数, 回调放在第二个参数(类似使用`Mongoose`), 并且还可返回`Query`, 然后以回调执行它, 当数据库返回计数时, 将返回回调, 并将错误值(或null)作为第一个参数, 记录计数(存在错误, 则返回null)作为第二个参数

```js
SomeModel.count({a_model_field: "match_value"}, function(err, count){
    //do something if there is an err
    //do something with the count if there was no error
});
```

`async.parallel()`方法传递一个对象, 其中包含用于获取每个模型计数的函数, 这些函数都是在同一时间开始的(平行),
当这些函数全部完成时, 最终回调将与结果参数中的计数(或错误)一起被调用

成功时, 回调函数调用`res.render`, 指定名为"`index`"的视图(模板), 以及一个对象包含了要插入的数据(以键值对的形式提供, 可以使用键在模板中访问)

> 我们使用的`async.parallel()`里的回调函数,将不管是否出现错误, 都会渲染页面(通常可能会使用单独的执行路径来处理错误显示)

### 视图

在`index.pug`中, 我们扩展了`layout.pug`模板, 覆盖了名为`content`的模块`block`. 第一个`h1`标题, 将是传递给`render()`函数的`title`变量的转义文本, 使得接下来的文本, 被视为`JavaScript`表达式. 然后我们放入了一个介绍本地图书馆的段落

在动态内容标题下, 我们检查从`render()`函数中传入的错误变量, 是否已定义. 如果定义, 我们列出这个错误. 否则, 我们从`data`变量中, 获取并列出每个模型的副本数量
> 我们并没有转义计数值(`!{}`语法), 因为数值已经计算过了. 如果信息是由终端用户提供的, 那么我们就会转义改变量

> 导入服务器本地 Bootstrap&jQuery app.js中导入public文件夹资源, 设置script.src link.href为 /public中对应文件夹/文件

## 书本列表页面

这个页面需要呈现数据库中所有书本的列表, 包含每本书的作者, 标题, 标题将成为一个超链接, 连接到书本详细内容页面

### Controller

需要获取数据库中所有`Book`对象的列表, 然后将这些对象传给模板进行呈现

该方法使用模型的`find()`函数返回所有`Book`对象, 选择仅返回标题`title`和作者`author`, 因为我们不需要其他字段(也会返回`_id`和虚拟字段). 这里我们还调用`Book`上的`populate()`, 指定作者`author`字段--这将用完整的作者信息替换存储的书本作者id

成功时, 传递给查询的回调, 将渲染`book_list(.pug)`模板, 将标题`title`和`book_list`(`title` `author`)作为变量传递

### View

创建`book_list.pug` 模板文件

这个视图扩展了`layout.pug`基本模板, 覆盖了名为`content`的区块`block`. 显示我们从控制器传入的标题`title`(`render()`方法), 然后使用`each-in-else`语法, 遍历`book-list`变量, 为每本图书创建一个列表项, 以显示书名, 并作为书的详细信息页面的连接, 后接作者名. 如果`book_list`中没有书, 则执行`else`子句, 显示文字`There are no books`

> 我们使用`book.url`, 为每本书提供详细记录连接. 这是`Book`模型的一个虚拟属性, 它使用模型实例的`_id`字段生成唯一的URL路径(`/catalog/book/:id`)

## 书本实例列表页面

实现书本副本(BookInstance)的列表页面. 这个页面需要包含与每个`BookInstance`(连接到其详细信息页面)关联的书本`Book`标题, 以及`BookInstance`模型中的其他信息, 包括每个副本的状态, 印记和唯一ID. 唯一ID和文字应该连接到`BookInstance`详细信息页面

### Controller

需要获得所有书本实例的列表, 填充关联的书本信息, 然后将列表传递给模板进行呈现

使用模型的`find()`, 返回所有`BookInstance`对象. 然后将调用, 以"菊花链"方式连接到`populate()`, 附加书本`book`字段, 使用完整的`book`文档, 替换每个`BookInstance`存储的`bookId`

成功时, 传递给查询的回调, 会呈现`bookinstance_list`模板, 将`title` `bookinstance_list`作为变量传递

### View

扩展了`layout.pug`, 替换内容区块, 显示从控制器传入的标题`title`, 并遍历`bookinstance_list`中所有数据副本.
每个副本, 我们都会显示它的状态(添加类名在`span`元素后 `.text-danger` `.text-warning` `text-success`), 如果书本不可用, 则显示其预期返回日期

## 使用 `moment` 做日期格式化

显示更友好的`due_date`字段: December 6th, 2016

在`BookInstance`模型中创建一个返回格式化日期的虚拟属性, 使用`moment`(轻量的JavaScript日期库)做实际的格式化, 用于解析, 验证, 操作和格式化日期

> 我们也可以直接在`Pug`模板中, 使用`moment`格式化字符串, 或者其它地方. 只是通过使用虚拟属性, 与当前获得`due-date`的方式一样

### 安装`moment`

### 创建虚拟属性

`require("moment")`
为`BookInstanceSchema`添加虚拟属性

### 更新视图

修改视图中的`due_back`变量

## 作者清单页面, 分类清单页面, 自我挑战

作者列表页面, 需要呈现数据库中所有作者的列表, 有每位作者的名字, 并连接到作者的详细内容页面. 出生与死亡日期应该在名字后面, 位于同一列

### Controller

获取所有作者实例的列表, 然后将实例传递给模板进行渲染

该方法使用模型的`find()` `sort` `exec()`方法, 返回所有`Author`对象, 并按`family_name`的字母顺序排列, 传递给`exec()`方法的回调被调用, 并传入任何错误(无错误为null)作为第一个参数, 或成功时, 传入所有作者列表. 如果出现错误, 则调用带有错误值的下一个中间件函数, 没有错误, 呈现`author_list`模板, 传递页面标题`title` 作者列表`author_list`

### View

可以使用`moment`格式化出生日期与死亡日期
```js
//NOTE 判断日期是否存在, 不存在则输出""
return this.date_of_birth ? moment(this.data_of_birth).format("YYYY-MM-DD") : "";
```

## 种类细节页面

利用`_id`字段值(自动生成), 以呈现特定种类实例的信息. 此页面应该呈现种类名称, 各个种类的所有书本列表

### 控制器

`genreController.js`

`async.parallel`

所需种类记录的ID, 在URL的末尾编码, 并根据路由定义(/genre/:id/)自动提取. 通过请求参数(`req.params.id`)在控制器内访问ID. 他在`Genre.findById()`中用于获取当前种类. 还用于获取符合当前种类的所有`Book`对象, 就是在种类字段中具有种类ID的那些`Book.find({'genre': req.params.id})`

> 如果数据库中不存在该类型(被删除), 则`findById()`将成功返回, 但没有结果. 这种情况下, 我们想要显示一个"未找到"页面, 因此我们创建一个`Error`对象, 并将其传递给链中的下一个中间件函数`next`. 然后, 此消息将传递给我们的错误处理代码

渲染的视图是`genre_detail`, 传递了该类型的标题, `genre`和书本列表的变量(`genre_books`)

### View

`genre_detail.pug`

> 运行时可能会收到错误``Cast to ObjectId failed for value "593232323f0dedbb(_id值)" at path "_id" for model "Genre"
> 
> 这是来自`req.params.id`的`mongoose`错误, 解决这个问题, 首先需要在`genreController.js`页面上要求`mongoose`
> 
> `var mongoose = require("mongoose");`
> 
> 然后使用`mongoose.Types.ObjectId()`将`id`转换为可以使用的
> 
> ```js
> exports.genre_detail = function(req, res, next){
>   var id = mongoose.Types.ObjectId(req.params.id);
>   ...
> }
> ```

## 书本细节页面

呈现一本指定书本(book)的信息, 使用它的`_id`字段值作为识别, 接着是图书馆中书本的副本信息(bookinstance)的信息, 无论我们在哪里呈现一个作者, 种类或书本副本, 都应连接到它的细节页面

### Controllers

* (id: any, callback?: (err: any, res: T) => void): DocumentQuery<T, T, {}> & QueryHelpers

    * Finds a single document by its _id field. findById(id) is almost* equivalent to findOne({ _id: id }). findById() triggers findOne hooks.

此处控制器方法使用`async.parallel()`, 用平行的方式找到`Book`以及它的相应副本(BookInstance).

### View

`book_detail.pug`

在与该书相关的种类列表, 在模板中的例子, 如以下代码, 除最后一个类别外, 在于这本书相关的每个种类之后, 都会添加一个`,`
```pug
p #[strong Genre:]
    each val, index in book.genre
        a(href=val.url) #{val.name}
        if index < book.genre.length - 1
            |,
```

## 作者细节页面

呈现指定作者`Author`的信息, 使用`_id`字段的值识别, 接着是这个作者的所有书本`Book`列表

### Controller

引入`async` `Book`

使用`async.parallel()`, 用平行(`parallel`)的方式, 查询作者`Author`和书本`Book`实例, 并加上绘制本页面的回调, 如果2个要求成功, 就运行回调

### View

`author_detail.pug`

错误: 在Controller章节中, 代码最后内容`res.render...` 变量错误 `author_books: results.authors_books` 应为 `author_books: results.author_books`

## 书本实例细节页面

`BookInstance`细节页面, 用`_id`字段值做识别, 包含`Book`名称(同时也是连接), 接着是记录中的其他信息

### Controller

从路由提取特定书本副本的id(保存在`req.params.id`); 调用`BookInstance.findById()`, 并通过请求参数(`req.params.id`), 在控制器中访问, 然后调用`.populate()`来获取相关`Book`的详细信息

### View

`bookinstance_detail.pug`

### 自我跳战: 格式化日期属性, 为作者详情添加年龄(`lifespan`虚拟属性)

判断作者出生/死亡日期是否存在(`this_date_of_birth`/`this.date_of_death` != null(似乎`date_of_birth/death`不存在时输出值并非为null))

如果都存在; 虚拟属性`lifespan`就返回两者相减`toString`
如果出生日期存在, 但还未去世; 则`lifespan`为当前时间减去出生日期
否则输出`""` 空字符串

视图文件中, 根据`lifespan`属性是否为`""`空字符串, 为页面添加年龄显示

### 总结

现在已经为我们的网站, 创建了所有"只读"页面: 一个主页, 可以显示每一个模型的实例数量, 书本的列表与详细信息; 书籍副本, 作者, 种类

我们学到了许多基本知识, 有控制器, 在非同步作业时管理流控制, 只用Pug创建视图, 使用模型查询数据库, 如何从视图传送信息到模板, 如何创建并扩展模板; 如果用`moment`处理日期

## 使用表单

如何使用Express并结合Pug来实现HTML表单, 如何从数据库中创建, 更新和删除文档

### 概览

HTML表单在网页中用来收集用户信息, 并将信息上传到服务器.

表单和服务器交互数据也相对安全, 因为它使用POST请求发送数据, 保护不受跨站点请求伪造攻击(cross-site request forgery)的威胁

开发者需要给表单编写HTML, 在服务器上验证, 并且正确去除有害数据(浏览器(客户端也需要)), 对于不合法的字段, 要传给用户相应的错误信息, 当数据成功提交后, 处理数据, 并设法通知用户提交成功

### HTML表单

### 表单处理流程

1. 在用户第一次请求时显示默认表单
    * 表单可能包含空白字段(如果创建新纪录), 或者可能预先填充了初始值(需要更改记录, 或者存在默认值)
2. 接受用户提交的数据, 通常是在`POST`请求中
3. 验证并清理数据
4. 如果任何数据无效, 请重新显示表单-这次使用用户填写的任何值(之前填写的信息), 和问题字段的错误消息
5. 如果所有数据都有效, 请执行所需操作(保存数据至数据库, 发送通知电子邮件, 返回搜索结果, 上传文件等)
6. 完成所有操作后, 将用户重定向到另一页面

表单处理代码, 通常使用`GET`路由, 以实现表单的初始显示, 以及`POST`路由到同一路径, 以处理表单数据的验证和处理. 这是本例中使用的方法

Express本身不提供表单处理操作的任何特定支持, 但可以使用中间件, 以处理表单中的`POST`和`GET`参数, 并验证/清理它们的值

### 验证和清理

储存表单中的数据之前, 必须对其进行验证和清理

* 验证检查输入的值, 适用于每个字段(范围, 格式), 并且已为所有必填字段提供了值
* 清理删除/替换数据中的字符, 可能用于将恶意内容发送到服务器

我们适用`express-validator`模块, 执行表单数据的验证和清理

#### 安装

在项目根目录

```node.js
npm install express-validator --save
```
要在控制器中使用验证器, 必须从`express-validator/check` 和`express-validator/filter`模块中, 导入想要的函数

有许多可用函数, 允许一次检查和清理请求参数, 正文, 标头, cookie等数据, 或所有数据; 本例主要使用`body`, `sanitizeBody` `validationResult`

* `body(fields[, message])` 指定HTTP request body中的一组字段(POST)以及可选的错误消息, 如果测试失败, 则可以显示该字段. 验证标准以菊花链形式连接到body()方法
* `sanitizeBody(fields)` 指定一个正文要清理的字段, 然后将清理操作, 以菊花链形式连接到此方法
* `validationResult(req)` 运行验证, 以`validation`验证结果对象的形式, 提供错误. 在单独的回调中调用

验证和清理链, 是应该传递给Express路由处理程序的中间件(我们通过控制器, 间接地执行此操作). 中间件运行时, 每个验证器/清理程序都按指定的顺序运行

### 表单设计

Library中的许多模型都是相关/依赖的 - 例如, `book`-`author` `book`-`bookinstance`等. 这就出现一个问题, 我们应该如何处理用户希望的情况
* 在其相关对象尚不存在时, 创建对象(尚未定义作者对象的书籍)
* 删除另一个对象仍在使用的表单(删除仍有书本使用的种类)

本例中, 我们将简单声明表单只能
* 使用已存在的对象创建对象(因此用户在尝试创建任何`Book`对象前, 必须创建任何所需的`Author`和`Genre`实例)
* 如果对象未被其他对象引用, 则删除该对象(在删除所有关联的`BookInstance`对象之前, 无法删除对应的`Book`)

> 更"牢固"的实现, 可能允许你在创建新对象时创建依赖对象, 并随时删除任何对象(例如, 通过删除依赖对象, 或从数据库中, 删除对已删除对象的引用)

### Route

为了实现表单处理代码, 需要两个具有相同URL模式的路由

* `GET` 显示用于创建对象的新的空表单
* `POST` 验证用户输入的数据, 然后保存信息, 并重定向到详细信息页面(数据有效情况下), 或重新显示错误的表单(数据无效情况下)

### Create genre form

we define our page to create `Genre` objcets(the `Genre` has only one field, its `name`). we need set up routes, controllers, and views

### Import validation and sanitisation methods

To use the `express-validator` in our controllers we have to require the functions we want to use from the `exporee-validator/check` and `express-validator/filter` modules.

`genreController.js`

### Contorller-get route

`genreController.js` 

`genre_form.pug`

### Controller-post route

`genre_create_post`

The first thing to note is that instead of being a single middleware(中间件)
function(with arguments(req, res, next)) the Controller specifies an array of middleware functions. The array is passed to the router function and each method is called in order.

> This approach is needed, because the sanitisers/validators are middleware functions.

The first method in the array defines a validator(`body()`) to check that the name field is not empty(calling `trim()` to remove any trailling/leading whitespace before preforming the validation(?)). The second method in the array(`sanitizeBody()`)creates a sanitizer to `trim()` the name field and `escape()` any dangerous HTML characters

> Sanitizers run during validation do not modify the request.(what about `escape()`?) That is why we have to call `trim()` in both steps above!

After specifying the validators and sanitizers we create a middleware function to extract(?) any validation errors. We use `isEmpty()` to check whether there are any errors in the validation result. if there are then we render the form again, passing in our sanitised genre object and the array of error messages(`errors.array()`).

if the genre name data is valid then we check if a `Genre` with the same name already exists(as we don't want to create duplicates(?)). if it does, we redirect to the existing genre's detail page. if not, we save the new `Genre` and redirect to its detail page.

This same patterns is used in all our post controllers; we run validators, then sanitisers, the check for errors and either re-render the form with error information or save the data.

### View

The same view is rendered in both the `GET` and `POST` controllers/routes when we create a new `Genre`(and later on it is also used when we update a `Genre`). In the `GET` case the form is empty, and we just pass a ttitle variable. In the `POST` case the user has previously entered invalid data-in the `genre` variable we pass back a sanitized version of the enterd data and in the `errors` variables we pass back an array of error messages.

`genre_form.pug`

First we extend the `layout.pug` base template and override the `block` named `content`. We then have a heading with the `title` we passed in form the controller(via the `render()` method).

Next, we have the pug code for our HTML form that uses the `POST` method to send the data to the server, and because the `action` is an empty string, will send the data to the same URL as the page.(接上了可还行, HTML权威指南 空白的action会将表单传递到当前页面的URL)

The form defines a single required field of type "text" called "name". The default value of the field depends on whether the `genre` variable is defined.(!!!`undefined===genre?`) if called from the `GET` route it will be empty as this is a new form. if called from a `POST` route it will contain the (invalid) value originally entered by the user.

The last part of the page is the error code. This simply prints a list of errors, if the error variable has been defined(in other words, this section will not apper when the template is rendered on the `GET` route).

> This is just one way to render the errors. You can also get the names of the affected filds(?) from the error variable, and use these to control where the error message are rendered, whether to apply custom CSS, etc.

> Our validation uses `trim()` to ensure that whitespace is not accepted as a genre name. We can also validate that the field is not empty on the client side by adding the value `required` to the field definition in the from

## Create Author form

### Import validation and sanitisation methods

`authorController.js`

### Controller-get route

### Controller-post route

> Unlike with the `Genre` post handler, we don't check whether the `Author` object already exists before saving it, Arguably we should, though as it is now we can have multiple authors with the same name.

The validation code demonstrates serval new features:
* We can dasiy chain validators, using `withMessage()` to specify the error message to display if the previous validation method fails
* We can use the `optional()` function to run a subsequent validation only if a field has been entered(this allows us to validate optional fields).the `checkFalsy` flay means that we'll accept either an empty string or `null` as an empty value.
* Parameters are received from the request as strings. We can use `toDate()`(or `toBoolean`, etc)to cast these to the proper JavaScript types

### View

`author_form.pug`

> Some browers don't support the input `type="date`, so you won't get the datepicker widget or the default `dd/mm/yyyy` palceholder, but will instead get an empty plain text field. One workaround is to explicitly add the attribute `placeholder="dd/mm/yyyy"` so that on less capable browers you will still get information about the desired text format

## Create Book form

define a page/form to create `Book` objects. we need to get and display available `Author` and `Genre` records in our `Book' form

### Import validation and sanitisation methods

### Controller--get route

This uses the async module to get all `Author` and `Genre` objects. These are then passed to the view `book_form.pug` as variables named `authors` and `genres`(along with the page `title`).

### Controller--post route

First we validate and sanitize the data. if the data is invalid then we re-display the form along with the data that was originally entered by the user and a list of error messages. if the data is valid, we then save the new `Book` record and redirect the user to the book detail page

The first main difference with respect to the other form handling code is that we use a wildcard to trim and escape all fields in one go(rather than sanitising them individually)

The next main difference with respect to other form handling code is how we sanitize the genre infromation. The form returns an array of `Genre` items(while for other fields it return a string). In order to validate the information we first convert the request to an array(required for the next step).

we then use a wildcard(`*`) in the sanitiser to individually validate each of the genre array entries. this translate to "sanitise every item blow key `genre`"

The final difference with respect to the other form handling code is that we need to pass in all existing genres and authors to the form. In order to mark the genres that were checked by the user we iterate through all the genres and add the `checked="true` parameter to those that were in our post data(as reproduced in the code fragment blow).

### View

* The set of genres are displayed as checkboxes, using the `checked` value we set in the controller to determine whether or not the box should be selected
* The set of authors are displayed as a single-selection drop-down list, In this case we determine what author to display by comparing the id of the current author option with the value previosly entered by the user(passed in as the `book` variable). This is highlighted above

> if there is an error in the submitted form, then, when the form is to be re-rendered, the new book's author is identified only with a string(the value of the selected option in the list of authors). By contrast, the existing books' authors have `_id` properties that are not strings. So to compare the new with the existing we must cast each existing book's author's `_id` to a string.

## Create BookInstance form

### Control get route

The controller gets a list of all books(`book_list`)and passes it to the view

## Delete Author form


our strategy will be to only allow deletion of objects that are not referenced by objects(in this case that means we won't allow an `Author` to be deleted if it is referenced by a `Book`). In terms of implementation this means that the form needs to confirm that there are no associated books before the author is deleted. if there are associated books, it should display them, and state that they must be deleted before the `Author`
object can be deleted

### Controller--get route

The controller gets the id of the `Author` instance to be deleted from the URL parameter(req.params.id). It uses the `async.parallel()` method to get the author record and all associated books in parallel. When both operations have completed it renders the `author_delete.pug` view, passing variables for the `title`, `author` and `author_books`

### Controller--post route

First we validate that an id has been provided(this is set via the form body parameters, rather than using the version in the URL). Then we get the author and their associated books in the same way for the `GET` route. if there ara no books then we delete the author object and redirect to the list of all authors. If there are still books then we just re-render the form, passing in the author and list of books to be deleted.

> we could check if the call to `findById()` returns any result, and if not, immediately render the list of all authors. We've left the code as it is above for brevity(it will still return the list of authors if the id is not found, but this will happen after `findByIdAndRemove()`).

### View

The view extends the layout template, overing the block named `content`. At the top it display the author details. It then includes a conditional statement based on the number of `author_books`(the `if` and `else` clauses).
* if there are books associated with the author then the page lists the books and states that these must be deleted before this `Author` may be deleted
* If there are no books then the page displays a confirmation prompt. If the `Delete` button is clicked then the author id is sent to the server in a `POST` request and that author's record will be deleted.

### Add a delete control

we will add a `Delete` control to the Author detail view(the detail page is a good place from which to delete a record)

> In a full implementation the control would be made visible only to authorid users. However at this point we haven't got an authorisation system in place

## Update Book form

how to define a page to update `Book` objects. Form handing when updating a book is much like that for creating a book, except that you must populate the form in the `GET` route with values from the database.

### Controller-get route

The Controller gets the id of the `Book` to be updated from the URL parameter(req.params.id). It uses the `async.parallel()` method to get the specified `Book` record(population its genre and author fields) and lists of all the `Author` and `Genre` objects.

When the operations complete it checks for any errors in the find operation, and also whether any books were found.

> not finding any book results is not an error for a search - but it is for this application because we know there must be a matching book record. The code above compares for(results==null) in the callback, but it could equally well have dasiy chained the method or `Fail()` to the query.

We then mark the currently selected genres as checked and then renders the `book_form.pug` view, passing variables for `title`, book, all `authors`, and all `genres`.

### Controller - post route

### view

> This code change is required so that the book_form can be used for both creating and updating book objects(without this, there is an error on the `GET` route when creating a form).

#### Question 

BookInstance 删除操作 无法找到ID name="id" 对应 `req.body.id`

## 部署到生产环境

### 概览

之前一直在开发环境, 
* 选择托管Express应用程序的环境
* 对项目设置进行一些更改
* 设置生产级别的基础架构, 以服务网站

### 什么是生产环境

服务器计算机提供的环境, 可以在其中运行网站, 以供外部使用

* 网站运行的计算机硬件
* 操作系统
* 编程语言运行库和框架库
* Web服务器基础结构(Web服务器, 反向代理, 负载平衡等)
* 网站所依赖的数据库

服务器计算机可以位于本地或"云"上(运行在托管公司的数据中心的某台远程计算机)
远程服务器, 通常会以特定价格提供互联网连接, 和一些保证级别的计算资源(CPU, RAM, 存储器等)

这些可远程访问的计算/网络硬件, 称为基础即架构(`as Infrastructure as a Service`laaS)

其他托管服务提供商, 支持Express作为平台即服务(PaaS)产品的一部分

### 准备好发布网站

发布网站是, 要考虑的主要问题是网络安全性和性能, 至少, 需要删除开发期间, 错误页面上包含的堆栈跟踪, 整理日志记录, 并设置适当的标头, 避免许多常见的安全威胁.

### 设置 NODE_ENV 为 `production`

通过设置`NODE_ENV`环境变量为`production`, 来删除错误页面中的堆栈跟踪(默认`development`). 除了生成较为不详细的错误消息之外, 还要将变量设置为生产缓存视图模板, 和从CSS扩展生成的CSS文件; 可以提高性能

可以使用导出环境文件, 或使用OS初始化系统进行更改

> 这实际上是在环境设置, 而不是应用中所作的更改

### Log appropriately

记录呼叫会对高流量网站产生影响, 在生产环境中, 你可能需要记录网站活动(跟踪流量, 或记录API调用), 但你应尝试最小化为调试目的而添加的日志记录量

使用类似`调试debug`的模块, 通过设置环境变量, 来控制执行的日志记录

`var debug = require("debug")("author");` 调试变量使用名称"`author`"声明, 并将自动显示来自此对象的所有日志的前缀`author

然后, 你可以通过在`DEBUG`环境变量中, 将它们指定为`,`分隔符, 来启用特定日志集. 你可以设置显示作者和书籍日志的变量

```bash
set DEBUG=author,book
```

> 调用`debug`模块可以替换之前的`console.log()`或`console.error()`执行的日志记录. 

### 使用`gzip`/`deflate`压缩响应文件

Web服务器, 通常可以压缩发送回客户端的HTTP响应, 从而显著减少客户端获取和加载页面所需的时间. 使用压缩方法, 取决于客户端在请求中支持的解压缩方法(如果不支持压缩方法, 则响应将以未压缩的方式发送)

可以使用压缩中间件`compression`, 安装到项目中
```bash
npm install compression
```
打开`app.js` 导入压缩库, 使用`use()`方法, 将压缩库添加到中间链(出现在想要压缩的路由之前)

> 在生产中流量较大的网站, 不会使用此中间件, 而是使用类似`Nginx`这样的反向代理

### 使用`Helmet`避免被常见漏洞侵袭

`Helmet`是一个中间件包, 通过设置适当的HTTP标头, 来帮助保护应用, 免受一些众所周知的Web漏洞的影响

安装`Helmet`

在`app.js`中导入, 使用`app.use()`将模块添加到中间件链

## 服务器端编程

客户端编程: HTML CSS JavaScript 编写 -- 直接在浏览器中运行, 几乎没有访问底层操作系统的路径
客户端编程的一部分挑战就是如何优雅地处理浏览器兼容性问题

服务器端代码可用任何一种语言编写--有充分的权限访问服务器的操作系统

Web框架: 各种函数, 对象, 方法和其他代码结构的集合体, 被设计用来解决一些普遍问题, 加速开发