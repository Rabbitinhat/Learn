

// Chapter2 string & regular expression
// 16进制数字
console.log('\u{6211}')

// 模板字符串
`foo bar`
// 传入值时, 并不是直接进行拼接, 不会产生注入漏洞

// RegExp
// y
var re = /foo/y

// chapter3 Functions
// default parameters 默认参数
function f(a, b=2, c=3){
  console.log(a + b + c)
}

// 剩余参数
function f(a, b, ...resArgs){
  // do something
}
// 展开运算符
f(...[1, 2, 3, 4])
// 展开运算符优先级较低
f(...a.b.c)

// REVIEW 浅复制
c = [1, 2, 3]
b = [...c]

// 是否由new operation 调用
function F(){
  if(new.target === F){

  }

  // F.call(new F())
  if(this instanceof F){

  }
}

// 展开标签属性
<div {...a}></div>

// es6中, 匿名函数也可返回被赋值变量名
// f.name 值固定
f.nanme
f.toString()
// 普通参数数量
f.length

var foo = function(){}
var c = foo
// => foo
c.name

// 块级作用域
// es5

if(true){
  function doSomething(){
    // es5中该函数会被 提升至全局作用域
  // es6中存在块级作用域， 会提升至if所在块级作用域顶部
  }
}

// REVIEW arrow function
// p54

var a = () => ({a})

// 尾调用
// 尾递归优化
function f(){
  var a = 1
  return g(a)
  //REVIEW  返回g时，函数调用栈中可以不包含f()
}

function fibb(n){
  return fibb(0, 1, n)
  function fibb(a, b, n){
    if(n === 0){
      return a
    }else{
      return fibb(b, a + b, n - 1)
    }
  }
}

//chapter4 Object
// exotic objects 外来对象
// 无法观察内部结构, 由外部实现的而非语言本身实现的对象
// Date RegExp...

var obj = {
  
  // 普通方法简写
  a(){

  },

  // 生成器方法简写
  *g(){

  },

  async b(){

  },
}

// obj[3+2] = 12

Object.is(NaN, NaN)

// 对象解构


// 原始数据类型
// 名字相同的symbol 为同一个
// 无法修改?
// 无法通过 in 读取
Symbol()

// 私有属性
class A {
  constructor(){
    this.foo = 8
  }
}

// 

let firstName = Symbol()
let person = {}

person[firstName] = 'Nicholas'
console.log(person[firstName])

typeof firstName //=> 'symbol'



// Iterators & generators
// Es8
// async iterator 异步迭代器
// {value: Promise, done: true/false}
// 用法: 
for await (var val of obj){
  // return async iterator
}

async function forAwait(asyncIterable, body){
  while(true){
    var generated = asyncIterable.next()
    if(!generated.done){
      var val = await generated.value // => promise
      await body(val)
    }else{
      // REVIEW 
      return generated.value
    }
  }
}

forAwait(asyncIterable, val => {
  
})

asyncArray.forEach(async url => {

})


Array.prototype.asyncForEach = async function(f){
  // 串行执行
  for(let i of this){
    await f(i)
  }

  // 并行, 建立所有异步函数, 等待全部返回
  var promises = this.map(f)
  await Promise.all(promises)
}

// chapter 10 Array

// return array element
Array.find()

// return index
Array.findIndex() 

// Typed Arrays => Buffer(node)

// class

// REVIEW 
// Cat.__proto__ = Creature


// Cat.prototype.__proto__ === Create.prototype
class Cat extends Creature{
  // 构造函数自身的方法
  static from (){

  }

  constructor(name, age){
    // 
    super.methodFromCreature
    super(age)
  }
}


function PriorityQueue(){

}


function People(name, age, gender){
  // 创建父类Creature的实例
  // 将该实例作为this
  var _this = new Creature(age)
  
  
  _this.__proto__ = People.prototype
  _this.name = name
  _this.gender = gender
  return _this
}


// proxy

var proxy = new Proxy(function f(){}, {
  get: function(target, propName){
    console.log('getting', propName)
    return 2
  },

  set: function(target, propName, val){
    console.log('setting', propName, 'to', val)
    return 3
  },

  apply: function(target, thisArg, args){
    console.log(arguments)
  },

  construct: function(target, args){
    console.log(target, args)
  }
})



// 利用proxy拦截传入的用例
// 保存至testCases中

var _ = new Proxy({}, {
  get: function(target, prop){
    // 存储prop的函数的测试用例
    if(!(prop in testCases)){
      testCases[prop] = []
    }
    return function(...args){
      testCases[prop].push(...args)
    }
  }
})


// module
// 导入
import {module} from 'file'


// 导入
// module 要位于最外层， 不能位于函数，块级作用域内
// 默认导出, 非默认导出
// 默认导出不限定变量名
// 非默认导出使用原有的变量名
// 可以进行静态分析=》 不运行代码就可以进行分析(尾递归, 模块导入s)
// import
export var myModule = 'something'