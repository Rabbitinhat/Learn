# 弹性盒子

有些简单布局难以使用`float` `position` 来实现
* 在父内容里面垂直居中一个块内容
* 使容器的所有子项占用等量的可用宽度/高度, 而不管由多少宽度/高度可用
* 使多列布局的所有列采用相同的高度, 即使它们包含的内容量不同

## 简单例子

指定元素布局为 `flex`

```css
/* NOTE block */
display: flex;
/* NOTE inline-block */
display: inline-flex;
```
### flex model

元素表示为`flex`时, 沿两个轴来布局

* 主轴(main axis) 沿着`flex`元素放置的方向延申的轴(row, column) 轴的开始和结束称为`main start` `main end`
* 交叉轴(cross axis) 垂直于flex元素放置方向的轴 `cross start` `cross end`
* `display: flex` 的元素称为`flex容器`(flex container)
* `flex`容器中表现为柔性盒子的元素称为`flex项`(flex item)

### 主轴方向

`flex-direction` 指定主轴的方向(默认row 按浏览器默认语言方向排成一排(en/zh-cn 从左到右))
* `row-reverse` 主轴方向为row, 反向排列子元素
* `column` 主轴方向为column(垂直排列元素)
* `column-reverse` 反向垂直排列元素

### 换行

`flex-wrap: wrap;` 任何溢出元素被移到下一行

`flex-flow: flex-direction flex-wrap`

### flex项的动态尺寸

`flex: 1` 无单位比例值, 表示每个`flex`项沿主轴的可用空间大小(1 表示每个元素占用空间都是相等的) 占用空间是在设置`padding` `margin`后的剩余空间; 因为是比例值, 所以4000 和 1 并没有区别

可以为`flex`指定最小值`flex: 1 200px;` 表示每个`flex`项会先给出`200px`可用空间, 然后, 剩余空间按比例分配

### flex 缩写

`flex`:
* 无比例单位: `flex-grow`
* `flex-shrink` 用于溢出的`flex`项 指定从每个`flex`项中取出多少溢出量, 阻止它们溢出容器
* 最小值: `flex-basis`

### 水平和垂直对齐

让`flex`项沿主轴或交叉轴对齐

`align-items` 控制`flex`项在交叉轴上的位置
* 默认值`strech` 会使所有`flex`项沿着交叉轴的方向拉伸以填充父容器, 如果父容器在交叉轴方向上没有固定宽度(高度), 则所有`flex`项将变得与最长的`flex`项一样长(高度保持一致)
* `center` `flex`项保持原有的高度, 但是会在交叉轴居中
* `flex-start` `flex-end` 保持原有高度, 在交叉轴开始或末尾处对齐

可以对单个`flex`项使用`align-self`覆盖父元素中的`align-items`属性

`justify-content` 控制`flex`项在主轴上的位置
* 默认值`flex-start` 使所有``flex`项位于主轴开始处
* `flex-end` 位于主轴结尾处
* `center` 在主轴居中
* `space-around` 使所有`flex`项沿着主轴均匀分布, 两端都会留有一点空间
* `space-between` 类似`space-around` 但不会在两端留下空间

### flex项排序

改变`flex`项的位置, 但不影响DOM树中元素顺序

`order`
* 默认项为0
* order值大的项比order值小的项在显示顺序中更靠后
* 相同order值按原顺序显示
* 可以使用负值, 使其位置在前

### flex 居中


`align-items: center;` 沿交叉轴居中
`justify-content: center;` 沿主轴居中