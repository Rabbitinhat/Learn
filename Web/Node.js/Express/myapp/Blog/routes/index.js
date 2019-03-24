var express = require('express');
//创建路由
var router = express.Router();

//指定路由
/* GET home page. */
router.get('/', (req, res) => {
  res.redirect("/articles");
});

//导出
module.exports = router;
