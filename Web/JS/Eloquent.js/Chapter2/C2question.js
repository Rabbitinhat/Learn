/*
 * @Author: chyon71 
 * @Date: 2019-03-09 18:10:48 
 * @Last Modified by: chyon71
 * @Last Modified time: 2019-03-28 19:34:33
 * @The Answer : The C Answer Book by Clovis L. Tondo & Scott E. Gimpel 
 */

//绑定/变量
let caught = 5 * 5;

//NOTE LoopingTriangle
let str = "";
for (let i = 0; i < 7; i++) {
    console.log(str += "#");
}

for(let line = "#"; line.length < 7; line += "#"){
    console.log(line);
}

//NOTE FizzBuzz
for (let i = 0; i < 100; i++) {
    if ((i % 3) === 0) {
        console.log("Fizz");
        continue;
    }
    if ((i % 5) === 0) {
        console.log("Buzz");
        continue;
    }
    console.log(i);
}
//NOTE update
for (let i = 1; i < 101; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
        console.log("FizzBuzz");
    }
    else if (i % 3 === 0) {
        console.log("Fizz");
        continue;
    } else if (i % 5 === 0) {
        console.log("Buzz");
        continue;
    } else {
        console.log(i);
    }
}

for(let i=1; i<101; i++){
    let output = ""
    if(i % 3 === 0) output += "Fizz";
    if(i % 5 === 0) output += "Buzz";
    console.log(output || i);
}
console.log(
    ` # # # #
# # # # 
 # # # #
# # # #
 # # # #
# # # #
 # # # #
# # # #`);

function mkTable(rows, cols) {
    for (let i = 0; i < rows; i++) {
        let s = "";
        if (i % 2 === 0) {
            for (let j = 0; j < cols; j++) {
                if (j % 2 === 0) {
                    s += " ";
                } else {
                    s += "#";
                }
            }
        } else {
            for (let j = 0; j < cols; j++) {
                if (j % 2 === 0) {
                    s += "#";
                } else {
                    s += " ";
                }
            }
        }
        console.log(s);

    }
}

mkTable(8, 8);

let size = 8;
let board = "";
for(let y = 0; y<size; y++){
    for(let x =0; x<size; x++){
    if((x + y) % 2 == 0){
        board += " ";
    }else{
        board += "#";
    }
    
}
board += "\n";
}
console.log(board);

//NOTE 递归 recursion
function power(base, exponent){
    if(exponent == 0){
        return 1;
    }else{
        return base * power(base, exponent - 1);
    }
}
console.log(power(2, 3));
function forpower(base, exponent){
    let result = 1;
    for(let i=exponent; i>0; i--){
        result *= base;
    }
    return result;
}

console.log(forpower(2, 3));