/*
 * @Author: chyon71 
 * @Date: 2018-06-30 15:38:16 
 * @Last Modified by: chyon71
 * @Last Modified time: 2018-06-30 23:38:59
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