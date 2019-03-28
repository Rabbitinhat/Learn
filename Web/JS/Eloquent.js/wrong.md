# 3-12

不要结合使用
```js
for(let i=0; i<arr.length; i++){
    arr.pop()
}
```

`arr.pop()`会使数组长度发生变化

# 3-28

`require("")`导入自定义模块时, 导入的是一个对象