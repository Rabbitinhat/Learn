console.log(typeof "12"); //->string
console.log(typeof Infinity); //->number
console.log(typeof NaN); //->number
console.log(typeof num); //->undefined
console.log(typeof null); //->object
console.log(typeof undefined); //->undefined
console.log(typeof .1); //->number
console.log(Number.parseInt("n")); //->NaN
console.log(typeof Number.parseInt("n")); //->number

console.log(typeof 4.5); //->number
console.log(typeof "x"); //->string

console.log(-(10 - 2)); //-> -8

/* Boolean operator*/
/* compare > <*/
console.log(3 > 2); //->true
console.log(6 > 19); //->false
console.log(Infinity > -Infinity); //->true
console.log(null > undefined); //->false
console.log(-Infinity > NaN); //->false
console.log(Infinity > NaN); //->false
console.log(Boolean(null)); //->false
console.log(Boolean(undefined)); //->false

console.log(`Compare Strings: ${"aardvark" < "Zoroaster"}`); //->false

/* >= <= == === != !== */
console.log("Apple" == "Orange"); //->flase
console.log("2" == 2); //->true
console.log("2" === "2"); //->true
console.log("2" === 2); //->false
console.log(undefined == null); //->true
console.log(undefined === null); //->false
console.log(NaN == NaN); //->false

/* logic operator and && or || not ! */
console.log(true && true); //-> true
console.log(true && false); //->false

console.log(true || false); //-> true

console.log(!true); //->false
console.log(!false); //->true

/* precedence || &&  compare-operators(> == ...) rest*/
console.log(1 + 1 == 2 && 10 * 10 > 5); //->true

/* ternary operator  */
console.log(true ? 1 : 2); //->1
console.log(false ? 1 : 2); //->2

/* empty value  null undefined */
console.log(typeof null); //->object
console.log(typeof undefined); //->undefined
/* automatic type conversion */
console.log(8 * null); //->0
console.log("5" - 1); //->4
console.log("5" + 1); //->"51"
console.log("five" * 2); //-> NaN
console.log(false == 0); //->true

console.log(null == 0); //->true
console.log(null === 0); //->false

console.log("" == false); //->true
console.log(0 == false); //->true
console.log(NaN == false); //!->true? false

/* short-circuiting */
/* || */
console.log(null || "user"); //!-> "user"
console.log("Agnes" || "user"); //!->"Agnes"

/* && */
console.log(null && "user"); //!->null?
console.log("Agnes" && undefined); //->undefined

