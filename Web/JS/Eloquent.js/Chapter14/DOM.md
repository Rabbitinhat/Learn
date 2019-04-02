# 文档对象模型

浏览器接收网页的`HTML`文本并进行解析, 浏览器构建文档结构的模型.

`JS`在沙箱中(浏览器)提供了将文本转换为文档对象模型的功能, 模型是一个所见即所得的数据结构, 改变模型会使页面发生变化

## 文档结构

全局变量 `document` `document.documentElement => <html>`

`nodeType`

1, document.ELEMENT_NODE

2, document.TEXT_NODE

3, document.COMMENT_NODE

## 标准

`DOM`并不是为了`JS`设计的, DOM尝试成为一组语言中立的接口, 确保也用于其他系统中(XML)

## 沿着DOM树移动

`parentNode` => 父节点
`childNodes` => 类数组对象, 保存子节点; 不能使用(for..of)遍历, 只能使用正常的for(`i<node.childNodes.length`)

`firstChild`第一个子节点 `lastChild`最后一个子节点 没有则返回`null`

`previousSibling`相同父节点的前一个节点 `nextSibling`相同父节点的后一个节点

处理嵌套的数据结构时, 适合使用递归函数

## 查找元素

`getElementsByTagName` 从后代节点中, 搜索给定的标签名的节点, 返回类数组对象

`document.getElementById()` 查找特定`ID`属性的节点

`getElementsByClassName` 搜索特定`class`属性的元素

## 修改文档

`node.remove()` 移除节点

`node.appendChild(child)` 添加子节点, 放在子节点列表末尾

`.insertBefore(firstnode, secondenode)` 将第一个参数的节点插入到第二个参数的节点

`.replaceChild(新节点, 被替换的子节点)` 替换调用对象的子节点

## 创建节点

`document.createTextNode()` 添加文本子节点

`Array.from(arrayish)` 将类数组的节点集合转换为数组

## 属性

`getAttribute(arrName)` 获取属性值

`setAttribute(arrName)` 设置属性

## 布局

`offsetWidth/offsetHeight` 元素的宽高(border+padding+width/height)

`clientWidth/clientHeight` (padding+width/height)

`getBoundingClientRect()` 屏幕中某个元素精确位置(返回对象(`top`, `bottom`, `left`, `right`), 相对于屏幕左上角)

`pageXOffset/pageYOffset` 相对于整个文档的位置

## 样式

`style.color, style.backGround,....` 属性值为字符串

## 选择器查询

`querySelectorAll()` 类数组对象, 返回所有匹配选择器的元素

`querySelector` 只返回第一个匹配选择器的元素

## 位置与动画

