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


//NOTE 使用reduce查找字符最多的脚本
//NOTE 通过累加脚本元素的range
function characterCount(script){
    return script.ranges.reduce((count, [from, to])=>{
        return count + (to - from);
    }, 0);
}
//NOTE 找出range最大的脚本元素
console.log(SCRIPTS.reduce((a, b)=>{
    return characterCount(a) < characterCount(b) ? b : a;
}));

//NOTE  不使用高阶函数
let biggest = null;
for(let script of SCRIPTS){
    if(biggest == null || characterCount(biggest)<characterCount(script)){
        biggest = script;
    }
}
console.log(biggest);

//NOTE 可组合性,找出数据集中使用和不再使用的语言的平均时间长度
function average(array){
    return array.reduce((a, b)=>a+b)/array.length;
}

//NOTE 还在使用的语言的平均时间
//NOTE s.living=true
console.log(Math.round(average(
    SCRIPTS.filter(s=>s.living).map(s=>s.year)
)));

//NOTE 不再使用的语言的平均时间
//NOTE s.living=false
//NOTE filter, map 会建立新数组
console.log(Math.round(average(
    SCRIPTS.filter(s=>!s.living).map(s=>s.year)
)));

//NOTE 仅处理数字, 速度较快
let total = 0, count = 0;
for(let script of SCRIPTS){
    if(script.living){
        total += script.year;
        count++;
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

//NOTE 两个emoji字符 每个字符有两个代码单元 horse and shoe
let horseShoe = "\ud83d\udc34\ud83d\udc5f";
console.log(horseShoe.length);
console.log(horseShoe[0]);
//?
console.log(horseShoe.charCodeAt(0));
console.log(horseShoe.codePointAt(0));

let roseDragon = "\ud83c\udf45\ud83d\udc09";
for(let char of roseDragon){
    console.log(char);
}

//NOTE 计算每个脚本的字符
function countBy(items, groupName){
    let counts = [];
    for(let item of items){
        let name = groupName(item);
        //NOTE 返回数组中给定函数返回true的第一个值
        let known = counts.findIndex(c=>c.name == name);
        if(known == -1){
            counts.push({name, count: 1});
        }else{
            counts[known].count++;
        }
    }
    return counts;
}

console.log(countBy([1, 2, 3, 4, 5], n=>n>2));

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
//NOTE 
function textScripts(text){
    let scripts = countBy(text, char=>{
        let script = characterScript(char.codePointAt(0));
        return script ? script.name : "none";
    }).filter(({name})=>name != "none");

    //?
    let total = scripts.reduce((n, {count})=>n + count, 0);
    if(total == 0) return "No scripts found";

    return scripts.map(({name, count})=>{
        return `${Math.round(count*100/total)}% ${name}`;
    }).join(", ");
}

console.log(textScripts("英国的狗说\"woof\""));