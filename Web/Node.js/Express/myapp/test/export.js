//NOTE require导入square.js(模块, 包含导出的area, perimeter两个方法)
//NOTE 同目录 ./moduleName
const square = require("./square");

//NOTE 调用模块的area方法
console.log("边长为4的正方形面积为 " + square.area(4));

//NOTE 同步API
console.log("First");
console.log("Second");

//NOTE 异步API
setTimeout(() => {
    console.log("First");
}, 3000);
console.log("Second");