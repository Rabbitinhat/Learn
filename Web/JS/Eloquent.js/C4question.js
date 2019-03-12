//NOTE 
let journal = [];
function addEntry(events, squirrel) {
    journal.push({ events, squirrel });
}
//NOTE 添加记录
addEntry(["work", "touched tree", "pizza", "running", "television"], false);
addEntry(["work", "ice cream", "cauliflower", "lasagna", "touched tree", "brushed teeth"], false);
addEntry(["weekend", "cycling", "break", "peanuts", "beer"], true);

//NOTE 计算数组的系数
function phi(table) {
    return (table[3] * table[0] - table[2] * table[1]) /
        Math.sqrt((table[2] + table[3]) *
            (table[0] + table[1]) *
            (table[1] + table[3]) *
            (table[0] + table[2]));
}

console.log(phi([76, 9, 4, 1]));

//NOTE 提取事件
function hasEvent(event, entry) {
    return entry.events.indexOf(event) != -1;
}

function tableFor(event, journal) {
    let table = [0, 0, 0, 0];
    for (let i = 0; i < journal.length; i++) {
        let entry = journal[i], index = 0;
        if (entry.events.includes(event)) index += 1;
        if (entry.squirrel) index += 2;
        table[index] += 1;
    }
    return table;
}

console.log(tableFor("pizza", JOURNAL));

//NOTE 分析结果
//NOTE 寻找每种类型的事件
function journalEvents(journal) {
    let events = [];
    for (let entry of journal) {
        for (let event of entry.events) {
            if (!events.includes(event)) {
                events.push(event);
            }
        }
    }
    return events;
}
//NOTE 遍历所有事件, 并将不再里面的事件添加到events数组
console.log(journalEvents(JOURNAL));

for (let event of journalEvents(JOURNAL)) {
    console.log(event + ":", phi(tableFor(event, JOURNAL)));
}

//NOTE 范围的和
//NOTE range(start, end) 返回包含start, end在内的所有数字
function range(start, end) {
    var nums = [];
    for (let i = start; i < end + 1; i++) {
        nums.push(i);
    }
    return nums;
}

//NOTE 返回数字数组的和
function sum(nums) {
    var sum = 0;
    for (let i = 0; i < nums.length; i++) {
        sum += nums[i];
    }
    return sum;
}

//NOTE 示例
console.log(sum(range(1, 10)));

//NOTE range()修改 指定构建数组时的步长(step) 数字的间隔
function range(start, end, step = 1) {
    let nums = [];
    if (start < end) {
        for (let i = start; i < end + 1; i += step) {
            nums.push(i);
        }
    } else {
        for (let i = start; i > end - 1; i += step) {
            nums.push(i);
        }
    }
    return nums;
}

//NOTE 示例
console.log(range(1, 10));
console.log(range(5, 2, -1));
console.log(sum(range(1, 10)));

//NOTE 逆转数组
function reverseArray(arr){
    let newarray = [];
    while(arr.length>0){
        newarray.push(arr.pop());
    }
    return newarray;
}

let arr = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ];
console.log(arr);
let newarr = reverseArray(arr);
console.log(newarr);

function reverseArrayInPlace(arr){
    for(let i=0; i<arr.length/2; i++){
        let temp = arr[arr.length-1-i];
        arr[arr.length-1-i] = arr[i];
        arr[i] = temp;
    }
    return arr;
}

let arr2 = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ];
let newarr2 = reverseArrayInPlace(arr2);
console.log(newarr2);

//NOTE 实现列表
//NOTE arrayToList
function arrayToList(arr){
    //NOTE 建立列表末尾
    let first = {
        value: arr[arr.length-1],
        rest: null,
    };
    for(let i=arr.length-1; i>0; i--){
        let prev = {
            value: arr[i-1],
            rest: first
        };
        first = prev;
    };
    return first;
}

var test = arrayToList([1,2,3]);
console.log(test);

//NOTE listToarray
function listToArray(obj){
    let arr = [];
    //NOTE 从列表头部开始访问, 将value属性值添加进数组; 通过obj.rest访问下一个节点
    for(;obj !== null;obj = obj.rest){
        arr.push(obj.value)
    }
    return arr;
}

let obj = { value: 1, rest: { value: 2, rest: { value: 3, rest: null } } };
let arr = listToArray(obj);
console.log(arr);

//NOTE 通过新元素和已存在列表创建新列表
function prepend(ele, list){
    let newlist = {};
    newlist.value = ele;
    newlist.rest = list;
    return newlist;
}

let list = { value: 1, rest: { value: 2, rest: { value: 3, rest: null } } };
let newlist = prepend(4, list);
console.log(newlist);

//NOTE 返回列表指定位置中的元素
function nth(list, num=1){
    //NOTE 按照顺序查找列表元素
    for(let i=0; i<num; i++){
        //NOTE 如果下个列表项为null, 说明到达列表结尾
        if(list.rest != null){
            list = list.rest;
        }else{
            return;
        }
    }
    return list.value;
}

//NOTE 递归版本nth
function renth(list, num){
    if(list.rest == null && num > 0){
        return;
    }
    if(num == 0){
        return list.value;
    }
    return renth(list.rest, num-1);
}

console.log(nth(newlist, 5));

console.log(arrayToList([10, 20]));
console.log(listToArray(arrayToList([10, 20, 30])));
console.log(prepend(10, prepend(20, null)));
console.log(nth(arrayToList([10, 20, 30]), 1));
console.log(renth(arrayToList([10, 20, 30]), 1));

//NOTE deepEqual 深层比较 Object.keys()
function deepEqual(val1, val2){
    if(typeof val1 === "object" && typeof val2 === "object" && val1 !== null && val2 !== null){
        //NOTE 比较对象
        //NOTE 获取对象属性名数组
        var val1attr = Object.keys(val1);
        var val2attr = Object.keys(val2);
        let sign = true;
        if(val1attr.length === val2attr.length){
            for(let i=0; i<val1attr.length; i++){
                
                if(sign === true){
                    //NOTE 保存递归返回值
                    sign = deepEqual(val1[val1attr[i]], val2[val2attr[i]]);
                }else{
                    //NOTE 如果不相等
                    return sign;
                }
            }
            return sign;
        }else{
            return false;
        }
    }else if(typeof(val1) !== "object" && typeof(val2) !== "object"){
        return val1 === val2;
    }else{
        return false;
    }
}

let obj3 = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj3, obj3));
console.log(deepEqual(obj3, {here: 1, object: 2}));
console.log(deepEqual(obj3, {here: {is: "an"}, object: 2}));