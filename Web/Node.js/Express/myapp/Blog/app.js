//导入库
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//导入路由模块
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//创建应用对象(app, application)
var app = express();

//设置视图模板
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//添加中间件库进请求处理链
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//托管静态文件
app.use(express.static(path.join(__dirname, 'public')));

//导入路由
app.use('/', indexRouter);
app.use('/users', usersRouter);

//添加错误处理方法
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

//导出app对象(/bin/www导入)
module.exports = app;
