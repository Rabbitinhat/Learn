var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//NOTE 添加catalog路由
const catalogRouter = require("./routes/catalog");
//NOTE 添加压缩库 compression
const compression = require("compression");
//NOTE 添加Helmet, 保护应用
const helmet = require("helmet");

var app = express();

//NOTE 将Helmet添加到中间件链(放在首部)
app.use(helmet());

/* 设置 Mongoose 链接 */
const mongoose = require("mongoose");
/* 替换 */
//NOTE 连接到mongoDB
const mongoDB = process.env.MONGODB_URL || "mongodb://localhost:27017/db";
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
/* 绑定错误事件 */
db.on("error", console.error.bind(console, "MongoDB 连接错误: "));

// view engine setup
//NOTE 使用pug作为模板引擎, 并会在./views中搜索模板
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//NOTE 将压缩库添加如中间链; 压缩全部route
app.use(compression());
//NOTE 导入public中的资源 css js img
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//NOTE 将catalog路由添加进中间件链
//.use(path, Request处理)
app.use("/catalog", catalogRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
