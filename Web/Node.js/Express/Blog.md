# My Blog

## 需求

* 首页
* 编辑文章
* 文章分类
* 文章详情页

## 文件改动后重启服务器

`nodemon`(自动化操作)

全局安装(否则只能将其添加到path才能从命令行启动)

作为开发依赖安装在本地
```
npm install --save-dev nodemon
```

`package.json`

```js
  "devDependencies": {
    "nodemon": "^1.18.10"
  }
```

添加新脚本

```js
  "scripts": {
    "devstart": "nodemon ./bin/www"
  },
```

启动服务器

```
DEBUG=Blog:* npm run devstart
```

## 模板结构

`package.json`定义依赖项(dependencies)和其他项目信息, 和调用入口的启动脚本(`/bin/www`)
`/routes`保存路由, `/views`保存视图模板, `/public`保存静态文件

## 数据库连接

### 链接数据库

mongoose.connect(mongoDB url);

mongoose.createConnection(mongoDB url); 创建其他链接

### 定义和添加模型

使用`Schema`接口进行定义

## 路由

路由函数中, 可以指定任意数量的回调参数, 或一个回调函数数组(每个函数都加入中间件链, 按顺序调用)