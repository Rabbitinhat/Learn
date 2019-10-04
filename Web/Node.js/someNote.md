
# 模式字符串

## todo list

### 初始方法

使用模式字符串包含变量, 每次变量发生变化时, 生成新的字符串, 覆盖之前生成的字符串的全部内容

### 改进一

找到差异

字符串不易查找不同
将模式字符串转换为树状结构, 便于查找不同, 直接修改不同的部分


#### 问题

根据(?DOM object, 模式字符串)不同进行修改, 修改改动的部分(直接渲染出页面, 还是生成DOM object, 然后插入)

直接生成DOM树结构, 而非模式字符串

- diffDOM
    + [diffDOM](https://github.com/fiduswriter/diffDOM)
    + 生成的是原生的DOM节点, 会占用大量资源(原生DOM的特点, 大量属性值, 继承链(指向祖先元素, 后代元素))

分析不同状态模式字符串的结构不同(DOM节点), 将不同部分进行渲染, 而不是直接重新渲染出整个字符串

### 改进二

#### 问题

原理

根据数据返回 virtual DOM, 比较出不同(diff), 对原生DOM根据不同进行修改

- T7.js 
    - 引入 virtual DOM
- lit-html

使用虚拟DOM(`virtual DOM Object` 只包含部分标签属性, tag, attrs, children), 而非原生的DOM节点. 使用虚拟DOM对象进行比较


### 改进三

Vue

原理

new Vue() 创建入口元素, 将该元素(el property)的outerHTML作为模板, 然后根据数据(data prop) 生成具体的HTML结构, 每次数据变化时, 根据数据生成virtual DOM, 对模板中不同的部分进行修改, 产生动态更新的效果