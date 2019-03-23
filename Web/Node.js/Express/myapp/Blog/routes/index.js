var express = require('express');
//创建路由
var router = express.Router();

//指定路由
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//导出
module.exports = router;
