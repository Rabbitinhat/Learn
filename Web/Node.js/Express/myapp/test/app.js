//Hello World Express
const express = require("express");
//NOTE 创建express实例, 通常命名为app
const app = express();

//NOTE 指定模板引擎
//NOTE 设置包含模板的文件夹("views")
app.set("views", path.join(_dirname, "views"));
//NOTE 设置视图引擎
app.set("view engine", "some_template_engin_name(pug...)");

//NOTE 使用res.render()向指定模板文件(index)传入数据(title, message)
app.get("/", (req, res)=>{
    res.render("index", {title: "备忘", message: "出门带钥匙"});
})
//NOTE 路由,处理响应
//NOTE 路由定义.并指定一个回调函数,callback函数监听每一个关于路径("/")的HTTP GET请求时调用
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
//NOTE app.all调用响应任意HTTP方法(HTTP方法作为第一个参数, 作为中间件函数)
app.all("select", (req, res, next) => {
    console.log("Do something...");
    //NOTE 将控制权传递给下一个处理器
    next();
})

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

//NOTE 处理错误的中间件函数
app.use((err, req, res, next){
    console.error(err.stack);
    res.status(500).send("Wrong!");
})
app.listen(3000);
//NOTE 监听端口
//NOTE 在端口3000上启动服务器,并在控制台打印消息
app.listen(3000, ()=>{
    console.log("正在监听3000端口");
});