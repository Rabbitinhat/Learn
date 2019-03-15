# Chapter 5

```js
function characterCount(script){
    return script.ranges.reduce((count, [from, to])=>{
        //NOTE count作为初始值, 上次回调的返回值
        console.log(`count is ${count}`);
        return count + (to - from);
    }, 0);
}
```
emoji符号
`charCodeAt(index)` 返回指定位置字符的`Unicode`编码 只返回一个代码单元(16bits)
`codePointAt()` 返回完整的`Unicode`编码(针对两个代码单元的字符, 但是传入仍是代码单元的索引)
使用`for/of`循环字符串, 返回真正的字符
