//NOTE 箭头函数 this
function normalize(){
    console.log(this.coords.map(n=>n/this.length));
}

normalize.call({coords:[0, 2, 3], length: 5});

//NOTE 判断原型
console.log(Object.getPrototypeOf({}) === Object.prototype);
console.log(Object.getPrototypeOf(Object.prototype));

console.log(Object.getPrototypeOf(Math.max) === Function.prototype);
console.log(Object.getPrototypeOf([]) === Array.prototype);

//NOTE 创建原型 Object.create(Objcet)
//NOTE protoRabbit 包含公共属性, 每个独立的实例可以包含其自身属性, 也可以派生其原型对象中公有的属性
let protoRabbit = {
    //NOTE 创建一个speak方法, 简写
    speak(line){
        console.log(`The ${this.type} rabbit says "${line}"`);
    }
};

let killerRabbit = Object.create(protoRabbit);
killerRabbit.tpye = "killer";
killerRabbit.speak("SKREEEE!");

//NOTE constructor
function makeRabbit(type){
    let rabbit = Object.create(protoRabbit);
    rabbit.type = type;
    return rabbit;
}

//NOTE 使用原型对象
function Rabbit(type){
    this.type = type;
}

Rabbit.prototype.speak = function(line){
    console.log(`The ${this.type} rabbit says "${line}"`);
}

let weirdRabbit = new Rabbit("weird");
weirdRabbit.speak("WaWa");

//NOTE 判断构造函数原型和实例的原型间的区别
console.log(Object.getPrototypeOf(Rabbit) == Function.prototype);
console.log(Object.getPrototypeOf(weirdRabbit) == Rabbit.prototype);

//NOTE class
class Rabbit {
    constructor(type){
        this.type = type;
    }
    speak(line){
        console.log(`The ${this.type} rabbit says "${line}"`);
    }
}

let killerRabbit = new Rabbit("killer");
let blackRabbit = new Rabbit("black");

//NOTE class作为值
let object = new class{getWord(){return "hello";}};
console.log(object.getWord());

//NOTE 覆盖同名属性
Rabbit.prototype.teeth = "small";
console.log(killerRabbit.teeth);

killerRabbit.teeth = "long, sharp, and bloody";
console.log(killerRabbit.teeth);
console.log(blackRabbit.teeth);
console.log(Rabbit.prototype.teeth);

//NOTE 多态
Rabbit.prototype.toString = function(){
    return `a ${this.type} rabbit`;
};

console.log(String(blackRabbit));
//NOTE symbol
//NOTE 只能创建一次
let sym = Symbol("name");
console.log(sym == Symbol("name"));
//NOTE 使用[]语法访问
Rabbit.prototype[sym] = 55;
console.log(blackRabbit[sym]);

//NOTE 向标准函数和数组原型提供`toString()`方法, 覆盖基本对象原型(Object)
console.log(Array.prototype.toString == Object.prototype.toString);
console.log([1, 2].toString());
//NOTE 调用基本原型的toString方法
console.log(Object.prototype.toString.call([1, 2]));

//NOTE 映射姓名到年龄
let ages = {
    Boris: 39,
    Liang: 22,
    Julia: 62
};

console.log(`Julia is ${ages["Julia"]}`);
//NOTE 
console.log("Is Jack's age known?", "Jack" in ages);
//NOTE 继承原型公共属性
console.log("toString" in ages);
console.log("toString" in Object.create(null));

let ages = new Map();
ages.set("Boris", 39);
ages.set("Liang", 22);
ages.set("Julia", 62);
console.log(`Julia is ${ages.get("Julia")}`);
console.log(ages.has("toString"));

//NOTE 返回对象的自己的键
console.log({x: 1}.hasOwnProperty("x"));
console.log({x: 1}.hasOwnProperty("toString"));
//? ages是新的Map()实例
console.log(Object.keys(ages));

//NOTE 将symbol转换为字符串时, 会得到传递给它的字符串, 但意义不大
const toStringSymbol = Symbol("toString");
//NOTE 通过在属性名称周围使用方括号,可以在对象表达式和类中包含符号属性,会导致属性名称的求值
//NOTE 允许我们引用该符号的绑定
Array.prototype[toStringSymbol] = function(){
    return `${this.length} cm of blue yarn`;
};

console.log([1, 2].toString());
console.log([1, 2][toStringSymbol]());

//NOTE 直接使用迭代接口
let okIterator = "OK"[Symbol.iterator]();
console.log(okIterator.next());
console.log(okIterator.next());
console.log(okIterator.next());

//NOTE 读写器
//NOTE Getter Setter 
let varyingSize = {
    get size(){
        return Math.floor(Math.random()*100);
    }
};

console.log(varyingSize.size);
console.log(varyingSize.size);

//NOTE setter
class Temperature {
    constructor(celsius){
        this.celsius = celsius;
    }
    get fahrenheit(){
        return this.celsius * 1.8 + 32;
    }
    set fahrenheit(value){
        this.celsius = (value - 32) / 1.8;
    }
    //NOTE 使用static向构造函数附加一些属性, 可以使用华氏温度创建新的温度实例, 要返回新的实例
    static fromFahrenheit(value){
        return new Temperature((value - 32) / 1.8);
    }
}
let temp = new Temperature(22);
//NOTE getter
console.log(temp.fahrenheit);

//NOTE setter
temp.fahrenheit = 86;
console.log(temp.celsius);

