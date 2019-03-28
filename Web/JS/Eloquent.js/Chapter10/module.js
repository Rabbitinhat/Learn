//用于日期名称和数字间转换
//接口weekDay.name weekDay.number
const weekDay = function(){
    const names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return {
        name(number){return names[number];},
        number(name){return names.indexOf(name);}
    };
}();

console.log(weekDay.name(weekDay.number("Sunday")));

//将数据转换为代码执行
//eval
const x = 1;
function evalAndReturnX(code){
    eval(code);
    return x;
}


console.log(evalAndReturnX("var x = 2"));
console.log(x);

//Function构造器
let plusOne = Function("n", "return n + 1;");
console.log(plusOne(4));

//CommonJS
//定义简单的require
require.cache = Object.create(null);

function require(name){
    //检查请求模块是否已经加载
    if(!(name in require.cache)){
        //readFile构造函数, 读取文件并将内容作为字符串返回, 标准的JS(ES?)并没有这样的功能
        //但不同环境的JS提供了自己访问文件的方式, 这里假设readFile()存在
        let code = readFile(name);
        let module = {exports: {}};
        //
        require.cache[name] = module;
        //生成的包装函数
        let wrapper = Function("require, exports, module", code);
        //传入require, module.exports({}) module({exports: {}}}) 执行模块文件代码
        wrapper(require, module.exports, module);
    }
    //返回module.exports中导入的功能
    return require.cache[name].exports;
}

