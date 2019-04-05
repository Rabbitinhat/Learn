//文件服务器
//结合HTTP服务器和文件系统, 允许远程访问系统文件

//存储HTTP method处理器
const {createServer} = require("http");
const methods = Object.create(null);

createServer((request, response) => {
    let handler = methods[request.method] || notAllowed;
    handler(request)
        //.catch将错误转化为响应对象
        .catch(error => {
            if(error.status != null) return error;
            return {body: String(error), status: 500};
        })
        .then(({body, status = 200, type = "text/plain"}) => {
            response.writeHead(status, {"Content-Type": type});
            if(body && body.pipe) body.pipe(response);
            else response.end(body);
        });
}).listen(3000);

async function notAllowed(request){
    return {
        status: 405,
        body: `Method ${request.method} not allowed.`
    };
}

//找到请求文件路径path
const {parse} = require("url");
const {resolve, sep} = require("path");

//? 查找当前工作目录
const baseDirectory = process.cwd();

function urlPath(url){
    let {pathname} = parse(url);
    let path = resolve(decodeURIComponent(pathname).slice(1));
    //? 当path不开始于当前目录时(../访问上一级目录)
    if(path != baseDirectory && !path.startsWith(baseDirectory + sep)) {
        throw {status: 400, body: "Forbidden"};
    }
    return path;
}

//查找文件并返回结果, 处理GET请求
const {createReadStream} = require("fs");
const {stat, readdir} = require("fs").promises;
const mime = require("mime");

methods.GET = async function(request){
    let path = urlPath(request.url);
    let stats;
    try {
        //? await
        stats = await stat(path);
    }catch(error){
        if(error.code != "ENOENT") throw error;
        else return {status: 404, body: "File not found"};
    }
    if(stats.isDirectory()){
        return {body: (await readdir(path)).join("\n")};
    }else{
        return {body: createReadStream(path), type: mime.getType(path)};
    }
}

//处理DELETE请求
const {rmdir, unlink} = require("fs").promises;

methods.DELETE = async function(request){
    let path = urlPath(request.url);
    let stats;
    try {
        stats = await stat(path);
    }catch(error){
        if(error.code != "ENOENT") throw error;
        else return {status: 204};
    }
    if(stats.isDirectory()) await rmdir(path);
    //?
    else await unlink(path);
    return {status: 204};
};

//PUT请求
const {createWriteStream} = require("fs");

//使用.pipe将可读流中的数据转移到可写流中
function pipeStream(from, to){
    return new Promise((resolve, reject) => {
        //当打开文件, 或传输出现错误
        from.on("error", reject);
        to.on("error", reject);
        //传输完成时, 解析Promise
        to.on("finish", resolve);
        //?
        from.pipe(to);
    });
}

methods.PUT = async function(request) {
    let path = urlPath(request.url);
    await pipeStream(request, createWriteStream(path));
    return {status: 204};
};