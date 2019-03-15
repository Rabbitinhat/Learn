//NOTE min 接受两个参数, 返回其最小值
function min(num1, num2){
    return num1 < num2 ? num1 : num2;
}

console.log(min(0, 10));
console.log(min(0, -10));

//NOTE 递归isEven
function isEven(num){
    if(num == 0){
        return true;
    }else if(num == 1){
        return false;
    }else{
        return isEven(num - 2);
    }
}

console.log(isEven(50));
console.log(isEven(75));

//NOTE 改进版 防止递归溢出
function isEven(num){
    if(num < 0){
        num = (-num);
    }
    if(num == 0){
        return true;
    }else if(num == 1){
        return false;
    }else{
        return isEven(num - 2);
    }
}

console.log(isEven(-1));

//NOTE 字符计数
function countChar(str, target = "B"){
    let count = 0;
    for(let i=0; i<str.length; i++){
        if(str[i] == target){
            count++;
        }
    }
    return count;
}

console.log(countChar("BBC"));
console.log(countChar("kakkerlak", "k"));

