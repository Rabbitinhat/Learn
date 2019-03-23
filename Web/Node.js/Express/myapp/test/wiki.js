//wiki.js -- 维基路由模块

//NOTE 导入express
const express = require("express");
//NOTE 创建router
const router = express.Router();

//NOTE 添加路由处理器
router.get("/", (req, res){
    res.send("维基首页");
});

router.get("/about", (req, res){
    res.send("关于维基");
});

//NOTE 使用module导出一组路由(整个router对象)
module.exports = router;