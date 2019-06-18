// 将不同进位数字转换为十进制, 只能转换0-9的数字
function toDecimal(n, base){
  var dec = 0
  for(let i=0; i<n.length; i++){
    dec += +n[i] * base ** (n.length-i-1)
  }
  return dec
}
console.log(toDecimal("11111", 5))
console.log(toDecimal("21212", 5))
console.log(toDecimal("11111", 7))
console.log(toDecimal("21212", 7))
console.log(toDecimal("11111", 11))
console.log(toDecimal("21212", 11))
console.log(toDecimal("11111", 12))
console.log(toDecimal("21212", 12))