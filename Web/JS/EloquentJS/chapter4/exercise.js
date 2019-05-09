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