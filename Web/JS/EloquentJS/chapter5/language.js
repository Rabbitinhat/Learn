const SCRIPTS = require("./scripts")

// * filter : 返回符合test的元素组成的新数组
function filter(array, test){
  let passed = []
  for(let element of array){
    if(test(element)) passed.push(element)
  }
  return passed
}

// * 返回script.living值为true的数组元素
// console.log(filter(SCRIPTS, script => script.living))

// * JS 数组的filter方法
console.log("Filter: \n")
console.log(SCRIPTS.filter(script=>script.living))

// * count:current value; 作为combine中的当前值, 每次计算后, 返回值作为下一次的count值
function characterCount(script){
  return script.ranges.reduce((count, [form, to]) =>{
    return count + (to - form)
  }, 0)
}
console.log("Reduce: \n")
console.log(SCRIPTS.reduce((a, b)=>{
  return characterCount(a) < characterCount(b) ? b : a
}))


function average(array){
  return array.reduce((a, b)=>a+b) / array.length
}

console.log(Math.round(average(SCRIPTS.filter(s=>s.living).map(s=>s.year))))

let rtlScripts = SCRIPTS.filter(s=>s.direction === "rtl")
console.log(rtlScripts.map(s=>s.name))

function characterScript(code){
  for(let script of SCRIPTS){
    if(script.ranges.some(([from, to]) => {
      return code >= from && code < to
    })){return script.name}
  }
  return null
}

console.log(characterScript(121))