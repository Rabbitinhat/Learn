//简单的服务器

//导入http模块
var http = require("http");

//导入 url 模块
var url = require("url");


//将服务器脚本放入start函数中, 从而可以导出函数
//为start函数添加参数(路由函数)
function start(route, handle) {
    var onRequest = function (request, response) {

        //调用url.parse() 转换请求的url
        //调用.pathname() 方法获得请求url的 pathname 值
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");

        route(handle, pathname, response, request);
    }
/*         //编写响应头部
        //状态码: 200
        //Content-Type: text/plain
        //发送响应" Hellow World"
        //响应结束
        response.writeHead(200, { "Content-Type": "text/plain" });
        //调用路由, 传入请求处理程序和pathname
        //将返回信息添加到响应实体
        var content = route(handle, pathname);
        response.write(content);
        response.end();
    } */
    //调用createServer方法创建服务器
    http.createServer(onRequest).listen(8888); //调用listen方法监听 8888 端口
    //终端提示文本
    console.log("Server running at http://127.0.0.1:8888/");
}

//? exports
exports.start = start;
