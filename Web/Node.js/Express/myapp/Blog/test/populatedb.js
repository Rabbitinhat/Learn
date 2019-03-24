console.log("添加实例程序, 将数据库地址作为参数");
const userArgs = process.argv.slice(2);
if(!userArgs[0].startsWith("mongodb://")){
    console.log("错误, 需要指定一个合法的MongoDB URL作为第一个参数");
    return;
}

const Article = require("../models/article");