let {readFile} = require("fs");
//解析字符串
readFile("file.txt", "utf8", (error, text) => {
    if(error) throw error;
    console.log("The file contains:", text);
});

//解析二进制数据
const {readFile} = require("fs");
readFile("file.txt", (error, buffer) => {
    if(error) throw error;
    console.log("The file contained", buffer.length, "bytes");
    console.log("The first byte is ", buffer[0]);
});

//将文件写入磁盘(输出)
consot {wirteFile} = require("fs");
writeFile("graffiti.txt", "Node was here", err=>{
    if(err) console.log(`Failed to write file: ${err}`);
    else console.log("File written.");
});

//fs/promise package
const {readFile} = require("fs/promises");
readFile("file.txt", "utf8")
    //使用promise而非回调处理
    .then(text => console.log("The file contains:", text));

//readFile 同步版本 readFileSync
const {readFileSync} = require("fs");
console.log("The file contains:", readFileSync("file.txt", "utf8"));