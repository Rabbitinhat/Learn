re = /\d\\/
re.source //=> NOTE '\\d\\\\' 每个\都被转义

var re = /\w\w+/
re.exec('dddddddedd ddde')
re.global
re.flags
re.lastIndex //=> 0 NOTE regexp没有g标志时(global), 每次执行exec都是从头开始
var re = /\w\w+/g
re.exec('dddddddedd ddde')
re.lastIndex //=> 10 NOTE 有g标志时, 每次执行lastIndex都会更新,(每次匹配一项)

function match(str, re, startIndex){
  if(re.global){
    re = new RegExp(re.source, re.flags) //NOTE re的属性构造新的regexp
  }else{
    re = new RegExp(re.source, re.flags+"g") //NOTE 为re添加glabol属性
  }

  re.lastIndex = startIndex //NOTE  为了将re从指定位置开始匹配
  return re.exec(str)
}

// NOTE new RegExp(str, flags(重复的标志会报错))

let input = "A string with 3 numbers in it... 42 and 88."
let number = /\b\d+\b/g
let match
while(math = number.exec(input)){//-> ["", index, ], 不存在匹配项返回null
  console.log("Found", math[0], "at", math.index)
}

r`
color: ${4}
`
// NOTE tag string 標簽字符串

function template(strings, ...keys){
  return (function(...values){
    var dict = values[values.length-1] || {}
    var result = [strings[0]] // ANCHOR 保留模板字符串中字符串部分
    keys.forEach(function(key, i){
      var value = Number.isInteger(key)? values[key] : dict[key]
      result.push(value, strings[i+1])
    })
    return result.join('')
  })
}

var t1Closure = template`Hi! ${0}${1}${0}!`
console.log(t1Closure('Y', 'A'))
var t2Closure = template`JavaScript ${0}${'foo'}`
console.log(t2Closure('Hello', {foo: 'World'}))


function isPrime(n){
  return !/(?=(.{2})\1+)/gi.test("x".repeat(n))
}

function incrementString (strng) {
  // return incrementedString
  return strng.replace(/(?<=\w)(\d*)$/, function(_, end){
    if(end === "") return 1
    else{
      return end.replace(/([0]+)(\d+)/g, function(_, zero, num){
        let re = zero + (+num + 1)
        if(re.length > (zero.length + num.length)){
          return re.slice(1)
        }else{
          return re
        }
      })
    }
  })
}

// NOTE match, exec 第一項為匹配項, 之後項為捕獲組; 在使用(?:)非捕獲組時, 匹配項和第一個捕獲組并不相同

String.prototype.myMatch = function(re){
  if(re.global){
    re.lastIndex = 0
    let match
    let result = []
    while(match = re.exec(this)){
      result.push(match[0])
    }
    re.lastIndex = 0
  }else{
    return re.exec(this)
  }
}

String.prototype.mySearch = function(re){
  re.lastIndex = 0
  let match = re.exec(this).index
  re.lastIndex = 0
  if(match){
    return match.index
  }else{
    return -1
  }
}

String.prototype.mySplit = function(re){
  let result = []
  if(re.global){
    var previous = re.lastIndex
  }else{
    re = new RegExp(re.source, re.flags + "g")
  }
  let match
  let lastIndex = 0
  while(match = re.exec(this)){
    result.push(this.slice(lastIndex, match.index))
    // FIXME 如果存在捕獲組, 將捕獲的字符push進result中; match.slice()返回數組, ...將其展開
    result.push(...match.slice(1))
    lastIndex = re.lastIndex
    // FIXME 匹配位置時(使用斷言), lastIndex不會改變, 可能會陷入死循環
    if(match[0].length === 0){
      re.lastIndex++
    }
  }
  result.push(this.slice(lastIndex))

  re.lastIndex = 0
  return result
}


// NOTE foo $1 bar $2
function transform(str){
  return function(...args){

  }
}
String.prototype.myReplace = function(re, f){
  if(typeof f === "string"){
    f = transform(f)
  }
}



let re1 = /abc/
let re2 = new RegExp("abc/")

console.log(re2.test("abc/dss"))


let dateTime = /\d{2}-\d{2}-\d{4} \d{2}:\d{2}/
console.log(dateTime.test("01-30-2003 05:20"))

let notBinary = /[^01]/
console.log(notBinary.test("01010101010100100110"))

let match = /(\d)+/.exec("one two 100")
console.log(match)
console.log(match.index)