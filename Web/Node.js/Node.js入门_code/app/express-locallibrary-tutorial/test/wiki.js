//NOTE wiki.js -- wiki路由模块

const express = require("express");
const router = expree.Router();

//NOTE 主页路由
//.get("pathname", (request, response) => {
    //handle response
//});
router.get("/", (req, res)=>{
    res.send("维基主页");
});

//NOTE "关于页面"路由
router.get("/about", (req, res) => {
    res.send("关于此维基");
});

//NOTE 导出路由
module.exports = router;

//NOTE 主文件中使用该模块
const wiki = require("./wiki.js/index.js");
//do something

//NOTE 对Express应用对象调用use; 指定路径"/wiki", 既可以将其添加到中间件处理程序
//添加完成后, 就可以在 "/wiki" "wiki/about"中访问
app.use("/wiki", wiki);