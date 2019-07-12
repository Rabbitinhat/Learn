/* Higer-Order Functions */
/* repeat call function */
function repeat(n, action){
  for(let i=0; i<n; i++){
    action(i);
  }
}

repeat(3, console.log);

/* create a function */
let labels = [];
repeat(5, i=>{
  labels.push(`Unit ${i+1}`);
});

console.log(labels); //->["Unit 1","Unit 2","Unit 3","Unit 4","Unit 5"]

// * functions that create a new function
function greaterThan(n){
  return (m) => (m > n)
}

let greaterThan20 = greaterThan(20)
console.log(greaterThan20(50)) //->True

// * use function change other functions
function noisy(f){
  // * ... 将输入保存到arguments中
  return (...args) => {
    console.log(`The arguments are ${args}`)
    let result = f(...args)
    console.log(`The result is ${result}`)
    return result
  }
}
let getMin = noisy(Math.min)
// * 输入为多个数字
console.log(getMin(1, 244, 32, 78))


function unless(test, then){
  // * 如果test不成立, 则执行then
  if(!test) then(); 
}

repeat(3, n=>{
  unless(n % 2 === 1, ()=>{
    console.log(`${n} is even`)
  })
})

//* forEach method, 对数组每个元素执行函数, 没有返回值(undefined)
console.log(["A", "B"].forEach(l=>{
  console.log(l)
}))


// * reduce 递减, 折叠; Iterative method 迭代方法
// * 给定一个初始值, 遍历数组执行函数
function reduce(array, combine, start){
  let current = start
  for(let element of array){
    current = combine(current, element)
  }
  return current
}

console.log(reduce([1,2,3,4], (a, b)=>a+b, 0))

// * reduce方法
// * 省略start参数, 则以ary[0]作为start
console.log([3,4,52,5].reduce((a,b)=>a*b))

// * map 对数组元素执行函数, 返回函数返回值组成的新数组
function map(array, transform){
  let mapped = []
  for(let element of array){
    mapped.push(transform(element))
  }
  return map
}

