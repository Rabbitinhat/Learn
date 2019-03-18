/*
 * @Author: chyon71 
 * @Date: 2019-03-05 18:26:18 
 * @Last Modified by: chyon71
 * @Last Modified time: 2019-03-05 19:28:01
 * @The Answer : The C Answer Book by Clovis L. Tondo & Scott E. Gimpel 
 */
# Data Structures & Algorithms with JavaScript

## 结构

* chpater 1 概述 JS
* chpater 2 Array
* chapter 3 List 列表
* chapter 4 Stack 栈
* chapter 5 Queue 队列
* chapter 6 链表
* chpater 7 dictionary 字典
* chapter 8 hash? 散列表
* chpater 9 集合
* chpater 10 二叉树 二叉查找树
* chapter 11 图 图的算法
* chapter 12 排序算法
* chapter 13 查找算法
* chapter 14 动态规划 贪婪算法

## JavaScript的编程环境和模型

SpiderMonkey javaScript shell

Code Runner: `Ctrl + Alt + J` 选择运行的语言

变量作用域(函数作用域): 变量的值在定义该变量的函数内是可见的, 并在该函数定义的嵌套函数内也是可见的

递归调用: 如果某算法需要的递归深度超过JS的处理能力, 需要寻求该算法的一种迭代式(?)解决方案

## Array 数组

### JS对数组的定义

一个存储元素的线性集合(collection), 元素可以通过索引(index)来任意存取, 索引常是数字, 用来计算元素之间存储位置的偏移量

在JS中不同; 数组是一种特殊的对象, 索引是该对象的属性, 索引可能是`integer`, 但却在内部转换为`String`(JS中对象属性必须为`Stirng`类型).JS的数组效率上不如其他语言

### 使用数组

`[]` `new Array()` `Array.isArray()`

### 字符串生成数组

`String.split()` 通过分隔符(参数)将字符串分割并保存在数组中

### 对数组的整体性操作

浅拷贝

深拷贝

### 存取函数

返回目标函数的某种变体

#### 查找元素

`indexOf()` : 查找参数在目标数组中是否存在, 返回索引/`-1`; 返回最先匹配的元素位置(多个相同数组项时);

`lastIndexOf()`: 返回最后匹配

#### 数组的字符串表示

`join()`

`toString()`

#### 由已有数组创建新数组

`concat`: 合并数组

`splice`: 截取数组片段(起始索引, 片段长度)

### 可变函数

#### 为数组添加元素

`push()` 添加元素到末尾; 返回数组长度

`array.length`

`unshift` 添加新元素到数组头部; 可以一次传入多个参数

#### 删除数组元素

`pop()` 删除数组末尾元素

`shift()` 删除数组第一个元素

都返回被删除元素

#### 在中间位置添加和删除元素

`splice` 可以删除, 添加, 替换数组元素
* 起始索引
* 删除元素个数
* 添加进数组的元素

#### 数组排序

`reverse()` 翻转数组的顺序

`sort()` (使用于String) `sort`是按照字典顺序对元素进行排序(假定元素都是String类型) 可以传入比较函数解决问题

#### 迭代器方法

对数组中每个元素应用一个函数, 返回一个值, 一组值和一个新数组

#### 不产生新数组的迭代器方法

`foreach(function)` 接受一个函数作为参数, 对数组中每一个元素调用该函数

`every(function(){return boolean})` 返回boolean值的函数作为参数, 如果数组每项都返回`true`, 则该方法返回`true`

`some()` 类似`every()` 只要有一项返回`true`, 则该方法返回`true`

`reduce()` 接受一个函数, 返回一个值 (`previousValue, currentValue, index, array`)
`reduceRight()` 反方向执行累加

#### 生成新数组的迭代器方法

* map() 返回调用函数后每项结果组成的数组
* filter() 类似every(), 返回包含调用函数后结果为`true`的项

### 二维数组和多维数组

数组中保存数组元素作为项

#### 创建二维数组

* Array.matrix
* literal

#### 处理二维数组

嵌套`for`循环

#### 参差不齐的数组

二维数组中每行元素的长度不同

### 对象数组

对象可以作为数组中的元素, 数组的属性和方法同样适用

### 数组对象

对象内使用数组保存数据

### ES6和数组的新功能

使用箭头函数简化`forEach`

`for...of` 迭代数组

ES6 `@@iterator`属性, 通过`Symbol.iterator`访问; 通过调用迭代器`.next().value`方法, 可以得到数组中的值, 迭代完毕后`.next().value`返回`undefined`

#### 其他新增迭代方法

`entries()`  返回包含键值对的`@@iterator` [0, 1]

`keys()` 返回包含数组索引的`@@iterator` {value: 0, done: false}; 没有可迭代值时(数组末尾), `.next()` 会返回`{value: undefined, done: true}` 的对象; `done`属性为false, 表示仍有可迭代的值

`values()` 返回包含数组索引的值

#### from

`Array.from()` 以已有的数组为参数, 创建一个新数组, 还可以添加用于过滤值的函数
深拷贝 + fliter ?
#### Array.of

根据传入的参数创建新数组(也可复制数组, 传入剩余参数数组)

#### Fill方法

`fill()` 用静态值填充数组

使用`fill()`初始化数组
```js
//NOTE 创建长度为6, 每项值为1的数组
let ones = Array(6).fill(1);
```

#### copyWithin

`copyWithin` 复制数组的一系列元素到同一数组指定的起始位置

### find findIndex

`find()` 接收一个回调函数, 搜索一个满足回调函数的值, 返回第一个满足条件的值; 未找到返回`undefined`
`findIndex()` 返回值在数组中的索引; 未找到`-1`

### ES7 includes()

数组中存在参数, 返回`true`

### ES6 类型数组

`let myArray = new TypeArray(length);`

Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array & Float64Array 