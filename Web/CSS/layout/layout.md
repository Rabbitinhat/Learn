## 行内布局

model:

* 行内框在一行以内水平排列, 空间不够后就折行
* 一行的所有行内框形成行框
* 行内框可以通过vertical-align做垂直微调(基于baseline)

行内框的构成

* 匿名文本: 所属块元素的line-height框
* display: inline
  * 对inline元素设置宽高无效
  * 行内框也是仅通过line-height框确定
  * 所有额外的padding, border不影响行内框的生成
  * 当inline元素无padding及border时, 其底色区域的高度为当前字体的line-height为normal时的计算值, 与实际设置的line-height无关(?)

* display: inline-block/table/flex/grid
  * 行内框为margin-box的外边缘
  * 基线为最后一行文字的基线和margin-box的下边缘为准

* 只要行框形成, 就要考虑那一行有一个匿名文本(基线位置)

* 对于替换元素, 设置display:inline无效, 作为inline-block

position: absolute 使用top bottom 拉伸height