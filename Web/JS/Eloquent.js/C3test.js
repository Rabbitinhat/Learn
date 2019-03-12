let x = 10;
if(true){
    let y = 20;
    var z = 30;
    console.log(y + z);
}

console.log(x + z);
//console.log(y); //NOTE error y is not defined

const halve = function(n){
    return n / 2;
}
let n = 10;
console.log(halve(100));

console.log(n);

//NOTE 可选参数
function minus(a, b){
    if(b === undefined) return -a;
    else return a - b;
}

console.log(minus(10));
console.log(minus(10, 5));

//NOTE 使用参数默认值
function power(base, exponent = 2){
    let result = 1;
    for(let count = 0; count < exponent; count++){
        result *= base;
    }
    return result;
}

console.log(power(4));
console.log(power(2, 6));

//NOTE 闭包
function wrapValue(n){
    let local = n;
    return () => local;
}

let wrap1 = wrapValue(1);
let wrap2 = wrapValue(2);
console.log(wrap1());
console.log(wrap2());

function multiplier(factor){
    return number => number * factor;
}

let twice = multiplier(2);
console.log(twice(5));

//NOTE 给定数字, 找出有1通过+5或*3产生该数字的序列
function findSolution(target){
    function find(current, history){
        if(current == target){
            return history;
        }else if(current > target){
            return null;
        }else{
            //NOTE 两次调用, 根据||特点, 如果返回null则, 调用另一次结果
            return find(current + 5, `(${history} + 5)`) ||
                find(current * 3, `(${history} * 3)`);
        }
    }
    return find(1, "1");
}

console.log(findSolution(24));

//NOTE Print cows and Chicken
function printFarmInventory(cows, chickens){
    let cowString = String(cows);
    //NOTE 如果数字小于3位数
    while(cowString.length < 3){
        cowString = "0" + cowString;
    }
    console.log(`${cowString} Cows`);
    let chickenString = String(chickens);
    while(chickenString.length < 3){
        chickenString = "0" + chickenString;
    }
    console.log(`${chickenString} Chickens`);
}
printFarmInventory(7, 11);

function printZeroPaddedWithLabel(number, label){
    let numberString = String(number);
    while(numberString.length < 3){
        numberString = "0" + numberString;
    }
    console.log(`${numberString} ${label}`);
}

function printFarmInventory(cows, chickens, pigs){
    printZeroPaddedWithLabel(cows, "Cows");
    printZeroPaddedWithLabel(chickens, "Chickens");
    printZeroPaddedWithLabel(pigs, "Pigs");
}

printFarmInventory(7, 11, 3);
//NOTE printZeroPaddedWithLabel() 将三个操作(打印信息, 数字补零, 添加标签)放在一个函数中, 局限了功能

//NOTE 只提取一项功能
function zeroPad(number, width){
    let string = String(number);
    while(string.length < width){
        string = "0" + string;
    }
    return string;
}

function printFarmInventory(cows, chickens, pigs){
    console.log(`${zeroPad(cows, 3)} Cows`);
    console.log(`${zeroPad(chickens, 3)} Chickens`);
    console.log(`${zeroPad(pigs, 3)} Pigs`);
}

printFarmInventory(7, 16, 3);

