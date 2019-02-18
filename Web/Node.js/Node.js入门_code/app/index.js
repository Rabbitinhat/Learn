//导入自定义的server模块
var server = require("./server");

//导入自定义的router模块
var router = require("./router");

//导入requestHandlers模块
var requestHandlers = require("./requestHandlers");

//使用对象保存, 传递请求处理程序
//将不同URL映射到不同的请求处理程序
var handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;
//使用模块的start()方法, 创建服务器
//传入router模块的route函数
server.start(router.route, handle);