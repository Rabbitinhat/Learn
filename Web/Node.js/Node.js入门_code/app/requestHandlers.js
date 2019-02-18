//由requestHandlers.js模块创建具体响应

//?
//引入"child_process"模块
//var exec = require("child_process").exec;
//导入fs模块(?FileSave)
var querystring = require("querystring");
var fs = require("fs");
//导入formidable模块
var formidable = require("formidable");
//传入响应对象作为参数
// /start页面
function start(response){
    console.log("Request handler 'start' was called.");
    
    //请求主体, 带文本区的HTML页面
    //注意属性值和引号之间不要有空格(<form>)
    var body = "<html>" +
    "<head>" +
    "<meta http-equiv=\"Content-Type\" content=\"text/plain; charset=UTF-8\" />" +
    "</head>" +
    "<body>" +
    "<form action=\"/upload\" method=\"post\" enctype=\"multipart/form-data\" >" +
    "<input type=\"file\" name=\"upload\" multiple=\"multiple\" />" +
    "<input type=\"submit\" value=\"Upload file\" />" +
    "</form>" +
    "</body>" +
    "</html>";

    //修改响应的内容类型为text/html
    //使浏览器将响应作为页面处理
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
    
}

// /upload页面
function upload(response, request){
    console.log("Request handler 'upload' was called.");

    //使用formidable模块
    var form = new formidable.IncomingForm();
    form.uploadDir = "tmp";
    console.log("about to parse");
    form.parse(request, function(error, fields, files){
        console.log("parsing done");
        //调用fs模块的renameSync方法
        //修改上传文件的保存路径
        fs.renameSync(files.upload.path, "./tmp/test.jpg");
        response.writeHead(200, {"Content-Type": "text/html"});
        //返回显示图片的页面
        response.write("received image:<br/>");
        //图片链接指向"/show", 获取保存在服务器的图片
        response.write("<img src=\"/show\" />");
        response.end();
    })
}

//添加图片显示的事件处理程序
function show(response){
    console.log("Request handler \"show\" was called.");
    //调用fs模块的readFile方法读取本地文件
    fs.readFile("./tmp/test.jpg", "binary", function(error, file){
        if(error){
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(error + "\n");
            response.end();
        }else{
            //成功读取文件则返回响应, Content-Type为image/img
            response.writeHead(200, {"Content-Type": "image/jpg"});
            response.write(file, "binary");
            response.end();
        }
    })

}

//导出函数
exports.start = start;
exports.upload = upload;
exports.show = show;