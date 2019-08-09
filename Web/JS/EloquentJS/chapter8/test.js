// 12, 16, 32, 36, 52, 56, 72, 76,
// 20, 24, 28, 40, 44, 48, 60, 64, 68, 


let reg = /\[[+-]?[0]*[\d^0]\d*([13579][26]|[2468][048]|[048])\]/

var climbStairs = function(n) {
  if(n === 0){
      return 1
  }else if(n < 0){
      return 0
  }else{
      return climbStairs(n-1) + climbStairs(n-2)
  }
}

console.log(climbStairs(23))


var climbStairs = function(n){
  if(n === 1 && n === 0) return 1
  let result = 1
  let prev = 1
  for(let i=1; i<n; i++){
    let temp = result
    result = result + prev
    prev = temp
  }
  return result
}

console.log("Borobudur".replace(/[ou]/, "a"))
console.log("Borobudur".replace(/[ou]/g, "a"))

console.log("abbbbbb1\n2332bb32\nbb12bbb".replace(/[\d]+/gm, '0')) //=> 沒有m(multiylinr)時, 只匹配一行文本

"aaaabbbdfccsdddcsasdefght".replace(/([a]+)([b]+)([d]+)([f]+)([c]+)([s]+)([d]+)([c]+)([s]+)([a]+)/g, function(_, ...args){
  return args.length
})

let stock = "1 lemon, 2 cabbage, and 101 eggs"
function minusOne(match, amount, unit){
  amount = Number(amount) - 1
  if(amount == 1){
    unit = unit.slice(0, unit.length-1)
  }else if(amount == 0){
    amount = "no"
  }
  return amount + " " + unit
}

console.log(stock.replace(/(\d+)\s(\w+)/g, minusOne)) //=> match("1 lemon, 2 cabbage, ...") amount("1", "2", "101") unit("lemon", "cabbage", "eggs")

let reg = /\w\s/g
let result
while(result = reg.exec("dsa adad adad weew dw")){
  console.log("Found ", result[0],  "at ",  result.index,  ", Next match at ",  reg.lastIndex)
  // => console.log多個參數之間自動添加" " 
}









































