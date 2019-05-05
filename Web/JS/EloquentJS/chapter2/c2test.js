/* expression */
/* binding */
let caught = 5 * 3;

console.log(caught * caught); //->15*15 225

/* change binding */
var mood = "light";
console.log(mood); //->"light"

mood = "dark";
console.log(mood); //->"dark"

/* new eg */
let luigisDebt = 140;
luiguisDebt = luigisDebt - 35;
console.log(luigisDebt); //-> 140 - 35 = 105

/* empty binding */
let one = 1, two = 2;
console.log(one + two); //-> 3
console.log(one + undefined); //-> NaN?

/* var const */
var name = "Ayda";
const greeting = "Hello";
console.log(greeting + name); //-> "HelloAyda"

// -> error greeting = "Welcome";

/* console.log */
let x = 30;
console.log(`the value of x is ${x}`);

/* return value & side effect */
console.log(Math.max(2, 4)); //->4

console.log(Math.min(2, 4) + 100); //->102

/* control flow */
/* format transform Number() String() Boolean() */
let theNumber = Number(Math.min(100, 4));
console.log(`Your number is the square a root of ${theNumber * theNumber}`); //->16

/* conditional execution */
let theNumber = Math.random() * 2;//->[0, 2)
if (theNumber > 1) {
    console.log(`Your number ${theNumber} is Big!!`);
} else {
    console.log(`Your number ${theNumber} is Small!!`);
}

/* without brace */
if (1 + 1 == 2) console.log("It's true");

/* if else */
let num = Math.floor(Math.random() * 101);
if (num < 10) {
    console.log(`${num}, Pretty Woman`);
} else if (num > 50) {
    console.log(`${num}, Don't look back in Anger`);
} else {
    console.log(`${num}, Common People`)
}

/* loop while & do */
let number = 0;
while (number <= 12) {
    console.log(number);
    number = number + 2;
}
//->0, 2, 4, 6, 8, 10, 12

/* 2 ** 10 */
let result = 1;
let counter = 0;
while (counter < 10) {
    result *= 2;
    counter++;
}
console.log(`2^10 is ${result}`);

/* do-while */
let yourNum;
let count = 0;
do {
    count++
    yourNum = Math.floor(Math.random() * 100); //-> [0, 100)
    console.log(`Your number is ${yourNum}`);
} while (count < 10);

/* indent */
if (false != true) {
    console.log("That makes sense.");
    if (1 < 2) {
        console.log("No Surprise here");
    }
}

/* Loop for
counter conditional update-counter
*/

for(let num=0; num <= 12; num = num + 2){
    console.log(num);
}
//-> 0 2 4 6 8 10 12

/* for loop 2^10 */
var result = 1;
for(var counter = 0; counter < 10; counter++){
    result *= 2;
}
console.log(result); //->1024

/* breaking out the loop */
for(var current = 20; ;current++){
    if(current % 7 === 0){
        break;
    }
}
/* let & var scope */
console.log(current); //->21

/* switch */
let weather = Math.floor(Math.random()*4);
switch(weather){
    case 0:
    console.log("Remember to bring an umbrella.");
    break;
    case 1:
    console.log("Dress lightly.");
    case 2:
    console.log("Go outside.");
    break;
    default:
    console.log("Unknown weather type!");
    break;
}

