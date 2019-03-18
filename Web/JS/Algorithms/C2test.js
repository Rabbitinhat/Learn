//NOTE 创建array
var numbers = [];
console.log(numbers.length);

//NOTE 声明时初始化
var numbers = [1, 2, 3, 4, 6];
console.log(numbers.length);

//NOTE 调用constructor创建
var numbers = new Array();

//NOTE 也可传入参数
var numbers = new Array(1, 3, 5, 2 );
console.log(numbers.length);

//NOTE 判断数组
var numbers = 3;
var arr = [7, 4, 1776];
console.log(Array.isArray(numbers));
console.log(Array.isArray(arr));

//NOTE 使用 .split()
var sentence = "the quick brown fox jumped over the lazy dog";
var words = sentence.split(" ");
for(var i=0; i<words.length; i++){
    console.log("word" + i + ": " + words[i]);
}

//NOTE 数组浅拷贝
var nums = [];
for(var i=0; i<10; i++){
    nums[i] = i;
}

var samenums = nums;

console.log(samenums);

//NOTE 修改原引用时,新引用也发生变化
nums[0] = 400;
console.log(samenums[0]);

//NOTE 深拷贝
function copy(arr1, arr2){
    for(var i=0; i<arr1.length; i++){
        arr2[i] = arr1[i];
    }
}

var othernums = [];
copy(samenums, othernums);
nums[0] = 600;
console.log(othernums[0] + "\n" + samenums[0]);

//NOTE 存取函数
//NOTE 查找函数
var names = ["David", "Cynthia", "Raymond", "Clayton", "Jennifer"];
console.log("Enter a name to search for: ");
var name = "David";
var position = names.indexOf(name);
if(position >= 0){
    console.log("Found " + name + " at position " + position);
}else{
    console.log(name + " not found in array");
}
var namestr = names.join();
console.log(namestr);
namestr = names.toString();
console.log(namestr);

//NOTE concat 合并多个数组

var cisDept = ["Mike", "Clayton", "Terrill", "Danny", "Jennifer"];
var dmpDept = ["Raymond", "Cynthia", "Bryan"];

var itDiv = cisDept.concat(dmpDept);
console.log(itDiv);

//NOTE splice() 截取数组(起始索引, 片段长度)
var newDept = itDiv.splice(2, 3);
console.log(newDept);

var nums = [1, 2, 3, 4, 5];
var len = nums.push(10);
console.log(nums + "\n" + len);

//NOTE 不利用可变函数添加元素到数组头部

var nums = [2, 3, 4, 5];
var newnum = 1;
var N = nums.length;
for(var i=N; i>=0; i--){
    nums[i] = nums[i-1];
}
nums[0] = newnum;
console.log(nums);

//NOTE unshift()
var newnum = 100;
nums.unshift(newnum);
console.log(nums);
nums.unshift(11, 23, 45);
console.log(nums);

//NOTE 不使用函数删除数组头部元素
var nums = [9, 1, 2, 3, 4, 5];
console.log(nums);
for(var i=0; i<nums.length; ++i){
    nums[i] = nums[i + 1];
}
nums.length -= 1;
console.log(nums);

nums.shift();
console.log(nums);

//NOTE 使用splice添加, 删除数组元素
//? 插入了一个数组元素
var newElements = [4, 5, 6];
nums.splice(2, 0, newElements);
console.log(nums);

var nums = [1, 2, 3, 4, 5];
nums.splice(3, 0, 4, 5, 6);
console.log(nums);

nums.splice(3, 3);
console.log(nums);

//NOTE 添加比较函数的sort()方法
function compare(num1, num2){
    return num1 - num2;
}
var nums = [3, 1, 2, 100, 4, 200, 67];
nums.sort(compare);
console.log(nums);

function comparePerson(a, b){
    if(a.age < b.age){
        return -1;
    }
    if(a.age === b.age){
        return 0;
    }
    if(a.age > b.age){
        return 1;
    }
}

//NOTE 迭代方法 .foreach(function)
function square(num){
    console.log(num, num * num);
}

var nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
nums.forEach(square);

//NOTE every()
function isEven(num){
    return num % 2 === 0;
}

var nums = [2,3, 4, 6, 8, 10];
var even = nums.every(isEven);
if(even){
    console.log("all numbers are even.");
}else{
    console.log("not all numbers are even.");
}
//NOTE some()
var nums = [1, 2, 3, 4, 5, 6, 7];
var someEven = nums.some(isEven);
console.log(someEven);

//NOTE reduce() ?
function add(runningTotal, currentValue){
    return runningTotal + currentValue;
}

var sum = nums.reduce(add);
console.log(sum);

//NOTE 累加字符串
function concat(accumulatedString, item){
    return accumulatedString + item;
}

var words = ["the", "quick", "brown", "fox"];
var sentence = words.reduce(concat);
console.log(sentence);

//NOTE 生成新数组的迭代器方法

//NOTE map()
function curve(grade){
    return grade += 5;
}

var grades = [77, 65, 81, 92, 83];
var newgrades = grades.map(curve);
console.log(newgrades);

function first(word){
    return word[0];
}

var words = ["for", "you", "information"];
var accronym = words.map(first);
console.log(accronym);

//NOTE filter()
function isEven(num){
    return num % 2 === 0;
}

function isOdd(num){
    return num % 2 !== 0;
}

var nums = [];
for(var i=0; i<20; ++i){
    nums[i]=i+1;
}

var evens = nums.filter(isEven);
var odds = nums.filter(isOdd);
console.log(evens + "\n" + odds);

function passing(num){
    return num >= 60;
}

var grades=[];
for(var i=0; i<20; i++){
    grades[i] = Math.floor(Math.random() * 101)
}
var passGrades = grades.filter(passing);
console.log("All grades: ");
console.log(grades);
console.log("Passing grades: ");
console.log(passGrades);

//NOTE 过滤不包含`cie`的单词
function afterc(str){
    if(str.indexOf("cie") > -1){
        return true;
    }
    return false;
}

var words = ["recieve", "deceive", "percieve", "deceit", "concieve"];
var misspelled = words.filter(afterc);
console.log(misspelled);

//NOTE 二维数组
//NOTE 创建二维数组

var twod = [];
var rows = 5;
for(var i=0; i<rows; i++){
    //NOTE 会造成每一项为undefined
    twod[i] = [];
}

//NOTE 为Array对象添加matrix属性
Array.matrix = function(numrows, numcols, initial){
    var a, j, i, mat = [];
    for(i=0; i<numrows; i++){
        a = [];
        for(j=0; j<numcols; j++){
            a[j] = initial;
        }
        mat[i] = a;
    }
    return mat;
}

var nums = Array.matrix(5, 5, 0);
console.log(nums);

//NOTE 字面量创建二维数组
var grades = [[89, 77, 68], [44, 23, 11], [109, 22, 76]];
console.log(grades[2][1]);

//NOTE 参差不齐的数组

//NOTE 计算平均分
var grades = [[89, 77], [76, 82, 81], [91, 94, 89, 99]];
var total = 0;
var average = 0;
for(var row=0; row<grades.length; row++){
    for(var col=0; col<grades[row].length; col++){
        total += grades[row][col];
    }
    //NOTE 计算每组成绩平均分
    average = total / grades[row].length
    //? toFixed()
    console.log("Student " + parseInt(row+1) + " average: " + average.toFixed(2));
    total = 0;
    average = 0.0;
}

//NOTE 对象数组
//NOTE 构造函数对象模式
function Point(x, y){
    this.x = x;
    this.y = y;
}

function displayPts(arr){
    for(var i=0; i<arr.length; i++){
        //NOTE 参数数组的每一项是对象,Point的实例
        console.log(arr[i].x + ", " + arr[i].y)
    }
}

var p1 = new Point(1, 2);
var p2 = new Point(3, 5);
var p3 = new Point(2, 8);
var p4 = new Point(4, 4);
//NOTE 对象数组
var points = [p1, p2, p3, p4]
for(var i=0; i<points.length; i++){
    console.log("Point " + parseInt(i+1) + ": " + points[i].x + ", " + points[i].y);
}

var p5 = new Point(12, -3);
points.push(p5);
console.log("After push: ");
displayPts(points);
points.shift();
console.log("After shift: ");
displayPts(points);

//NOTE 数组对象

//NOTE 保存周最高气温
function WeekTemps(){
    this.dataStore = [];
    this.add = add;
    this.average = average;
}

//NOTE 添加新的温度记录
function add(temp){
    this.dataStore.push(temp);
}

function average(){
    var total = 0;
    for(var i=0; i<this.dataStore.length; i++){
        total += this.dataStore[i];
    }
    return total / this.dataStore.length;
}

var thisWeek = new WeekTemps();
console.log(thisWeek.dataStore);
thisWeek.add(52);
thisWeek.add(55);
thisWeek.add(61);
thisWeek.add(65);
thisWeek.add(55);
thisWeek.add(50);
thisWeek.add(52);
thisWeek.add(49);
console.log(thisWeek.average());

var numbers = []
for(let i=0; i<16; i++){
    numbers[i] = i;
}
//NOTE foreach arrow function
numbers.forEach(function(x){
    console.log(x % 2 == 0);
});

numbers.forEach(x=>{
    console.log(x % 2 == 0);
});

//NOTE for...of 循环迭代数组
for(let n of numbers){
    console.log((n % 2 == 0)? "even" : "odd")
}

//NOTE 迭代器接口,多态
let iterator = numbers[Symbol.iterator]();
console.log(iterator.next().value);
console.log(iterator.next().value);
console.log(iterator.next().value);

//NOTE 从数组中得到迭代器
//NOTE entries
let aEntries = numbers.entries();
//NOTE 返回包含键值对的@@iterator, [0, 1] array[0]的值为1
console.log(aEntries.next().value);
console.log(aEntries.next().value);
console.log(aEntries.next().value);
//NOTE 返回包含数组索引的迭代器
let aKeys = numbers.keys();
console.log(aKeys.next());
console.log(aKeys.next());
console.log(aKeys.next());

var numbers = []
for(let i=0; i<16; i++){
    numbers[i] = i;
}
//? error numbers.values is not a function
/* let aValues = numbers.values();
console.log(aValues.next());
console.log(aValues.next());
 */
//NOTE Array.form
//创建只包含numbers中偶数的数组
let evens = Array.from(numbers, x=>(x%2==0));

let number3 = Array.of(1);
let number4 = Array.of(1, 2, 3, 4, 5);

console.log(`${number3} , ${number4}`);

//NOTE 配合`...`展开操作符, 可以对数组进行复制; 深拷贝
let numberscopy = Array.of(...number4)

console.log(numberscopy);
number4[0] = 100;
console.log(numberscopy[0]);

//NOTE 使用fill()
numberscopy.fill(0);
//NOTE 指定填充位置
numbers.fill(2, 1);

//NOTE 指定开始和结束索引
numberscopy.fill(1, 3, 5);
//NOTE 使用fill进行初始化
let ones = Array(6).fill(i);

console.log(`${numberscopy}, ${numbers}`);

let copyArray = [1, 2, 3, 4, 5, 6];

//NOTE 使用copyWithin 将 4, 5, 6复制到数组头部
copyArray.copyWithin(0, 3);
//NOTE 复制4, 5到1, 2
//NOTE 复制到的位置, 起始位置, 结束位置(不包括结束位置的元素)
copyArray.copyWithin(1, 3, 5)

var numbers = [];
for(let i=0; i<16; i++){
    numbers[i] = i + 1;
}

//NOTE find findIndex
function multipleOf13(element, index, array){
    return (element % 13 == 0) ? true : false;
}

console.log(numbers.find(multipleOf13));
console.log(numbers.findIndex(multipleOf13));