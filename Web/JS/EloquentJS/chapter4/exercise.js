/* The Sum of a Range */
function range(start, end, step=1){
  let range = [];
  let revese = true;
  /* 保证正反向都可以, 但必须步长正好到达end */
  for(var i=start; i!=end; i+=step){
    range.push(i);
  }
  range.push(i);
  return range;
}

function rangeUp(start, end, step=1){
  let range = [];
  let revese = false;
  if(start > end){
    revese = true;
    [start, end] = [end, start];
    step = Math.abs(step);
  }
  for(let i=start; i<end+1; i += step){
    range.push(i);
  }
  if(revese){
    return range.reverse();
  }
  return range;
}
/* summary */
function sum(...numbers){
  let sum = 0;
  for(let para of numbers){
    sum += para;
  }
  return sum;
}

console.log(sum(...range(1, 10))); //->55
console.log(sum(11, 11, 11));

console.log(rangeUp(1, 10)); //->[1, 2, 3, ...]
console.log(rangeUp(5, 2, -1));
//->[5, 4, 3, 2, 1]
console.log(sum(...rangeUp(1, 10))); //->55

console.log(range(1, 10)); //->[1, 2, 3, ...]
console.log(range(5, 2, -1));
//->[5, 4, 3, 2, 1]
console.log(sum(...range(1, 10))); //->55

/* Reversing an array */
function reverseArray(array){
  let reArray = [];
  while(array.length){
    reArray.push(array.pop());
  }
  return reArray;
}

function reverseArrayInPlace(array){
  for(let i=0, len=array.length; i<Math.floor(len/2); i++){
    [array[i], array[array.length-1-i]] = [array[array.length-1-i], array[i]];
  }
  return array;
}

console.log(reverseArray(["A", "B", "C"]));
//->["C", "B", "A"]
let arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);

/* A list */
/* change an array to list */
function arrayToList(array){
  if(array.length == 0){
    return null;
  }
  return {value: array.shift(), rest: arrayToList(array)};
}

console.log(arrayToList([10, 20])); //{ value: 10, rest: { value: 20, rest: null } }

/* change a list to array */
function listToArray(list){
  let result = [];
  for(;list != null; list = list.rest){
    result.push(list.value);
  }
  return result;
}

console.log(listToArray(arrayToList([10, 20, 30]))); //[10, 20, 30]

/* put num to head of list, make a new list */
function prepend(num, list){
  let newlist = {};
  newlist.value = num;
  newlist.rest = list;
  return newlist;
}

/*  */
function nth(list, index){
  for(;index!=0;index--,list=list.rest){
    if(list==null){
      return undefined
    }
  }
  return list.value;
}

console.log(prepend(10, prepend(2, null)));
console.log(nth(arrayToList([10, 20, 30, 40]), 2));

/* Deep Comparison */
function deepEqual(arg1, arg2){
  if(typeof arg1 === "object" && typeof arg2 === "object"){
    let arg1Arr = Object.keys(arg1);
    let arg2Arr = Object.keys(arg2);
    for(let i=0; i<arg1Arr.length; i++){
      return deepEqual(arg1[arg1Arr[i]], arg2[arg2Arr[i]]);
    }
  }else{
    return arg1 === arg2;
  }
}

let obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj)); //->true
console.log(deepEqual(obj, {here: 1, object: 2}));//-> false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));