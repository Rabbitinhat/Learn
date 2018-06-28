/*
 * @Author: chyon71 
 * @Date: 2018-06-28 15:40:03 
 * @Last Modified by: chyon71
 * @Last Modified time: 2018-06-28 17:26:21
 */
var message1 = "hi";
var message2;
console.log(typeof(message2));
/*function test() {
    message3 = "hi" //message3 is not defineed
}
test();
console.log(massage3);*/
var message4 = "something";
console.log(typeof(message4));
console.log(typeof 95);
console.log(typeof null);
console.log(typeof age);
var call = null;
console.log(typeof call);
console.log(undefined == null);
var found = true;
var lost = false;
message4 = "Hello World";
var messageAsBoolean = Boolean(message4);
console.log(messageAsBoolean);
console.log(Boolean(call));
// n/a(N/A) means "not applicable"
if(message4){
    console.log("Value is true");
}
var intNum = 55;
var octalNum1 = 070;
var octalNum2 = 079;
var octalNum3 = 08;
console.log(octalNum2);
var hexNum1 = 0xAC;
var hexNum2 = 0xA;
console.log(hexNum1 + " " + hexNum2);
var floatNum1 = 10.0;
var floatNum = 3.17159e7;
console.log(floatNum);
if(0.1 + 0.2 == 0.3){
    console.log("You get 0.3");
}else console.log("the result is not equal 0.3");
console.log(Number.MIN_VALUE);
var result = Number.MAX_VALUE + Number.MAX_VALUE;
console.log(isFinite(result));
console.log(0.0/0);
console.log(5/0);
console.log(-8/0);
console.log(NaN == NaN);
// NaN "not a number"
console.log(isNaN(NaN));
console.log(isNaN("10blue"));
console.log(isNaN("10"));
var num1 = Number("Hello world");
var num2 = Number(" ");
var num3 = Number("000011");
var num4 = Number(true);
var num5 = Number(undefined);
console.log(num1 + " " + num2 + " " + num3 + " " + num4 + " " + num5);
var num1 = parseInt("123blue");
var num2 = parseInt("");
var num3 = parseInt("0xA");
var num4 = parseInt("22.5");
var num5 = parseInt("070");
var num6 = parseInt("70");
var num7 = parseInt("0xf");
console.log(num1 + " " + num2 + " " + num3 + " " + num4 + " " + num5 + " " + num6 + " " + num7);
var num8 = parseInt("070");
console.log(num8);
var num1 = parseInt("AF", 16);
var num2 = parseInt("070", 8);
console.log(num1 + " " + num2);
var floatNum1 = parseFloat("24.23.56");
console.log(floatNum1);
var firstName = "Nicholas";
var firstName = 'Rock';
var text = "This is the letter sigma: \u03a3.";
console.log(text);
console.log(text.length);
var age = 11;
var ageAsString = age.toString(2);
var found = true;
var foundAsString = found.toString();
console.log(ageAsString + " " + foundAsString);
var o = new Object();
console.log(o.constructor);
var age = 29;
age++;
--age;
var anotherAge = age-- + 2;
console.log(age + " " + anotherAge);
var s1 = "value";
var s2 = true;
var s3 = {
    valueOf: function() {
        return -1;
    }
};
s1++;
s2--;
s3++;
console.log(s1 + " " + s2 + " " + s3);
var num1 = 25;
var num2 = ~num1;
var num3 = -num1 - 1;
console.log(num1.toString(2) + " " + num2.toString(2));
console.log(num2.toString(2));
var result = 25 ^ 3;
console.log(result.toString(2));
var found = false;
var result = (found && someUnderfinedVarible);
console.log(result);
console.log("55" === 55);
var num1 = (5, 1, 4, 8, 0);
console.log(num1);

