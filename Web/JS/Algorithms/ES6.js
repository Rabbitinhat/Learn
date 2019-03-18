//NOTE use let instead of var
//NOTE globel scope
let movie = "Lord of the Rings";

//NOTE 同一作用域中重复声明同名变量会抛出错误
//var movie = "Batman v Superman";

function starWarsFan(){
    //NOTE local scope
    let movie = "Star Wars";
    return movie;
}

function marvelFan(){
    //NOTE  globel variable
    movie = "The Avengers";
    return movie
}

function blizzardFan(){
    let isFan = true;
    let phrase = "Warcraft";
    console.log("Before if: " + phrase);
    if(isFan){
        let phrase = "initial text";
        console.log(phrase);
        //NOTE local scope phrase -- in if
        phrase = "For the Horde!";
        console.log("Inside if: " + phrase);
    }
    phrase = "For the Alliance!";
    console.log("After if: " + phrase);
}

console.log(movie);
console.log(starWarsFan());
console.log(marvelFan());
console.log(movie);
blizzardFan();

const PI = 3.1415926;
//NOTE 修改const声明的值会抛出错误
//PI = 0;
console.log(PI);

//NOTE 使用模板字面量
var book = {
    name: "学习ES6"
};

console.log("你正在" + book.name + ". \n新一行\n这也是.");
//NOTE 语法类型 pug
console.log(`你正在${book.name}.
这是新一行
这也是. `);

//NOTE 箭头函数
var circleArea = function(r){
    var PI = 3.14;
    var area = PI * r * r;
    return area;
};

console.log(circleArea(2));

//NOTE =>
let circleArea2 = (r) => {
    const PI = 3.14;
    let area = PI * r * r;
    return area;
}
console.log(circleArea2(2));
let circleArea3 = (r) => 3.14*r*r;
console.log(circleArea3);
//NOTE 参数默认值
function sum(x=1, y=2, z=3){
    return x + y + z;
};
console.log(sum(4, 2));

//NOTE 声明展开

var params = [3, 4, 5];
console.log(sum(...params));
//NOTE 代替apply()
var params = [3, 4, 5];
console.log(sum.apply(undefined, params));

//NOTE ... 作为剩余参数
function restParamaterFunction (x, y, ...a){
    return (x + y) * a.length;
}
console.log(restParamaterFunction(1, 2, "hello", true, 7));
//NOTE 相同
function restParamaterFunction2(x, y){
    //NOTE arguments使用 slice() 方法, 截取除了前两个参数之外的内容
    var a = Array.prototype.slice.call(arguments, 2);
    return (x + y) * a.length;
}

//NOTE 数组解构
var [x, y] = ["a", "b"];
console.log(`${x}; ${y}`);
//NOTE 等同于
var x1 = "a";
var y1 = "b";
console.log(`${x}; ${y}`);
//NOTE 也可用于值的互换
[x, y] = [y, x];
console.log(`${x}; ${y}`);
//NOTE 等同于
var temp = y1;
y1 = x1;
x1 = temp;
console.log(`${x}; ${y}`);

//NOTE 属性简写
var [x, y] = ["a", "b"];
var obj = {x, y};
console.log(obj);

//NOTE 等同于
var x1 = "a";
var y1 = "b";
var obj2 = {x: x1, y: y1};
console.log(obj2);

//NOTE 方法属性
var hello = {
    name: "abcdef",
    printHello: function printHello(){
        console.log("Hello");
    }
};
//NOTE 等同于
var hello2 = {
    name: "abcdef",
    printHello(){
        console.log("Hello");
    }
}
console.log(hello2.printHello());

//NOTE class
function Book2(title, pages, isbn){
    this.title = title;
    this.pages = pages;
    this.isbn = isbn;
}
Book2.prototype.printTitle = function(){
    console.log(this.title);
};

class Book {
    constructor (title, pages, isbn){
        this.title = title;
        this.pages = pages;
        this.isbn = isbn;
    }
    //NOTE 其他方法会添加到构造器的原型中
    printIsbn(){
        console.log(this.isbn);
    }
}

let book = new Book("title", "pag", "isbn");
console.log(book.title);
book.title = "new title";
console.log(book.title);

//NOTE 继承
class ITBook extends Book {
    constructor(title, pages, isbn, technology){
        //NOTE 引用superclass构造函数
        super(title, pages, isbn);
        this.technology = technology;
    }
    printTechnology(){
        console.log(this.technology);
    }
}

let jsBook = new ITBook("学习JS算法", "200", "1234567890", "JavaScript");
console.log(jsBook.title);
console.log(jsBook.printTechnology());

//NOTE 使用属性存取器

class Person {
    constructor(name){
        this._name = name;
    }
    get name(){
        return this._name;
    }
    set name(value){
        this._name = value;
    }
}

let lotrChar = new Person("Frodo");
console.log(loterChar.name);
lotrChar.name = "Gandalf";
console.log(lotrChar.name);
lotrChar._name = "Sam";
console.log(lotrChar.name);