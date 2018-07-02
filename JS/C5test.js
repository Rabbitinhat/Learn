/*
 * @Author: chyon71 
 * @Date: 2018-06-30 15:38:16 
 * @Last Modified by: chyon71
 * @Last Modified time: 2018-07-02 23:14:42
 */

var person = new Object();
var person2 = {
    name : "Nicholas",
    age : 29
};
var person3 = {};
person3.name = "Nicholas";
person3.age = 29;

function displayInfo(args){
    var output = "";

    if(typeof args.name == "string"){
        output += "Name: " + args.name + "\n";
    }
    if(typeof args.age == "number"){
        output += "Age: " + args.age + "\n";
    }
    console.log(output);
}

displayInfo({
    name: "Nicholas",
    age: 24
});

displayInfo({
    name: "Greg"
});

console.log(person2["name"]);
console.log(person2.name);
var propertyName = "name";
console.log(person2[propertyName]);

var colors = new Array();
var colors = new Array(20);
var colors = new Array("blue", "green", "red");
var colors = new Array(3);
var names = new Array("Greg");
var colors = Array(3);
var names = Array("Greg");
var colors = ["red", "green", "blue"];
var names = [];
var values = [1, 2, ];
var options = [, , , , ,];
console.log(colors[0]);
console.log(colors[2]);
colors[3] = "yellow";
colors[2] = "black";
console.log(colors[2]);
console.log(colors[6]);
console.log(colors[3]);
console.log(colors.length);
colors.length = 7;
console.log(colors[5]);
colors.length = 3;
console.log(colors[3]);
colors[colors.length] = "black";
colors[colors.length] = "brown";
console.log(colors.length);
console.log(colors[colors.length - 1]);
console.log(Array.isArray(colors));
console.log(colors.toString());
console.log(colors.valueOf());
console.log(colors);

var person1 = {
    toLocaleString : function () {
        return "Nikolaos";
    },
    toString : function () {
        return "Nicholas";
    }
};

var person2 = {
    toLocaleString : function () {
        return "Grigorios";
    },
    toString : function() {
        return "Greg";
    }
};

var people = [person1, person2];
console.log(people);
console.log(people.toString());
console.log(people.toLocaleString());
console.log(colors.join(","));
console.log(colors.join("|"));
console.log(people.join("||"));
colors.length = 10;
console.log(colors.toString());
console.log(colors.join("**"));

var colors = [];
var count = colors.push("red", "green");
console.log(colors);

count = colors.push("black");
console.log(colors);

var item = colors.pop();
console.log(item);
console.log(colors);

colors.push("brown");
colors[3] = "black";
console.log(colors);

console.log(colors.pop());

var colors = new Array();
var count = colors.push("red", "green");

count = colors.push("black");
console.log(colors);

var item = colors.shift();
console.log(item);
console.log(colors);

var colors = new Array();
var count = colors.unshift("red", "green");
console.log(count);
console.log(colors);

count = colors.unshift("black");
console.log(count);

var item = colors.pop();
console.log(item);
console.log(colors);

var values = [1, 2, 3, 4, 5];
values.reverse();
console.log(values);
console.log(colors.reverse());

var values = [1, 3, 5 , 7, 9, 11, 13];
values.sort();
console.log(values);

function compare(value1, value2){
    if(value1 < value2){
        return 1;
    } else if (value1 > value2){
        return -1;
    } else{
        return 0;
    }
}

values.sort(compare);
console.log(values);

var colors = ["red", "green", "blue"];
var colors2 = colors.concat("yellow", ["black", "brown"]);

console.log(colors);
console.log(colors2);

var colors = ["red", "green", "blue", "yellow", "purple"];
var colors2 = colors.slice(1);
var colors3 = colors.slice(1, 4);

console.log(colors2);
console.log(colors3);
var colors4 = colors.slice(-2, -1);

console.log(colors4);
var colors5 = colors.slice(3, 2);
console.log(colors5);

var colors = ["red", "green", "blue"];
var removed = colors.splice(0, 1);
console.log(removed);
console.log(colors);

removed = colors.splice(1, 0, "yellow", "orange");
console.log(removed);
console.log(colors);

removed = colors.splice(1, 1, "red", "purple");
console.log(removed);
console.log(colors);

var numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];

console.log(numbers.indexOf(4));
console.log(numbers.lastIndexOf(4));
console.log(numbers.indexOf(4, 4));
console.log(numbers.lastIndexOf(4, 4));

var person = {name : "Nicholas"};
var people = [{ name: "Nicholas "}];

var morePeople = [person];

console.log(people.indexOf(person));
console.log(morePeople.indexOf(person));

var numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];

var everyResult = numbers.every(function(item, index, array){
    return (item > 2);
});

console.log(everyResult);

var someResult = numbers.some(function(item, index, array){
    return (item > 2);
});

console.log(someResult);

var filterResult = numbers.filter(function(item, index, array){
    return (item > 2);
});

console.log(filterResult);

var mapResult = numbers.map(function(item, index, array){
    return item * 2;
});
console.log(mapResult);

numbers.forEach(function(item, index, array){
    //doSomething
});

var sum = numbers.reduce(function(prev, cur, index, array){
    return prev + cur;
});
console.log(sum);

//Date
var now = new Date();
var someData = new Date(Date.parse("May 25, 2004"));
var otherDate = new Date("May 25, 2004");//argunments are String
var y2k = new Date(Date.UTC(2000, 0));
var allFives = new Date(Date.UTC(2005, 4, 5, 17, 55, 55));//arguments are Number
var y2k = new Date(2000, 0);// Local Time

//var start = Date.now();
function add(){
    for(var i = 0; i < 100; i++)
        ;
}
add();
/*var stop = Date.now(),
result = stop - start;
console.log(result);*/

var start = +new Date();
add();
var stop = +new Date();
console.log(stop);
var now1 = new Date().toString();
var now2 = new Date().toLocaleString();
console.log(now1);
console.log(now2);

var date1 = new Date(2017, 0, 1);
var date2 = new Date(2017, 1, 1);
console.log(date1 < date2);
console.log(date1 > date2);

var date3 = date1.toDateString();
console.log(date3);
var time3 = date1.toTimeString();
console.log(time3);
var localedate = date1.toLocaleDateString();
console.log(localedate);
var localetime = date1.toLocaleTimeString();
console.log(localetime);
var utc = date1.toUTCString();
console.log(utc);
console.log(date1.getUTCFullYear());

//RegExp
var pattern1 = /at/g;
var pattern2 = /[bc]at/i;
var pattern3 = /.at/gi;

var pattern1 = /[bc]at/i;
var pattern2 = /\[bt\]at/i;
var pattern3 = /.at/gi;
var pattern4 = /\.at/gi;

var pattern1 = /[bc]at/i;

var pattern2 = new RegExp("[bc]at", "i");
var pattern3 = new RegExp("\\[bt\\]at", "i");
var pattern3 = new RegExp("\\.at", "i");
var pattern3 = new RegExp("name\\/age", "i");
var pattern3 = new RegExp("\\d.\\d{1, 2}");
var pattern3 = new RegExp("\\w\\\\hello\\\\123", "i");

var re = null,
    i;
for(i = 0; i < 10; i++){
    re = /cat/g;
    re.test("catastrophe");
}
for(i = 0; i < 10; i++){
    re = new RegExp("cat", "g");
    re.test("catastrophe");
}

var pattern1 = /\[bc\]at/i;

console.log(pattern1.global);
console.log(pattern1.ignoreCase);
console.log(pattern1.multiline);
console.log(pattern1.lastIndex);
console.log(pattern1.source);

var pattern2 = new RegExp("\\[bc\\]at", "i");

console.log(pattern2.global);
console.log(pattern2.ignoreCase);
console.log(pattern2.multiline);
console.log(pattern2.lastIndex);
console.log(pattern2.source);

var text = "mom and dad and baby";
var pattern = /mom( and dad( and baby)?)?/gi;

var matches = pattern.exec(text);
console.log(matches.index);
console.log(matches.input);
console.log(matches[0]);
console.log(matches[1]);
console.log(matches[2]);

var text = "cat, bat, sat, fat";
var pattern1 = /.at/;

var matches = pattern1.exec(text);
console.log(matches.index);
console.log(matches[0]);
console.log(pattern1.lastIndex);

matches = pattern1.exec(text);
console.log(matches.index);
console.log(matches[0]);
console.log(pattern1.lastIndex);

var pattern2 = /.at/g;

var matches = pattern2.exec(text);

console.log(matches.index);
console.log(matches[0]);
console.log(pattern2.lastIndex);

matches = pattern2.exec(text);

console.log(matches.index);
console.log(matches[0]);
console.log(pattern2.lastIndex);

var text = "000-00-0000";
var pattern = /\d{3}-\d{2}-\d{4}/;

if(pattern.test(text)){
    console.log("The pattern was matched.");
}

var pattern = new RegExp("\\[bc\\]at", "gi");
console.log(pattern.toString());
console.log(pattern.toLocaleString());
var pattern = /\[bc\]/gi;
console.log(pattern.valueOf());

var text = "this has been a short summer";
var pattern = /(.)hort/g;

/*if(pattern.test(text)){
    console.log(RegExp.input);
    console.log(RegExp.lastMatch);
    console.log(RegExp.lastParen);
    console.log(RegExp.leftContext);
    console.log(RegExp.rightContext);
    console.log(RegExp.multiline);
}
*/
if(pattern.test(text)){
    console.log(RegExp.$_);
    console.log(RegExp["$'"]);
    console.log(RegExp["$`"]);
    console.log(RegExp["$&"]);
    console.log(RegExp["$+"]);
    console.log(RegExp["$*"]);
}

var pattern = /(..)or(.)/g;

if(pattern.test(text)){
    console.log(RegExp.$1);
    console.log(RegExp.$2);
}

//Function
function sum(num1, num2){
    return num1 + num2;
}

var sum = function(num1, num2){
    return num1 + num2;
};

var sum = new Function("num1", "num2", "return num1 + num2");

console.log(sum(10, 10));
var anotherSum = sum;
console.log(anotherSum(10, 10));

sum = null;
console.log(anotherSum(10, 10));

var addSomeNumber = function(num){
    return num + 100;
};

addSomeNumber = function(num){
    return num + 200;
}

var result = addSomeNumber(100);

console.log(sum4(10, 10));
var sum = function(num1, num2){
    return num1 + num2;
};
console.log(sum(10, 10));
function sum4(num1, num2){
    return num1 + num2;
}

function callSomeFunction(someFunction, someArgument){
    return someFunction(someArgument);
}

function add10(num){
    return num + 10;
}

var result1 = callSomeFunction(add10, 10);
console.log(result1);

function getGreeting(name){
    return "Hello, " + name;
}

var result2 = callSomeFunction(getGreeting, "Nicholas");
console.log(result2);

function createComparisonFunction(propertyName){
    return function(object1, object2){
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];

        if(value1 < value2){
            return -1;
        } else if (value1 > value2){
            return 1;
        } else {
            return 0;
        }
    };
}

var data = [{name: "Zachary", age: 28}, {name: "Nicholas", age: 29}];

data.sort(createComparisonFunction("name"));
console.log(data[0].name);

data.sort(createComparisonFunction("age"));
console.log(data[0].name)

//arguments & this
function factorial(num){
    if(num <= 1){
        return 1;
    } else {
        return num * factorial(num - 1);
    }
}

function factorial(num){
    if(num <= 1){
        return 1;
    } else {
        return num * arguments.callee(num - 1);
    }
}

var trueFactorial = factorial;

factorial = function(){
    return 0;
};

console.log(trueFactorial(5));
console.log(factorial(5));

//this
window.color = "red";
var o = {color: "blue"};

function sayColor(){
    console.log(this.color);
}

sayColor();

o.sayColor = sayColor;
o.sayColor();

//caller
function outer(){
    inner();
}

function inner(){
    console.log(inner.caller);
}

outer();

function outer(){
    inner();
}

function inner(){
    console.log(arguments.callee.caller);
}

outer();

function sayName(name){
    console.log(name);
}

function sum(num1, num2){
    return num1 + num2;
}

function sayHi(){
    console.log("hi");
}

console.log(sayName.length + " " + sum.length + " " + sayHi.length);

function sum(num1, num2){
    return num1 + num2;
}

function callSum1(num1, num2){
    return sum.apply(this, arguments);
}

function callSum2(num1, num2){
    return sum.apply(this, [num1, num2]);
}

console.log(callSum1(10, 10));
console.log(callSum2(10, 10));

window.color = "red";
var o = {color: "blue"};

function sayColor(){
    console.log(this.color);
}

sayColor();

sayColor.call(this);
sayColor.call(window);
sayColor.call(o);

var objectSayColor = sayColor.bind(o);
objectSayColor();

//Primitive Wrapper Types
var s1 = "some text";
var s2 = s1.substring(2);
console.log(s2);

var obj = new Object("some text");
console.log(obj instanceof String);

var booleanObject = new Boolean(true);

var falseObject = new Boolean(false); //typeof falseObject is Object
var result = falseObject && true;
console.log(result);

var falseValue = false; //typeof falseValue is Boolean
result = falseValue && true;
console.log(result);

console.log(falseObject instanceof Boolean);
console.log(falseValue instanceof Boolean);
console.log(typeof falseObject);
console.log(typeof falseValue);

//Number
var numberObject = new Number(10);
var num = 10;
console.log(num.toFixed(2));

var num = 10.005;
console.log(num.toFixed(2));

var num = 10;
console.log(num.toExponential(2));

var num = 99;
console.log(num.toPrecision(1));
console.log(num.toPrecision(2));
console.log(num.toPrecision(3));

var numberValue = 10;
console.log(typeof numberValue);
console.log(typeof numberObject);
console.log(numberObject instanceof Number);
console.log(numberValue instanceof Number);

//String
var stringObject = new String("hello world");
var stringValue = "hello object";
console.log(stringValue.length);

var stringValue = "hello world";
console.log(stringValue.charAt(1));

var stringValue = "hello world";
console.log(stringValue[1]);

var stringValue = "hello ";
var result = stringValue.concat("world");
console.log(result);
console.log(stringValue);

var stringValue = "hello world";
console.log(stringValue.slice(3));
console.log(stringValue.substring(3));
console.log(stringValue.substr(3));
console.log(stringValue.slice(3, 7));
console.log(stringValue.substr(3, 7));
console.log(stringValue.substring(3, 7));

console.log(stringValue.slice(-3));
console.log(stringValue.substring(-3));
console.log(stringValue.substr(-3));
console.log(stringValue.slice(3, -4));
console.log(stringValue.substring(3, -4));
console.log(stringValue.substr(3, -4));

console.log(stringValue.indexOf("o"));
console.log(stringValue.lastIndexOf("o"));

console.log(stringValue.indexOf("o", 6));
console.log(stringValue.lastIndexOf("o", 6));

var stringValue = "Lorem ipsum dolor sit amet, consectetur adipisicing elit";
var positions = new Array();
var pos = stringValue.indexOf("e");

while(pos > -1){
    positions.push(pos);
    pos = stringValue.indexOf("e", pos + 1);
}

console.log(positions);

var stringValue = "   hello world    ";
var trimmedStringValue = stringValue.trim();
console.log(stringValue);
console.log(trimmedStringValue);
console.log(stringValue.trimLeft());
console.log(stringValue.trimRight());

var stringValue = "hello world";
console.log(stringValue.toUpperCase());
console.log(stringValue.toLowerCase());

var text = "cat, bat, sat, fat";
var pattern = /.at/;

var matches = text.match(pattern);
console.log(matches.index);
console.log(matches[0]);
console.log(pattern.lastIndex);

var pos = text.search(/at/);
console.log(pos);

var text = "cat, bat, sat, fat";
var result = text.replace("at", "ond");
console.log(result);

var result = text.replace(/at/g, "ond");
console.log(result);