//严格模式
function canYouSpotTheProblem() {
    "use strict";
    //未声明变量,严格模式报错
    for(counter = 0; counter < 10; counter++){
        console.log("Happy happy");
    }
}

canYouSpotTheProblem();


"use strict";
function Person(name) {this.name = name;}
//不带new关键字, this不会绑定到新创建的实例中
let ferdinand = Person("Ferdinand");
console.log(name);

//(WorldState, Array) -> {direction: string, memory: Array}

//toUpperCase 测试
function test(label, body){
    if(!body()) console.log(`Failed: ${label}`);
}

test("convert Latin text to uppercase", ()=>{
    return "hello".toUpperCase() == "HELLO";
});

//Bug
function numberToString(n, base=10){
    let result = "", sign = "";
    if(n<0){
        sign = "-";
        n = -n;
    }
    do {
        console.log(n);
        result = String(n % base) + result;
        n /= base;
    }while(n > 0);
    return sign + result;
}

console.log(numberToString(13, 10));

//异常
function promptDirection(question){
    let result = prompt(question, "");
    if(result.toLowerCase() == "left") return "L";
    if(result.toLowerCase() == "right") return "R";
    //抛出错误
    throw new Error("Invalid direction: " + result);
}

function look(){
    if(promptDirection("Which way?") == "L"){
        return "a house";
    }else{
        return "two angry bears";
    }
}

//捕获错误
try {
    console.log("You see", look());
} catch(error){
    console.log("Something went wrong: " + error);
}

//异常后清理
const accounts = {
    a: 100,
    b: 0,
    c: 20
};

function getAccount(){
    let accountName = prompt("Enter an account name");
    if(!accounts.hasOwnProperty(accountName)){
        //抛出异常后,函数直接结束
        throw new Error(`No such account: ${accountName}`);
    }
    return accountName;
}

function transfer(from, amount){
    if(amounts[from] < amount) return;
    accounts[form] -= amount;
    accounts[getAccount()] += amount;
}

//改进,使用finally
function transfer(from, amount){
    if(amounts[from] < amount) return;
    let progress = 0;
    try{
        accounts[form] -= amount;
        progress = 1;
        //调用getAccount()产生错误,progress为1
        accounts[getAccount()] += amount;
        progress = 2;
    }finally{
        if(progress == 1){
            //修复错误,返回from扣除的结果
            accounts[from] += amount;
        }
    }
}

//定义新的错误类型
class InputError extends Error {}

function promptDirection(question){
    let result = prompt(question);
    if(result.toLowerCase() == "left") return "L";
    if(result.toLowerCase() == "right") return "R";
    throw new InputError("Invalid direction: " + result);
}

//断言
function firstElement(array){
    if(array.length == 0){
        //函数为空时,立刻抛出错误
        throw new Error("firstElement called with []");
    }
    return array[0];
}