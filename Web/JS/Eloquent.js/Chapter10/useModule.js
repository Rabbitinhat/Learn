//导入formatDate模块
const {formatDate} = require("./format-date");
const {parse} = require("ini");
const roadGraph = require("./roadGraph");
console.log(roadGraph);
console.log(formatDate(new Date(2017, 9, 13), "dddd the Do"));
console.log(parse("x=10\ny=20"));