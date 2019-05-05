/* define function */
/* square */
const square = function(x){
  return x * x;
};

console.log(square(12));//->144

/*no parameters */
const makeNoise = function(){
  console.log("Pling!");
};

makeNoise();

/* two parameters */
const power = function(base, exponent){
  let result = 1;
  for(let count = 0; count < exponent; count++){
    result *= base;
  }
  return result;
};

console.log(power(10, 4));

/* scope */
let x = 10;
if(true){
  let y = 20;
  var z = 30;
  console.log(x + y + z); //-> 60;
}

console.log(x+z) //->error, z is not defined

/* only see the innermost one */
const halve = function(n){
  return n/2;
};

let n = 10;
console.log(halve(100)); //->50
console.log(n); //->10

/* nested scope */
const hummus = function(factor){
  const ingredient = function(amount, unit, name){
    let ingredientAmount = amount * factor;
    if(ingredientAmount > 1){
      unit += "s";
    }
    console.log(`${ingredientAmount} ${unit} ${name}`);
  };
  ingredient(1, "can", "chickpeas");
  ingredient(0.25, "cup", "tahini");
  ingredient(0.25, "cup", "lemon juice");
  ingredient(1, "clove", "garlic");
  ingredient(2, "tablespoon", "olive oil");
  ingredient(0.5, "teaspoon", "cumin");
}

/* make for one person */
hummus(1);

/* make for mulitype */
hummus(100);

/* function as values, change the binding that holds a function */
let lanchMissiles = function(){
  missileSystem.launch("now");
};
if(safeMode){
  launchMissiles = function(){
    /* do something */
  };
}

/* function declaration */
/* Function declaraction hoisting */
console.log("The future says:", future());

function future(){
  return "You'll never have flying cars";
}

/* arrow function */
const power = (base, exponent) => {
  let result = 1;
  for(let count = 0; count < exponent; count++){
    result *= base;
  }
  return result;
};

/* omit */
/* only one parameters and body is a single expression */
const square1 = x => x * x;
const square2 = (x) => {return x * x;}

/* no parameters */
const horn = () => {
  console.log("Toot");
};

/* call stack 调用堆栈 */
function greet(who){
  console.log("Hello " + who);
}
greet("Harry");
console.log("Bye");

/* out of stack space */

/* optional argunements */
function square(x) {return x * x};

console.log(square(4, true, "hedgehog")); //->16

function minus(a, b){
  if(b === undefined) return -a; //pass on parameter
  else return a - b; //pass two parameter
}

console.log(minus(5));
console.log(minus(-18));
console.log(minus(9, 27));

/* parameters 默认值 */
function power(base, exponent = 2){
  let result = 1;
  for(let count = 0; count < exponent; count++){
    result *= base;
  }
  return result;
}

console.log(power(15)); //->225

/* Closure */

function wrapValue(n){
  let local = n * n;
  return ()=>local;
}

let wrap1 = wrapValue(1);
let wrap2 = wrapValue(2);

console.log(wrap1());//->1
console.log(wrap2());//->4

/* multiply */
function multiplier(factor){
  return number => number*factor;
}

let twice = multiplier(2);
console.log(twice(5));//->10

/* recursion */
function power(base, exponent){
  if(exponent == 0){
    return 1;
  }else{
    return base * power(base, exponent - 1);
  }
}

console.log(power(2, 3)); //->8

/* 3 & 5 */
function findSolution(target){
  function find(current, history){
    if(current == target){
      return history;
    }else if (current > target){
      return null;
    } else {
      return find(current + 5, `(${history} + 5)`) || find(current * 3, `(${history} * 3)`)
    }
  }
  return find(1, "1");
}

console.log(findSolution(24));