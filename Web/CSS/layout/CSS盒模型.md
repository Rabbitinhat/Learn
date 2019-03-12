# Box Model

## 基本框

CSS假定每个元素都会生成一个或多个矩形框, 称为元素框; 框中间为内容区吗周围有可选的内边距, 边框, 外边距

包含块由最近的块级祖先框, 表单元格或行内块祖先框的内容边界组成(content edge)

* 流(flow): 指西方语言文本从左向右, 从上到下显示; 也是传统HTML文档的文本布局
* 元素的边界

### witdh

* width: 左内边界->右内边界(内容区的宽度)
* height: 内容区高度
* width box-sizing
* width margin-left margin-right: auto
* min-width
* 过分受限时(3个值都非auto) margin-right: 强制auto
* 都为auto时, margin会为0, width会尽可能宽
* 水平外边距不会合并
* 父元素宽度 = 子元素width + margin-right + margin-left + padding-right + padding-left + border-left + border-right;
* 负外边距

### height

* 如果内容高度>元素框高度; 具体行为要取决于`overflow`


### box-sizing

设置一个元素为`box-sizing: border-box;` 内边距和边框不会再增加它的宽度

###使用inline-block
* `vertical-align` 会影响`inline-block`
* 需要设置每一列的宽度
* 如果HTML文件中, inline-block元素间有空白字符, 列和列之间会产生空白
