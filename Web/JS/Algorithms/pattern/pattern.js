//NOTE 算法模式

//NOTE stack overflow error
var i=0;
function recursiveFn(){
    i++;
    recursiveFn();
}

try {
    recursiveFn();
}catch(ex){
    console.log(`i = ${i}, error = ${ex}`);
}

//NOTE 斐波那契数列
function fibonacci(num){
    //NOTE 边界条件
    if(num === 1 || num === 2){
        return 1;
    }
    return fibonacci(n-1) + fibonacci(n-2);
}

//NOTE 循环实现
function fib(num){
    let n1 = 1;
    let n2 = 1;
    let n = 1;

    for(let i=3; i<=num; i++){
        let n = n1 + n2;
        n1 = n2;
        n2 = n;
    }
    return n;
}