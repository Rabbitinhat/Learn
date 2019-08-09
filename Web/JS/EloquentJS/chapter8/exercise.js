// RegExp Golf
// Quoting Style
let reg = /^'|\s'|'\s/g

var i = 0
var str = '{}'

function parseValue(){
  if(str[i] === '{'){
   return parseObject()
  }
  if(str[i] === '"'){
    return parseString()
  }
  if(str[i] === '['){
    return parseArray()
  }
  if(str[i] === 't'){
    return parseTrue()
  }
  if(str[i] === "f"){
    return parseFalse()
  }
  if(str[i] === "n"){
    return parseNull()
  }
}
function parseString(){
  // "abc"
  i++
  var start = i
  while(str[i] !== '"'){
    i++
  }
  var result = str.slice(start, i)
  i++
  return result
}

function parseObject(){
  // {"a": "b", "c":"d"}
  let result = {}
  i++
  while(str[i] !== '}'){
    if(str[i] === ","){
      i++
    }
    let key = parseString()
    i++ // * 跳過':'
    let value = parseValue()
    result[key] = value
  }
  i++ // * 跳過'}'
  return result
}

function parseArray(){
  // ["a", "b", c, {"d":"1"}]
  let result = []
  i++ // * 跳過'['
  while(str[i] !== "]"){
    if(str[i] === ","){
      i++
    }
    let value = parseValue()
    result.push(value)
  }
  i++ // * 跳過']'
  return result
}

function parseNumber(){
  //[]
  
}

function parseTrue(){
  //true
  i += 3
  return true
}

function parseFalse(){
  i += 4
  return false 
}

function parseNull(){
  i += 3
  return null
}