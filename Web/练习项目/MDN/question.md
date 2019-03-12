# 19-2-26

## JS

* 函数大括号位置错误
* 闭包没有传入参数
```js
for (var i = 0; i < links.length; i++) {
        /* 要给匿名函数设置参数 */
        links[i].onclick = function (i) {
            return function () {
                for (var n = 0; n < links.length; n++) {
                    links[n].className = "";
                    articles[n].className = "";
                }
                links[i].className = "active";
                articles[i].className = "active-panel";
            }
        }(i);
    }
```
* `checkbox hack`: 通过`<label>`绑定按钮, 然后隐藏按钮; 实现无javaScript的方式通过按钮控制元素
* `:checked` 按钮选中?
* `:nth-of-child`
* 流式布局(liquid layout): 将列的宽度设为百分比数值;和使用max-width/min-width 可以在较小尺寸下保持相同的列宽度比(但是非常窄时, 显示会很糟糕; 通常使用媒体查询转换为单列布局)
* 固定宽度布局(fixed-width layout): 使用固定数值的width进行布局
* 您必须仔细考虑将列放在什么位置，以及如何浮动它们，以获得所需的结果。你的内容应该是有意义的，当你阅读它的源代码和它的视觉布局的时候；但是，使用浮动可以使可视化布局与源顺序不同.
* 可以通过浮动改变元素可视化的布局位置; 而元素在文档中的实际位置不变(不影响屏幕阅读器)
* box-sizing 更改盒模型，盒子的宽度取值为 content + padding + border，而不仅是之前的content——所以当增加内边距或边界的宽度时，不会使盒子更宽——而是会使内容调整得更窄
* 非浮动外边距不能用于它们和浮动元素之间来创建空间
* 清除浮动(clearing float): clear
* 闭合浮动(Enclosing float): 包裹浮动元素(两者使用clear:both的位置是不同的)
* (normal flow)
* 浮动：浮动的框可以左右移动，直至它的外边缘遇到包含框或者另一个浮动框的边缘。浮动框不属于文档中的普通流，当一个元素浮动之后，不会影响到 块级框的布局而只会影响内联框（通常是文本）的排列，文档中的普通流就会表现得和浮动框不存在一样，当浮动框高度超出包含框的时候，也就会出现包含框不会 自动伸高来闭合浮动元素（“高度塌陷”现象）。顾名思义，就是漂浮于普通流之上，像浮云一样，但是只能左右浮动。

* 函数式编程: 表面: 传入函数作为参数, 用函数处理问题