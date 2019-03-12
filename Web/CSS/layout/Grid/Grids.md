#Grids 网格

## 什么是网格布局

网格是由水平和垂直线集合创建的一个模式, 我们可以根据这个模式排列我们的设计元素. 它帮助我们创建设计-在页面之间移动时元素不会跳动或更改宽度, 从而在我们的网站上提供高一致性

通常具有`column` `row` 行列之间的间隙称为沟槽`gutter`

> CSS没有内置的网格系统

## 创建简单的网格框架

容器宽度(padding)

沟槽宽度

每列的宽度

对想要跨越多个列的布局容器赋予特殊的类, 将它们的`width`值调整到所需的列数(加上沟槽)

## 创建流体网格

将具体像素宽度转换为百分比

```
target / context = result
```

## 使用calc()函数实现计算

```
calc((colwidth*colnum) + (gutterwidth*gutternum))
```

## 语义与"非语义"网格系统

向您的标记添加类来定义布局意味着你的内容和标记与其视觉呈现相关联. 称为"非语义"的CSS类-描述内容的外观-而不是描述内容的类的语义的使用

可以将跨越列的信息直接添加到要使用的类的属性中, 而非使用`span`预先定义

## 在网格中启用偏移容器

使用外边距跨越多列距离

```css
margin-left: calc(6.25% + (2.08333333%*2));
```

## 浮动网格限制

* 总宽度加起来要正确; 否则末端元素会下降到下一行, 打破网格
* 元素的内容比它们占据的行更宽时, 会溢出

使用浮动实现网格的最大限制是它基本上是一维的. 我们处理的列元素只能跨越多列, 而不能跨越多行, 而且很难控制元素的高度; 只有当你能保证你的内容是一定的高度时才有效

## 使用Flex?

我们把每一行变成一个flex容器. 使用基于flexbox的网格, 我们仍然需要行, 以便允许我们添加小于100%的元素. 我们设置该容器display: flex;

`.col`中, 将`flex`属性`flex-grow`设置为1, 是项目可以增长, 第二个值`flex-shrink`设置为1, 项目可以收缩. `flex-basis`为auto, 由于`.col`具有width, `flex-basis`将使用width值

`flex`是一维设计, 处理单个维度(主轴), 不能为列或行创建严格的网格, 意味着如果使用`flex`创建网格, 仍然需要为浮动布局计算百分比

### 第三方网格系统

CSS Grid框架

`Skeleton`

简单的CSS框架

> Normalize是由Nicolas Gallagher编写的小型CSS库, 自动执行一些有用的基本布局修复, 并使默认元素样式在不同浏览器之间更一致

使用`Skeleton`, 给容器`<div>`一个`class` `container`, 将以`960px`最大宽度为中心

`Skeleton`基于12列网格, 顶部行框都需要`class` `one column` 表示占据一列宽度

第二行添加`class` 指定占据的列数, eg `six columns`

## 使用 CSS Grid 属性

### Defining a grid

To define a grid we use the `grid` value of the `display` property. As with Flexbox, this switches on Grid Layout, and all of the direct children of the container become grid items.

the items will not immediately look any different. Declaring `display: grid` gives you a one column gird.

add some columns to the gird `grid-template-columns: 200px 200px 200px;`

### Flexible girds with the fr unit

we can use the `fr` unit to flexibly size grid rows and columns. This unit repsents one fraction(small part) of the avaliable space in the grid container.(类似于比例 flex-grow)

you can mix `fr` units and fixed length tracks(px) - in such a case the space needed for the fixed tracks is taken away before the space is distributed to the other tracks

> the `fr` unit distributes available space, not all space. Therefore if one of your tracks has something large inside it there will be less free space to share out

### Gaps(间隙) between tracks

`grid-column-gap` for gaps between columns

`grid-row-gap` for gaps between rows

`grid-gap` set both

### Repeating track listings

you can repeat all, or a section of, your track listing using repeat notation(symbols)

```css
grid-template-columns: 1fr 1fr 1fr;
/* NOTE change */
gird-template-columns:   repeat(3, 1fr);
```

### The implicit and explicit grid

the explicit grid is the one that you create using `grid-template-columns` or `grid-template-rows`

the implicit gird is created when content is placed outside of that grid-such as into our rows

By default, tracks created in the implicit grid are `auto` sized, which in general means that they are large enough to fit their content. If you wish to give the tracks the browser creates a size. you can use the `grid-auto-rows` `grid-auto-columns`

### The minmax() function

A fairly basic fact about the web is that you never really know how tall something is going to be; additional content or larger font sizes can cause problems with desigins that attempt to be pixel perfect in every dimension

The `minmax` function lets us set a minimum and maximum size for a track
`minmax(100px, auto)` meaning minimum size is `100px`, the maximum is `auto`

`grid-auto-rows: minmax(100px, auto);`

### As many columns as will fit

`grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));`

### Line-based placement(放置)

we can place things according to these lines by specifying the start and end line. We do this using the following properties
* grid-column-start
* grid-column-end
* grid-row-start
* grid-row-end

shorthand properties
* grid-column
* grid-row

> you can use the value `-1` to target the end column or row line, and count inwards from the end using negative values. However this only works for the Explicit Grid

### Positioning with grid-template-areas

An alternative way to place items on your grid is to use the `grid-template-areas` property and giving the various elements of your design a name

`grid-template-areas` ?
* you need to have every cell of the gird filled
* to span across two cells, repeat the name
* to leave a cell empty, use a `.`(period)
* Areas must be rectangular-you can't have an L-shaped area for example
* Area can't be repeated in different locations

### A CSS Grid, grid framework

Grid "frameworks" tend to be based around 12 or 16 column grids and with CSS Grid