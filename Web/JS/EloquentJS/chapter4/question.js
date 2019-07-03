// ! The Sum of A Range
function range(start, end, step=1){
  let result = []
  if(step > 0){
    for(let i=start; i<= end; i+= step){
    result.push(i)
    }
  }else{
    for(let i=start; i>=end; i += step){
      result.push(i)
    }
  }
  return result
}

function sum(ary){
  let sum = 0
  for(let index of ary){
    sum += index
  }
  return sum
}

console.log(sum(range(1, 10))) //-> 55
console.log(range(1, 10, 2)) //->[1, 3, 5, 7, 9]
console.log(range(5, 2, -1)) //->[5, 4, 3, 2]

// ! Reverse an array
function reverseArray(ary){
  let newArray = []
  // * for(let i of array) 会受数组的长度变化(push, pop)影响
  for(let i=0, len=ary.length; i<len; i++){
    newArray.push(ary.pop())
  }
  return newArray
}

function reverseArrayInPlace(ary){
  for(let i=0, len=ary.length; i<len / 2; i++){
    let temp = ary[i]
    ary[i] = ary[len-1-i]
    ary[len-1-i] = temp
  }
  return ary
}

console.log(reverseArray([5, 4, 3, 2])) //->[2, 3, 4, 5]
console.log(reverseArrayInPlace([5, 4, 3, 2])) //->[2, 3, 4, 5]