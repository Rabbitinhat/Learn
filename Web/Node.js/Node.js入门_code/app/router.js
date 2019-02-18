//处理有关response部分
function route(handle, pathname, response, request) {
    console.log("About to route a request for " + pathname);
    //判断对应路径(path)的请求处理程序是否存在
    if(typeof handle[pathname] === "function"){
        //调用对应路径名函数
        //返回事件处理程序返回的消息
        //使用事件处理程序处理数据块
        handle[pathname](response, request);
    }else{
        //若没有对应的请求处理程序, 返回404响应
        console.log("No request found for " + pathname);
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not Found");
        response.end();
    }
}

exports.route = route;