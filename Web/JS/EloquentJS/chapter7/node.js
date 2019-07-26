try {
  var a = null
  var b = a
  
  // * 主动抛出错误, 在try语句中使用, 会被对应的catch语句捕捉到错误, 在正常流中使用throw无法被catch捕捉
  //throw 8 //=> error = 8
  throw new Error("Something bad happens")
}catch(e){
  console.log("error:", e)
}finally{
  console.log("finally")
}

// * 先检查是否存在语法错误, 在执行(解释)代码

function foo(){
  // * try, catch 捕捉错误后, 程序继续执行
  try{
    bar()
  }catch(e){
    console.log("get", e)
  }

  console.log(112)
  return 4
}

function bar(){
  baz()
}

function baz(){
  throw "bad thing"
}

try {
  console.log(foo())
}catch(e){
  console.log("err", e)
}

b:
for(let i=0; i<8; i++){
  for(let j=0; j<8; j++){
    if(true) continue b
  }
}

// ! 10:55
// console.log((it) => {next: 
//   null,
//   val: //* ?
//   it
// })

// * label
label:
while(true){
  break label;
}

// * strict mode

function canYouSpotTheProblem(){
  // "use strict" 
  for(counter = 0; count < 10; counter++){
    console.log("Happy happy")
  }
}

canYouSpotTheProblem()

let obj = {
  a: 2,
  b: 3
}
with(obj){
  a=5
  b=4
  // ?
  newguy = "Smith"
}

console.log(obj.newguy)

function f(a, a, a){
  return a + a + a
}

f(1, 2, 3) //=> 9

function f(a, a, a){
  return arguments[0] + arguments[1] + a
}

f(1, 2, 3) //=>6

"use strict"
var b = 023 //=> error
var a = 0O23
console.log(a) //=> 19

var a = 8
var b = 9
// * 返回""中语句执行完毕的结果
eval("console.log(a + b); 33;") //=>17, 33

var f = new Function("a + b")() //=> 17 

// * 使用对象保存递归时元素的状态


// * test framework
// * mocha 读取所在文件夹的test.js/test floder
// * npm install -g mocha

// * 测试: 只适合需求变更不频繁 
describe('Vector', function(){
  it('some message', function(){

  })
})  

Number.isNaN() // * 仅NaN => true
window.isNaN() // * 不是数字类型时返回NaN

prompt("name?")

// * at <anonymous(文件名)>:x:y(错误位置) 匿名函数, 表示最外层环境(调用栈底层)

function a(){
  b()
}

function b(){
  c()
}

function c(){
  throw new Error("bad thing")
}

a()

/**
 * e.stack
 * e.message
 * e.name: error type
 */


Error: bad thing
    at c (c:\Git\Learn\Web\JS\EloquentJS\chapter7\tempCodeRunnerFile.js:11:9)
    at b (c:\Git\Learn\Web\JS\EloquentJS\chapter7\tempCodeRunnerFile.js:7:3)
    at a (c:\Git\Learn\Web\JS\EloquentJS\chapter7\tempCodeRunnerFile.js:3:3)
    at Object.<anonymous> (c:\Git\Learn\Web\JS\EloquentJS\chapter7\tempCodeRunnerFile.js:14:1)
    at Module._compile (internal/modules/cjs/loader.js:759:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:770:10)
    at Module.load (internal/modules/cjs/loader.js:628:32)
    at Function.Module._load (internal/modules/cjs/loader.js:555:12)
    at Function.Module.runMain (internal/modules/cjs/loader.js:826:10)
    at internal/main/run_main_module.js:17:11


class InputError extends Error{
  constructor(message){
    // * 传递message, 继承Error, 获得stack
    super(message)
  }
  get name(){
    return "Input Error"
  }
}

var a = 1
function f(){
  var a = 2
  eval("console.log(a)")
}

f()


var a = 1
function f(){
  var a = 2
  // ? let run 绑定时, 会发生错误
  // * eval正常运行时, 位于当前作用域
  // * 当eval被赋值给其他变量时, 运行时位于全局作用域(global scope)
  var run = eval
  eval("console.log(a)")
}
f()


let a = 1
let b = 77

{
  let a = 1
  let b = 2
  // * eval 取得调用时作用域中的变量 => 正常函数需要传递参数
  eval("console.log(a + b)")
}

eval("console.log(a + b)")

function makeWith(...args){
  var action = args.pop()
  try{
    action(...args)
  }finally{
    for(var file of files) file.close()
  }

}

makeWith(open("a.txt"), open("b.txt"), function(fa, fb){
  
})