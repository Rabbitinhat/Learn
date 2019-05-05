/* C3Q1 Minimum */
function min(a, b){
  return a > b ? b : a;
}
/* test */
console.log(min(0, 10));
console.log(min(0, -10));

/* C3Q2 Recursion */
function isEven(num){
  if(num < 0){
    num = -num;
  }
  if(num === 0){
    return true;
  }
  if(num === 1){
    return false;
  }
  return isEven(num - 2);
}

console.log(isEven(50)); //->true
console.log(isEven(75)); //->false
console.log(isEven(-1)); //->false

/* count B */
function countBs(str){
  let count = 0;
  for(let i=0, len=str.length; i<len; i++){
    if(str[i] === "B"){
      count++;
    }
  }
  return count;
}

/* test */
console.log(countBs("BBC"));

/* update */
function countChar(str, target){
  let count = 0;
  for(let i=0, len=str.length; i<len; i++){
    if(str[i] === target){
      count++;
    }
  }
  return count;
}

console.log(countChar("kakkerlack", "k"));