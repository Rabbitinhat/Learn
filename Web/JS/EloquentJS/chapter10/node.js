// @ts-check

/**
 * 
 * @param {String} path 
 */
function require(path) {
  // * 从文件中读取函数部分
  var filecontent = readFile(path);
  var f = new Function("export", "module", filecontent);
  var exports = {};
  var module = {};
  module.exports = exports;
  f(exports, module);
  return module.exports;
}

obj.add = function add(a, b) {
  return a + b;
};
obj.sub = function sub(a, b) {
  return a - b;
};

module = yy;
exports = uu;
module.exports = xxx;
module.exports.xx = 9;
exports.add = function add(a, b) {
  return a + b;
};

/**
 * 
 * @param {String} path 
 */
function require(path) {
  // * .moduleCache 存储已require的path的文件, 再次require时, 直接从缓存中读取
  if (require.moduleCache.hasOwnProperty(path)) {
    return require.moduleCache[path];
  }

  //
  var code = readFile(path);
}

// * 生成器函数 Generator Function
// FIXME 
function fibb(n) {
  let a = 0;
  let b = 1;
  return {
    next: function() {
      b = a + b;
      a = b - a;
      return a;
    }
  };
}

function* fibb(n) {
  let a = 0;
  let b = 1;
  while (n--) {
    yield a;
    b = a + b;
    a = b - a;
  }
}

// * 暂停函数, done时读取返回值
function* gen() {
  let a = yield 1;
  console.log(a);
  let b = yield 2;
  console.log(b);
  let c = yield 3;
  console.log(c);
  return c;
}

gen.return(n); //=> {value: n, done: true} 直接中断程序, 返回该结果, 且yield不返回值
gen.throw(n); //=> 抛出错误, try-catch可以捕获错误, 继续执行(返回下一次yield的结果)

function forof(generator, action) {
  var generated = generator.next();
  while (!generated.done) {
    if (action(generated.value) === false) break;
    generated = generator.next();
  }
}

forof(fibb(20), num => {
  return false;
});

// function forof(generator, action){
//   var generated = generate.next()
//   while(!generated.done){
//     if(action())
//   }
// }

// => Symbol() 非构造函数, 独立, 主要作为对象属性名(作为独特的属性); 无法进行类型转换(toString(), String(n)可以)

for(var val of [1, 2, 3][Symbol.iterator]){
  console.log(val)
}


// NOTE 
/**
 * @param
 */
Number.prototype[Symbol.iterator] = function*(){
  for(var i=1; i<=this; i++){
    yield i
  }
}

for(var i of 10){
  console.log(i)
}

// Number.prototype.digits[Sy] = function*(){
//   let result = this.toString()
//   for
// }

function makeRangeIterator(start=0, end=Infinity, step=1){
  let nextIndex = start
  let iterationCount = 0

  const rangeIterator = {
    next: function(){
      let result
      // NOTE 
      if(nextIndex < end){
        result = {value: nextIndex, done: false}
        nextIndex += step
        iterationCount++
        return result
      }
      return {value: iterationCount, done: true}
    }
  }
  return rangeIterator
}

function* makeRangeIterator(start=0, end=100, step=1){

  for(let i=start; i<end; i+=step){
    yield i
  }
}

function* nature(n){
  for(let i=0; i<=n; i++){
    yield i
  }
}

function* prime(n){
  for(let i=2; i<=n; i++){
    if(i % 2 === 0 && i !== 2) continue
    if(i % 3 === 0 && i !== 3) continue
    if(i % 7 === 0 && i !== 7) continue
    if(i % 9 === 0 && i !== 9) continue
    if(i % 11 === 0 && i !== 11) continue
    yield i
  }
}

function getnature(n, f){
  let result = []
  let a = f(n)
  let output = a.next()
  while(!output.done){
    result.push(output.value)
    output = a.next()
  }
  return result
}

Function.reload = function(typedFuncs){
  return function(...args){
    for(var typedFunc of typedFuncs){
      var f = typedFunc.slice(-1)[0]
      var types = typedFunc.slice(0, -1)
      if(matchType(args, types)){
        f(...args)
      }
    }
  }
}

// NOTE 1106

var parseBoolExpr = function(expr){
  var i =0
  return parse()
}

function parse(){
  if(expr[i] === "t"){
    i++
    return true
  }
  if(expr[i] === 'f'){
    i++
    return false
  }
  if(expr[i] === "!"){
    return parseNot()
  }
  if(expr[i] === "&"){
    return parseAnd()
  }
  if(expr[i] === "|"){
    return parseOR()
  }
}

function parseNot(){
  i += 2
  var value = parse()
  i++
  return !value
}

function parseAnd(){
  i += 2
  var result = true
  while(true){
    var value = parse()
    result = result & value
    if(expr[i] === ")"){
      i++
      break
    }
    if(expr[i] === ","){
      i++
    }
  }
  return result
}

function parseOR(){
  i += 2
  var result = true
  while(true){
    var value = parse()
    result = result & value
    if(expr[i] === ")"){
      i++
      break
    }
    if(expr[i] === ","){
      i++
    }
  }
  return result
}

// NOTE 语法树

var parseBoolExpr = function(expr){
  var i =0
  return runTree(parse())
}

function parse(){
  if(expr[i] === "t"){
    i++
    return {
      type: literal,
      value: true
    }
  }
  if(expr[i] === 'f'){
    i++
    return {
      type: literal,
      value: false
    }
  }
  if(expr[i] === "!"){
    return parseNot()
  }
  if(expr[i] === "&"){
    return parseAnd()
  }
  if(expr[i] === "|"){
    return parseOR()
  }
}

function runTree(tree){
  if(tree.type === "literal") return tree.value
  if(tree.type === "operator"){
    if(tree.name === "!") return !(tree.parameter.value)
    if(tree.name === "&") return tree.parameter.reduce((s, x) => s&(x.value), true)
    if(tree.name === "|") return tree.parameter.reduce((s, x)=>s | x.value, true)
  }
}

function parseNot(){
  i += 2
  var value = parse()
  i++
  return {
    type: operator,
    name: "!",
    parameter: value
  }
}

function parseAnd(){
  i += 2
  var result = {
    type: operator,
    name: "&",
    parameter: []
  }
  while(true){
    var value = parse()
    result.parameter.push(value)
    if(expr[i] === ")"){
      i++
      break
    }
    if(expr[i] === ","){
      i++
    }
  }
  return result
}

function parseOR(){
  i += 2
  var result = {
    type: operator,
    name: "|",
    parameter: []
  }
  while(true){
    var value = parse()
    result.parameter.push(value)
    if(expr[i] === ")"){
      i++
      break
    }
    if(expr[i] === ","){
      i++
    }
  }
  return result
}
