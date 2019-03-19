# 算法模式

## 递归

解决问题的各个小部分, 直到解决最初的大问题

* 直接调用自身的方法和函数
```js
function recursiveFunction(someParam){
    recursiveFunction(someParam);
};
```
* 间接调用自身的函数
```js
function recursiveFunction1(someParam){
    recursiveFunction2(someParam);
};
```

每个递归函数都必须有边界条件, 即一个不再递归调用的条件, 防止无限递归

### JS调用栈大小的限制

如果没有停止函数递归调用的边界条件, 会使浏览器抛出错误(栈溢出错误 stack overflow error)
`(Chrome)RangeError: Maximum call stack size exceeded` 范围错误: 超过最大调用栈大小

ES6 中有尾调用优化(`tail call optimization`), 如果函数内最后一个操作是调用函数, 会通过"跳转指令"(`jump`) 而不是"子程序调用"(`subroutime call`)来控制, 所以在`ES6`中, 代码可以一直执行下去

### 斐波那契数列

递归一般会比普通版慢(ES6存在尾递归优化, 并不会更慢), 但更易理解, 代码量也较少