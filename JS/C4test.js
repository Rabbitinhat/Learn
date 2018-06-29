/*
 * @Author: chyon71 
 * @Date: 2018-06-29 12:57:49 
 * @Last Modified by: chyon71
 * @Last Modified time: 2018-06-29 14:04:53
 */
var person = new Object();
person.name = "Jack";
console.log(person.name);
var name = "Nicholas";
name.age = 24;
console.log(name.age);

var person2 = person;
person.name = "Akina";
console.log(person2.name);

function addTen(num) {
    num += 10;
    return num;
}
var count = 20;
var result = addTen(count);
console.log(count);
console.log(result);

function setName(obj){
    obj.name = "Akina";
    var obj = {};
   obj.name = "Nicholas"; 
}
var person = {};
person.name = "Jack";
var person2 = person;
setName(person);
console.log(person.name);
console.log(person2.name);

var s = "Nicholas";
var b = false;
var c = 22;
var i;
var n = null;
var o = {};

console.log(typeof s + "\n" + typeof b + "\n" + typeof c + "\n" + typeof i + "\n"
+ typeof n + "\n" + typeof o);
console.log(person instanceof Object);
console.log(typeof setName);

var color = "blue";
function changeColor(){
    if(color === "blue"){
        color = "red";
    } else {
        color = "blue";
    }
}

changeColor();
console.log("Color is now " + color);

var color = "blue";

function changeColor2(){
    var anotherColor = "red";

    function swapColors(){
        var tempColor = anotherColor;
        anotherColor = color;
        color = tempColor;
        console.log("Now tempColor is " + tempColor + "\n");
    }
    swapColors();
    console.log("Now anotherColor is " + anotherColor + "\n");
}
changeColor2();
console.log("Now Color is " + color);

function buildUrl(){
    var qs = "?debug=true";
    with(location){
        var url = href + qs;
    }
    return url;
}
var url = buildUrl();
console.log(url);

if(true){
    var color = "blue";
}
console.log(color);

for(var i = 0; i < 10; i++){
    c++;
}

console.log(i);

function add(num1, num2){
    sum = num1 + num2;
    return sum;
}
var result = add(10, 20);
console.log(sum);