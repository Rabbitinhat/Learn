let anObject = {left: 1, right: 2};
console.log(anObject.left);

delete anObject.left;
console.log(anObject.left);
console.log("left" in anObject);
console.log("right" in anObject);

console.log(Object.keys({x: 0, y: 0, z: 2}));

let objectA = {a: 1, b: 2};
Object.assign(objectA, {b: 3, c: 4});
console.log(objectA);

//NOTE 绑定值可变
const score = {visitors: 0, home: 0};
score.visitors = 1;
score = {visitors: 1, home: 1};

//NOTE 添加 删除元素
let todoList = [];
function remember(task){
    todoList.push(task);
}
function getTask(){
    return todoList.shift();
}
function rememberUrgently(task){
    todoList.unshift(task);
}

console.log([1, 2, 3, 2, 1].indexOf(2));
console.log([1, 2, 3, 2, 1].lastIndexOf(2));

console.log([0, 1, 2, 3, 4].slice(2, 4));
console.log([0, 1, 2, 3, 4].slice(2));

//NOTE 返回去掉index位置元素的新数组
function remove(array, index){
    return array.slice(0, index).concat(array.slice(index + 1));
}

console.log(remove(["a", "b", "c", "d", "e"], 2));

//NOTE repeat() 重复字符串
console.log("LA".repeat(3));

//NOTE 剩余参数
function max(...numbers){
    let result = -Infinity;
    for(let number of numbers){
        if(number > result) result = number;
    }
    return result;
}

console.log(max(4, 1, 9, -2));

//NOTE Math
function randomPointOnCircle(radius){
    let angle = Math.random() * 2 * Math.PI;
    return {x: radius * Math.cos(angle),
            y: radius * Math.sin(angle)};
}
console.log(randomPointOnCircle(2));

console.log(Math.random());
console.log(Math.random());
console.log(Math.random());

console.log(Math.floor(Math.random() * 10));

//? 解构数组
function phi([n00, n01, n10, n11]){
    return (n11 * n00 - n10 * n01) /
        Math.sqrt((n10 + n11) * (n00 + n01) * (n01 + n11) + (n00 + n10));
}

//? 解构对象
let {name} = {name: "Faraji", age: 23};
console.log(name);

//JSON
let string = JSON.stringify({squirrel: false, events: ["weekend"]});

console.log(string);
console.log(JSON.parse(string).events);