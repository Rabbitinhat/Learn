// Q1 MINIMUM
function min(argu1, argu2){
  return argu1 > argu2 ? argu2 : argu1
}

//Q2 RECURSION
function isEven(num){
  if(num < 0) num = -num
  if(num == 0) return true
  if(num == 1) return false
  return isEven(num - 2)
}

console.log(isEven(50))
console.log(isEven(75))
console.log(isEven(-1))

//Q3 BEAN COUNTING
function countBs(str){
  let counter = 0
  for(let i=0; i<str.length; i++){
    if(str[i] === "B") counter++
  }
  return counter
}

function countChar(str, base){
  let counter = 0
  for(let i=0; i<str.length; i++){
    if(str[i] === base) counter++
  }
  return counter
}