//NOTE 展开 reduce concat
let arrays = [[1, 2, 3], [4, 5], [6]];
var newarray = arrays.reduce((count, arr)=>{
    return count.concat(arr);
}, []);

console.log(newarray);

//NOTE 自己的循环
//NOTE 接受一个值, 一个测试函数, 一个更新函数, 一个主体函数
function loop(value, test, update, body){
    let current = value;
    while(test(current)){
        body(current);
        current = update(current);
    }
    return;
}
//NOTE answer
function loop(value, test, update, body){
    for(let current = value; test(current); current = update(current)){
        body(current);
    }
}
loop(3, n => n>0, n => n-1, console.log)

//NOTE every
function every(array, test){
    for(let element of array){
        if(!test(element)){
            return false;
        }
    }
    return true;
}

//NOTE 使用some
function every2(array, test){
    //NOTE 如果存在元素返回false, some则返回true
    return !array.some((element)=>{
        //NOTE test(element)返回false, 则some()测试函数返回true
        return !test(element);
    })
}