# Box Model

## 基本框

CSS假定每个元素都会生成一个或多个矩形框, 称为元素框; 框中间为内容区, 周围有可选的内边距, 边框, 外边距(width, padding, borer, margin)

* margin-box ?

包含块由最近的块级祖先框, 表单元格或行内块祖先框的内容边界组成(content edge)

* 流(flow): 指西方语言文本从左向右, 从上到下显示; 也是传统HTML文档的文本布局
* 元素的边界

### witdh

* width: 左内边界->右内边界(内容区的宽度)
* height: 内容区高度
* width box-sizing(修改盒模型)
* width margin-left margin-right: auto
* min-width
* 过分受限时(3个值都非auto) margin-right: 强制auto
* 都为auto时, margin会为0, width会尽可能宽
* 水平外边距不会合并
* 父元素宽度 = 子元素width + margin-right + margin-left + padding-right + padding-left + border-left + border-right;
* 负外边距

使用`*` 为页面添加默认背景(添加透明度)

### height

* 如果内容高度>元素框高度; 具体行为要取决于`overflow`

### box-sizing

设置一个元素为`box-sizing: border-box;` 内边距和边框不会再增加它的宽度

### 使用inline-block

* `vertical-align` 会影响`inline-block`
* 需要设置每一列的宽度
* 如果HTML文件中, inline-block元素间有空白字符, 列和列之间会产生空白

使用负外边距进行布局

常规流块元素没有边框和内边距时, 包裹着子元素的border-box, 父元素的外边距和子元素的外边距会发生合并, 触发的BFC后, 父元素则会包含子元素的margin-box, 父子元素间的边距不会发生合并.

dispaly: flow-root;

BFC规则只对触发了BFC的元素的内部生效

父元素负外边距和子元素的正外边距

normalize.css

## inline

行内元素(display: inline) 垂直方向上不受外边距, 内边距, 边框影响, 无法设置width, height;

inline : 行内框为line-height

inline-block 行内框由margin-box确定, 没有外边距重叠问题

vertical-align

文本生成的行框, 看行高