// 进制转换 <20
var nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
var sign = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]
function change(n, base){
  var sum = ""
  while(n > 0){
    var a = n % base
    sum = (a < 10 ? nums[a] : sign[a - 10]) + sum
    n = Math.floor(n / base)
  }
  return addZero(sum, 2);
}
// 为数字补满特定数量的前导0
function addZero(result, l){
  if(result.length < l){
    for(let i=0; i<l-result.length; i++){
      result = "0" + result
    }
  }
  return result
}
function toDecimal(n, base){
  var dec = 0
  for(let i=0; i<n.length; i++){
    dec += +n[i] * base ** (n.length-i)
  }
  return dec
}

console.log(toDecimal("1010", 2))

console.log("1-1 20进制加法")
for(let i=0; i<20; i++){
  var result = ""
  for(let j=0; j<20; j++){
     result += change(i+j, 20) + " "
  }
  console.log(result)
}
console.log("1-1 20进制乘法")
for(let i=0; i<20; i++){
  var result = ""
  for(let j=0; j<20; j++){
     result += change(i*j, 20) + " "
  }
  console.log(result)
}
console.log("1-4 13进制加法")
for(let i=0; i<13; i++){
  var result = ""
  for(let j=0; j<13; j++){
     result += change(i+j, 13) + " "
  }
  console.log(result)
}
console.log("1-4 13进制乘法")
for(let i=0; i<13; i++){
  var result = ""
  for(let j=0; j<13; j++){
     result += change(i*j, 13) + " "
  }
  console.log(result)
}

// var a = 80
// var b = 40
// a = a + b
// b = a - b
// a = a - b
// console.log(a)
// console.log(b)