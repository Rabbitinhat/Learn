/* need a structure to store the digits */
/* array */
let listOfNumbers = [2, 3, 5, 7, 11];
console.log(listOfNumbers.length);//->5

console.log(listOfNumbers[0]); //->2

console.log(listOfNumbers[2 - 1]); //->3

console.log(listOfNumbers[listOfNumbers.length - 1]); //->11

console.log(listOfNumbers[listOfNumbers.length - 5]); //->2

console.log(listOfNumbers[listOfNumbers.length / 2]); //!undefined

console.log(listOfNumbers[Math.floor(listOfNumbers.length)]); //->5

//!err console.log(null.length);
//! console.log(undefined.length);

/* manipulate arrays */
let sequence = [1, 2, 3];
sequence.push(4);//->[1, 2, 3, 4]
console.log(sequence.pop());//->4, [1,2,3]
console.log(sequence.shift());//->1, [2, 3]
sequence.unshift("head");
console.log(sequence);//->"head" 2 3

/* object */
let day1 = {
  squirrel: false,
  events: ["work", "touched tree", "pizz", "running"]
};

console.log(day1.squirrel); //->false
console.log(day1.events); //[work, touched tree, ...]
//! length property is not a function
console.log(day1.events.length); //->4
console.log(day1.events.toString());//->work, touched tree, ...
console.log(day1.wolf); //!->undefined
day1.wolf = false;
console.log(day1.wolf); //->false

let descriptions = {
  work: "Went to work",
  "touched tree": "Touched a tree"
};

/* remove property */
let anObject = { left: 1, right: 2 };
console.log(anObject.left);//->1
delete anObject.left;
console.log(anObject.left); //->undefined
console.log("left" in anObject); //->false
console.log("right" in anObject); //->true
//! diff between delete and set the property's value undefined
anObject.right = undefined;
console.log(anObject.right);//->undefined
console.log("right" in anObject); //->true

/* Object.keys, show to Object's property names */
console.log(Object.keys({ x: 0, y: 0, z: 2 }));
//-> x, y, z

/* Object.assign copy all properties from one object into another*/
let objectA = { a: 1, b: 2 };
Object.assign(objectA, { b: 3, c: 4 });
console.log(objectA);//->{a:1, b:3, c:4}

let object1 = { value: 10 };
let object2 = object1;
let object3 = { value: 10 };

console.log(object1 == object2);//->true
console.log(object1 === object2);//!->true
console.log(object1 == object3);//->false
console.log(object1.value == object3.value); //->true

object1.value = 15;
console.log(object2.value);//->15
console.log(object1.value);//->15

const score = { visitors: 0, home: 0 };
score.visitors = 1;
score = { visitors: 1, home: 1 }; //err

let journal = [1,2,3,5,6,7,8,34,54,6,342,5,43];

function addEntry(events, squirrel) {
  journal.push({ events, squirrel });
}

/* array loop */
/* 遍历数组的每个元素 */
for(let i=0; i<journal; i++){
  let entry = journal[i];
  /* do something */
}
console.log(journal);
/* update */
for(let entry in journal){

  console.log(`the elemnt of journal is ${entry}`);//->1,2,3...
}

let counts = []

for(let num in counts){
  console.log(`the elemnt of journal is ${num}`);
}

/* add & remove */
let todoList = [];

function remember(things){
  todoList.push(things);
}

function getTask(){
  return todoList.shift();
}

function rememberUrgently(task){
  todoList.unshift(task);
}

/* search a specific value */
console.log([1,2,3,2,1].indexOf(2));
console.log([1,2,3,2,1].lastIndexOf(1));

/* slice */
console.log([0,1,2,3,4].slice(2, 3));
console.log([2,34,6,7,1].slice(0, 3));

/* concat */
function remove(array, index){
  return array.slice(0, index).concat(array.slice(index+1));
}

console.log(remove(["a", "b", "c", "d", "e"], 2));

/* concat add new element*/
let original = [1, 2, 3, 5, 6];
let update = original.concat("a");
original.push("a");

console.log(original);
console.log(update);
console.log(original === update); //!->false

/* padStart */
console.log((45).toString(16).padStart(10, "-"));

/* split & join */
let sentence = "Secretarybirds specialize in stomping";
let words = sentence.split(" ");
console.log(words); //->["Secretarybirds", "specialize", "in", "stomping"];
console.log(words.join("%%"));//->Secretarybirds%%specialize%%in%%stomping

/* repeat string */
console.log("Don't repeat Me!!!\n".repeat(10).length);//->190 repeat return a string

/* rest parameters */
/* ... */
function max( ...numbers){
  let result = -Infinity;
  for(let number of numbers){
    if(number > result) result = number;
  }
  return result;
}

let result = [];
for(let i=0; i<5; i++){
  let parameter = Math.random()*100;
  result.push(parameter);
  console.log(parameter);
}

console.log(`Maximum numer is ${max(result[0], result[1], result[2], result[3], result[4], result[5])}`); //-> result[0] is not in compatition
console.log(`Maximum numer is ${max(...result)}`); //!-> input an array

let words = ["never", "fully"];
console.log(["will", ...words, "understand"]); //->spreads to array

/* Math Object */
function randomPointOnCircle(radius){
  let angle = Math.random() * 2 * Math.PI;
  return {x: radius * Math.cos(angle),
          y: radius * Math.sin(angle)};
}

console.log(randomPointOnCircle(2));

//Destructure
//!bingings for the elements of the array
let {name} = {name: "Faraji", age: 23};
console.log(name); //-> "Faraji"

/* JSON */
//! covert these tangles of memory addresses to a description that can be stored or sent
let string = JSON.stringify({squirrel: false, events: ["weekend"]});
console.log(string);
console.log(JSON.parse(string));