---
title: RegExp-Summary
date: 2019-08-03 18:05:07
tags:
  - summary
  - Regular Expression
  - JavaScript
---

`Regular expression`(正則表達式), 主要用於處理, 檢查`strings`(字符串)

## Creating RegExp

JS中, regexp是一種對象, 有兩種構造方式

`RegExp`構造函數模式
```js
let reg = new RegExp("abc") //=>匹配字符串"abc"
```

表達式模式(在//内的特殊字符(對於regexp有特殊含義的字符)需要preserved(轉義))
```js
let reg1 = /abc/
let reg2 = /abc\// //=>匹配 "abc\"
let reg3 = /abc\+/ //=>匹配 "abc+"
```

## pattern

### 特殊字符

Character|Meaning
:--|--|
[] | 匹配單個字符, `[]`内填入匹配的具體字符
[^] | `[]`中, `^`表示匹配除了`^`後跟字符的其他字符, 要位於`[]`内第一個字符
[0-9] | [0123456789]的縮寫, 按照Unicode編碼排序(48-57)
\d | [0-9] 任何數字字符
\w | [a-zA-Z0-9_] 英文字母(大小寫), 數字, `_`下劃綫
\s | 任何空白符(space, tab, newline, 全角空格)
\D | 和\d相反, 任何非數字字符
\W | 任何非`\w`字符
\S | 任何非空白符
. | 除去`\n`(newline)的任何字符
+ | `+` 表示前面相鄰的字符出現1或多次
* | 出現0或多次
? | 出現0或1次(判斷是否出現)
{n}| 匹配具體出現次數
{a,b} | 匹配出現a-b次
{n,} | 出現n次或更多
() | 捕獲組, 儅特殊字符(+*?)應用于`()`包含的字符后, 表示應用於整個捕獲組, 否則只應用於單個字符, 同時捕獲組的結果也會被一些RegExp類型方法保存到返回結果中(`.exec`, `.match`)
^ | 匹配string開頭位置
$ | 匹配string結尾位置
\b | 匹配位於單詞邊界(開頭結尾)的位置
| | 匹配位於`|`左邊的模式或右邊的模式(*優先*匹配左邊, 儅左邊找不到匹配時, 才會匹配右邊), 可以進行多個選擇


### 匹配模式



## method


### RegExp.test(string)

返回`Boolean`(`true/false`)值, 表示`regexp`是否匹配`string`
```js
let reg = /abc/
console.log(reg.test("accabcds")) //=>true
console.log(reg.test("accvvva")) //=>false
```

### RegExp.exec(string) & String.match(regexp)

如果沒有匹配的字符串, 返回`null`; 否則返回一個帶有匹配信息的`array`
```js
let match = /\d+/.exec("one two 100")
console.log(match) //=> [ '100', index: 8, input: 'one two 100', groups: undefined ]
console.log("one two 100".match(/\d+/)) //=> 同上
let quoteText = /bad(ly)*/
console.log("bad".match(quoteText)) //=> [ 'bad', undefined, index: 0, input: 'bad', groups: undefined ]
```
Property | Meaning
:--|--
[0] | `regexp`匹配的整個字符串
[1]...[n] | 捕獲組的結果; 如果匹配結束后, 捕獲組未匹配到結果, 則返回的array中對應位置保存undefined; 如果捕獲組匹配了多次, array中只會保存最後一次匹配到的結果
index | 匹配結果的開始位置
input | 輸入的`string`
groupts | ? FIXME

### String.replace(regexp, string)

通過regexp將匹配到的string替換為其他結果


## Backtracking

儅regexp進行匹配時, 每讀取表達式一個模式, 就會進行最大可能的匹配, 儅進入到表達式
下個匹配模式時, 如果沒有找到合適的匹配, 就會減少上次匹配的結果的最後一個字符(回溯backtracking),
再次進行匹配. 反復操作直到找到合適的匹配或完全找不到匹配.

同樣, 在面對多分支的表達式時, 表達式本身并不對分支進行選擇, 而是按照分支在表達式
中的順序逐個進行匹配. 在進入分支前, 表達式會記錄當前的位置. 如果當前分支未找到匹
配的結果, 就會返回之前記錄的位置(backtracking)重新進入另一分支. 儅在分支中找到合適的匹配, 就會
停止其他分支的匹配, 執行表達式下一個模式的匹配.

大量的回溯(backtracking)操作會消耗大量的時間, 實際操作中要盡可能避免