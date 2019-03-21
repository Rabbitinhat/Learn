//Hello World Express
const express = require("express");
//NOTE 创建express实例, 通常命名为app
const app = express();

//NOTE 路由,处理响应
//NOTE 路由定义.并指定一个回调函数,callback函数监听每一个关于路径("/")的HTTP GET请求时调用
app.get("/", (req, res)=>{
    res.send("Hello World!");
});

//NOTE 监听端口
//NOTE 在端口3000上启动服务器,并在控制台打印消息
app.listen(3000, ()=>{
    console.log("正在监听3000端口");
});