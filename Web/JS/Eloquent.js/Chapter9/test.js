//RegexpGolf
//cat and car
let regexp1 = /ca[rt]/;
console.log(regexp1.exec("car"));
console.log(regexp1.exec("cat"));

//pop and prop
let regexp2 = /pr?op/;
console.log(regexp2.exec("pop"));
console.log(regexp2.exec("prop"));

//ferret and ferry and ferrari
let regexp3 = /ferr(et|y|ari)/;
console.log(regexp3.exec("ferry"));
console.log(regexp3.exec("ferret"));
console.log(regexp3.exec("ferrari"));

//end by ious
let regexp4 = /\w*ious$/;
console.log(regexp4.exec("serious"));

//space before . : ;
let regexp5 = /(\s)+(.|:|;)/;
console.log(regexp5.exec("Hello : I'm here     ; you're OK      ."));

//not include e E
let regexp6 = /[^e]*/;
console.log(regexp6.exec("Banana, regExp, good".toLowerCase()));

//more than 6
let regexp7 = /\w{6,}/;
console.log(regexp7.exec("good"));
console.log(regexp7.exec("Banana"));
console.log(regexp7.exec("interesting"));