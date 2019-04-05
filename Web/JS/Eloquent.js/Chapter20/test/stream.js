//
const {createServer} = require("http");
createServer((request, response) => {
    response.writeHead(200, {"Content-Type": "text/plain"});
    //注册data事件 有data传输时触发
    request.on("data", chunk => response.write(chunk.toString().toUpperCase()));
    //注册end事件, data传输完毕后触发
    request.on("end", ()=>response.end());
}).listen(3000);

const {request} = require("http");
request({
    hostname: "localhost",
    port: 3000,
    method: "POST"
}, response => {
    response.on("data", chunk => {
        //进程的标准输出流
        process.stdout.write(chunk.toString())
    });
}).end("Hello server");