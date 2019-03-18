# ECMASCript 6 功能

* let & const
* 模板字面量
* 解构
* 展开操作符
* 箭头函数 =>
* 类

## 用 `let` 代替 `var`

ES6 新的keyword `let`

### `let`的变量作用域

为JS添加了块级作用域(`for`, `if`)

### const 常量

用`const`定义的变量是只读的

### 模板字面量
`${变量}`

### arrow function 箭头函数

`(arguments)=>{function body}`

如果函数只有一条语句, 可以省略`return`
```js
let circleArea2 = (r) => 3.14 * r * r;
console.log(circleArea(2));
```
### 函数的参数默认值

可以设定函数参数的默认值, 当传入实际参数数量小于函数声明参数的数量时, 如果未传入值的参数具有默认值时, 就会使用默认值

### 声明展开和剩余函数

声明展开 `...`

```js
//代替.apply()
var params = [3, 4, 5];
console.log(sum(...params));
```
ES5 `.apply(this, arguments array)` 指定调用函数的作用域(第一个参数指定运行函数的作用域(设定`this`值), 参数数组(Array实例或arguments))

`...` 也可以代替`arguments`, 作为剩余参数

### 增强的对象属性

数组解构: 一次初始化多个变量
```js
var [x, y] = ["a", "b"];
```
也可用于互换值
```js
[x, y] = [y, x]
```
属性简写
```js
var [x, y] = ["a", "b"];
var obj = {x, y};
console.log(obj);
```
方法属性
```js
var hello = {
    name: "abcdef",
    printHello: function printHello(){
        console.log("Hello");
    }
};
```

### class 类

使用class关键字, 声明一个有`constructor`函数和其他方法的类.

```js
class Book{
    constructor(title, pages, isbn){
        this.title = title;
        this.pages = pages;
        this.isbn = isbn;
    }
    printIsbn(){
        console.log(this.isbn);
    }
}
```

### 继承

使用`extends`关键字扩展一个`class`并继承它的行为, 也可以通过`super`关键字引用父类的`constructor`

尽管新的声明`class`方法和传统编程语言很类似, 但`JS`面向对象编程还是基于`prototype`实现的

### 使用属性存取器

声明`get`和`set`函数, 只需要在函数名前加上`get`或`set`关键字(可以使用相同名字, 或在属性名前加`_`(作为私有属性))

### ES6, ES7向下兼容

使用`Babel`可以将`ES6/ES7`将代码转换为`ES5`