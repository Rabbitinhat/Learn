console.log("NaN不与任何值相同")
console.log(NaN == NaN);

console.log("运算符优先级");
let i = 1+1 == 2 && 10 * 10 > 50;
console.log(i);

console.log(5 * 2 > 7);

console.log("自动转换");
console.log("5" - 1);
console.log("five" * 2);
console.log(8 * null);
//NOTE 
console.log("逻辑运算符的短路特性");
console.log(null || "user");
console.log("Agnes" || "user");

console.log(null && "user");
console.log("Agnes"&&"user");

let x = 1;
console.log("user"|| (x=6) );
console.log(x);
console.log(null && (x=14));
console.log(x);
console.log(null || (x=15));
console.log(x);
console.log("user" && (x=3));
console.log(x);
console.log(2 > 7? (x=12) : "right");
console.log(x);
console.log(2 < 7? (x = 33):"Wrong");
console.log(x);