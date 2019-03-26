//匹配"abc"
let re1 = new RegExp("abc");
let re2 = /abc/;

let eightennPlus = /eighteen\+/

//匹配
console.log(/abc/.test("abcde"));

console.log(/abc/.test("abxde"));

//字符集
//匹配方括号中的任意字符
console.log(/[0123456789]/.test("in 1992"));

console.log(/[0-9]/.test("in 1992"));

//匹配类似30-01-2003 15:20的日期格式
let dateTime = /\d\d-\d\d-\d\d\d\d \d\d:\d\d/;

console.log(dateTime.test("30-01-2003 15:20"));
console.log(dateTime.test("30-jan-2003 15:20"));

//^排除01
let notBinary = /[^01]/;
console.log(notBinary.test("1100100010100110"));
console.log(notBinary.test("1100100010200110"));

///\d+/匹配一个或多个数字
//?注意''和""的匹配
console.log(/'\d+'/.test("'123'"));
console.log(/'\d+'/.test("''"));
console.log(/'\d*'/.test("'123'"));
console.log(/'\d*'/.test("''"));

let neighbor = /neighbou?r/;
console.log(neighbor.test("neighbour"));
console.log(neighbor.test("neighbor"));

//匹配时间
let dateTime = /\d{1,2}-\d{1,2}-\d{4} \d{1,2}:\d{2}/;
console.log(dateTime.test("30-1-2003 8:45"));

//创建一个分组
let cartoonCrying = /boo+(hoo+)+/i;
console.log(cartoonCrying.test("Boohoooohoohooo"));

//exec() 返回表示匹配字符串信息的对象/null
let match = /\d+/.exec("one two 100");
console.log(match);
console.log(match.index);

//String的match方法
console.log("one two 100".match(/\d+/));

//返回子表达式分组
//[ '\'Hello\'', 'Hello', index: 9, input: 'she said \'Hello\'' ]
let quotedText = /'([^']*)'/;
console.log(quotedText.exec("she said 'Hello'"));

//分组未匹配任何字符串
//[ 'bad', undefined, index: 0, input: 'bad' ]
//[ '123', '3', index: 0, input: '123' ]
console.log(/bad(ly)?/.exec("bad"));
console.log(/(\d)+/.exec("123"));

//Date Class
//创建当前日期
console.log(new Date());

//特定时间对象
console.log(new Date(2009, 11, 9));
//小时, 分钟, 秒, 毫秒(都可选, 默认为0)
console.log(new Date(2009, 11, 9, 12, 59, 59, 999));

//返回1970-传入时间的毫秒数
console.log(new Date(2013, 11, 19).getTime());

//传入毫秒数(1970-)创建日期
console.log(new Date(1387407600000));

function getDate(string){
    //使用分组得到数值
    //_表示忽略, 只能用于跳过exec返回的数组中的完整的匹配元素
    let [_, day, month, year] = /(\d{1,2})-(\d{1,2})-(\d{4})/.exec(string);
    return new Date(year, month - 1, day);
}

console.log(getDate("30-1-2003"));

//单词边界\b
console.log(/cat/.exec("concatenate"));
console.log(/\bcat\b/.exec("concatnate"));
console.log(/\bcat\b/.exec("cateconate"));
console.log(/cat\b/.exec("conatecat"));

//|选项模式
let animalCount = /\b\d+ (pig|cow|chicken)s?\b/;
console.log(animalCount.test("15 pigs"));
console.log(animalCount.test("15 pigchickens"));

//replace
console.log("Borbundur".replace(/[ou]/, "a"));
console.log("Borbundur".replace(/[ou]/g, "a"));

//$1 $2 引用了模式中使用()包裹的分组(最大为$9) $&引用整个匹配
console.log(
    "Liskov, Barbara\nMcCarthy, John\nWadler, Philip".replace(/(\w+), (\w+)/g, "$2 $1"));
//第二个参数为function
let s = "the cia and fbi";
console.log(s.replace(/\b(fbi|cia)\b/g, str=>str.toUpperCase()));

//-1
let stock = "1 lemon, 2 cabbages, and 101 eggs";
function minusOne(match, amount, unit){
    amount = Number(amount) - 1;
    if(amount == 1){
        unit = unit.slice(0, unit.length - 1);
    }else if(amount == 0){
        amount = "no";
    }
    return amount + " " + unit;
}

console.log(stock.replace(/(\d+) (\w+)/g, minusOne));

//移除注释
function stripComments(code){
    return code.replace(/\/\/.*|\/\*[^]*\*\//g, "");
}

console.log(stripComments("1 + /* 2 */3"));

console.log(stripComments("x=10;//ten!"));

console.log(stripComments("1/* a */+/* b */1"));