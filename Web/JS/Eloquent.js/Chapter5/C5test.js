//NOTE 抽象
function repeatLog(n){
    for(let i=0; i<n; i++){
        console.log(i);
    }
}

//NOTE 重复执行函数
//NOTE 将函数作为值来传递
function repeat(n, action){
    for(let i=0; i<n; i++){
        action(i);
    }
}

//NOTE 传递现创造的值
let labels = [];
repeat(5, i=>{
    labels.push(`Unit ${i+1}`);
});
console.log(labels);

//NOTE 高阶函数
//NOTE 新建一些函数
function greaterThan(n){
    return m => m>n;
}

let greaterThan10 = greaterThan(10);
console.log(greaterThan10(11));

//NOTE 修改其他函数
function noisy(f){
    return (...args) => {
        console.log("calling with", args);
        let result = f(...args);
        console.log("called with", args, ", returned", result);
        return result;
    };
}
noisy(Math.min)(3, 2, 1);

//NOTE 实现新的控制流
function unless(test, then){
    if(!test) then();
}
repeat(3, n=>{
    unless(n%2==1, ()=>{
        console.log(n, "is even")
    });
});

//NOTE 脚本数据集
var SCRIPTS = require("./scripts");
//NOTE forEach()
["a", "b"].forEach(l=>console.log(l));

//NOTE 过滤掉数组中未通过测试的元素
function filter(array, test){
    let passed = [];
    for(let element of array){
        if(test(element)){
            passed.push(element);
        }
    }
    return passed;
}

console.log(filter(SCRIPTS, script=>script.living));

//NOTE map()创建包含名称的数组
function map(array, transform){
    let mapped = [];
    for(let element of array){
        mapped.push(transform(element));
    }
    return mapped;
}

let rtlScripts = SCRIPTS.filter(s=>s.direction=="rtl");
console.log(map(rtlScripts, s=>s.name));

//NOTE reduce 归纳函数
function reduce(array, combine, start){
    let current = start;
    for(let element of array){
        current = combine(current, element);
    }
    return current;
}

console.log(reduce([1, 2, 3, 4], (a, b) =>a + b, 0));

//NOTE 使用reduce查找字符最多的脚本
function characterCount(script){
    return script.ranges.reduce((count, [from, to])=>{
        //NOTE count作为初始值, 上次回调的返回值
        console.log(`count is ${count}`);
        return count + (to - from);
    }, 0);
}

console.log(SCRIPTS.reduce((a, b)=>{
    //NOTE 返回范围最大的脚本值
    return characterCount(a) < characterCount(b) ? b : a;
}));

//NOTE 可组合性,找出数据集中使用和不再使用的语言的平均时间长度
function average(array){
    return array.reduce((a, b)=>a+b)/array.length;
}

//NOTE 还在使用的语言的平均时间
//NOTE s.living=true
console.log(Math.round(average(
    //NOTE 从左向右的顺序
    SCRIPT.filter(s=>s.living).map(s=>s.year)
)));

//NOTE 不再使用的语言的平均时间
//NOTE s.living=false
console.log(Math.round(average(
    SCRIPT.filter(s=>!s.living).map(s=>s.year)
)));

//NOTE 变为循环
let total = 0, count = 0;
for(let script of SCRIPTS){
    if(script.living){
        total += script.year;
        count += 1;
    }
}
console.log(Math.round(total/count));
//NOTE 使用字符码找到相应脚本元素
function characterScript(code){
    for(let script of SCRIPTS){
        if(script.ranges.some(([from, to])=>{
            return code >= from && code < to;
        })){
            return script;
        }
    }
    return null;
}
console.log(characterScript(121));