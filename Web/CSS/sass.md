# Sass入门总结

## 编译sass
***

- 命令行编译
  ```
  //单文件转换命令
  sass input.scss output.css
  
  //单文件监听命令
  sass --watch input.scss:output.css

  //sass监听整个目录
  sass --watch app/sass:public/stylesheets
  
  ```

## 使用变量
***
`sass`可以将`css`属性值定义为变量, `sass`使用`$`来标识变量

### 1-1. 变量声明

任何`css`属性值的赋值都可以用作`sass`的变量值
```
    $highlight-color: #F90;
    $basic-border: 1px solid black;
    $plain-font: "Myriad Pro", "Myriad", Arial, sans-serif;
```
变量可以定义在规则块之外(全局?),定义在规则块之内的变量只能在规则块内使用
```
    $nav-color: #F90;
    nav {
        $width: 100px;
        width: $width;
        color: &nav-color;
    }

    //编译后
    nav {
        width: 100px;
        color: #F90;
    }
```
### 1-2. 变量引用

凡是`css`属性标准值可存在的位置, 变量就可以使用; `css`生成时, 变量会被值所取代

声明变量时, 也可以引用其他变量
```
    $highlight-color: #F90;
    $highlight-border: 1px solid $highlight-color;
    .selected {
        border: $highlight-border;
    }
```

### 1-3 变量的命名
中划线和下划线都可

## 嵌套`CSS`规则
***
对于相同父子关系的规则
```
    #content {
        article {
            h1 {color: #333;}
            p {margin-bottom: 1.4em;}
        }
        aside {background-color: #EEE;}
    }
```

输出`css`时, 外层选择器会放在内层的前边

### 2-1 父选择器的标识符&
使用伪类或伪元素时
```
    article a {
        color: blue;
        &:hover { color: red; }
    }
```
输出`css`时, 对于包含标识符`&`的选择器, `sass`会用外层选择器(父)直接替换`&`

`&`的位置很灵活
```
    #content aside {
        color: red;
        body.ie & {color: green}
    }

    //编译后
    #content aside {
        color: red;
    }

    body.ie #content aside {
        color: green;
    }
```

### 2-2 群组选择器的嵌套
```
    //css
    .container h1, .container h2, .container h3 {
        margin-bottom: .8em;
    }

    //sass
    .container {
        h1, h2, h3 {margin-bottom: .8em;}
    }

    //css
    nav a, aside a {color: blue;}

    //sass
    nav, aside {
        a {color: blue;}
    }
```
要注意嵌套的使用, 可能会使`css`文件变的过大

### 2-3 子组合选择器和同层组合选择器: >, +和~
```
    article {
        ~ article {border-top: 1px dashed #ccc;}
        > section {background: #eee;}
        dl > {
            dt {color: #333;}
            dd {color: #555;}
        }
        nav + & {margin-top: 0}
    }
```

### 2-4 嵌套属性

```
    nav {
        border: {
            style: solid;
            width: 1px;
            color: #ccc;
        }
    }
```
输出`css`时,会将外层属性去掉`:`后用`-`和内层属性链接起来

```
    nav {
        border: 1px solid #ccc {
        left: 0px;
        right: 0px;
        }
    }

    //css
    nav {
        border: 1px solid #ccc;
        border-left: 0px;
        border-right: 0px;
    }
```

## 导入`SASS`文件
***

在`css`中, `@import`只有执行到时,才会去下载其他文件, 会拖慢速度

而在`sass`中, 生成`css`时就会进行文件导入, 将所有文件整合为一个

`sass`中的`@import`规则, 可以省去文件后缀(意味着可以同时导入`.css`, `.sass`和`.scss` ?)

### 3-1 使用`SASS`局部文件

当使用`@import`规则时, 有些`sass`文件可能不需要生成对应独立的`css`文件, 这样的`sass`文件成为局部文件

`sass`将以`_`文件名开头的文件作为局部文件
`_night-sky.sass`, 局部文件在编译时不会单独输出`css`, 只是用于导入

导入局部文件时可以忽略文件后缀

### 3-2 默认变量值

正常情况下, 反复声明同名变量, 值会被覆盖
```
    $fancybox-width: 400px !default;
    .fancybox {
        width: $fancybox-width;
    }
```

使用`!default`标签, 当变量被声明赋值了, 就是用声明的值; 否则使用`!default`指定的默认值

### 3-3 潜逃导入

`sass`允许`@import`写在规则内部; 此时生成`css`时, 导入的文件会插入到该规则内部

有文件如下

```
    //文件名为_blue-time.css
    aside {
        background: blue;
        color: white;
    }
```

导入它
```
    .blue-theme {@import "blue-theme"} //注意省略了后缀

    //生成结果
    .blue-theme {
        aside {
            background: blue;

        }
    }
```

被导入文件中的所有变量和混合器也只会再规则内生效

### 3-4 原生CSS导入

由于`sass`也兼容`css`, 也支持原生的`css@import`命令; 通常再`sass`中使用@import会尝试导入`sass`文件, 但有
三种情况会生成原生`css@import`, 从而影响下载

* 被导入文件以`.css`结尾
* 被导入文件名是一个URL地址
* 被导入文件的名字时css的url()值


可以将`css`文件后缀改为sacss来避免这种情况

## 静默注释

`sass`中, 使用`//`格式生成注释, 使注释不会`css`文件中

```
    body {
        color: #333; //静默注释, 不会出现在生成`css`中
        padding L0; /* 会出现在生成的css文件中*/
    }
```

编写sass时, 如果注释放在对应`css`不允许存在的地方时, `sass`生成`css`时, 也会将其忽略

## 混合器

***

实现大段样式的重用

`@mixin`标识混合器

```
    //创建混合器
    @mixin rounded-corners {
        -moz-border-radius: 5px;
        -webkit-border-radius: 5px;
        border-radius: 5px;
    }
```

`@include` 使用混合器

```
    notice {
        background-color: green;
        border: 2px solid #00aa00;
        //使用混合器
        //混合器中的样式被提取到使用@include的位置
        @include rounded-corners;
    }

    //生成
    notice {
        background-color: green;
        border: 2px solid #00aa00;
        -moz-border-radius: 5px;
        -webkit-border-radius: 5px;
        border-radius: 5px;
    }
```

### 5-1 何时使用混合器

* 不停重复的一段样式
* 放在一起有意义的一组样式

### 5-2 混合器中的CSS规则

混合器不仅可以包含属性, 也可以包含css规则

```
    @mixin no-bullets {
        list-style: nones;
        li {
            list-style-image: none;
            list-style-type: none;
            margin-left: 0px;
        }
    }
```

使用(在规则内使用, 会生成该父规则的嵌套规则)

```
    ul.plain {
        color: #444;
        @include no-bullets;
    }
```
也可以使用`&`标识符;
如果混合器只包含规则, 可以在文档的顶部调用

### 5-3 给混合器传入参数

类似于`function`

```
    @mixin link-colors($normal, $hover, $visited){
        color: $normal;
        &:hover {color: $hover};
        &:visited {color: $visited};
    }

    //使用
    a {
        //像使用函数一样传入参数
        @include link-colors(blue, red, green);
    }

    //另一种形式
    a {
        @include link-colors{
            $normal: blue;
            $visited: green;
            $hover: red;
        }
    }
```

### 5-4 默认参数值
使用`$name: default-value`指定混合器参数的默认参数值(有效css属性或其他参数引用)

```
    @mixin link-colors (
        $normal,
        $hover: $normal,
        $visited: $normal
    ){
        color: $normal;
        &:hover {color: $hover;}
        &:visited {color: $visited;}
    }

    //使用
    //$normal, $hover, $visited值都为red
    @include link-colors(red)
```
## 选择器继承

***

基于`Nicole Sullivan`面向对象的`css`理念; 一个选择器可以继承为另一个选择器定义的样式, 使用`@extend`

```
    .error {
        border: 1px solid red;
        background-color: #fdd;
    }
    .seriousError {
        @extend .error;
        border-width: 3px;
    }
```
`.seriousError`会继承样式表中`.error`中的所有样式(class="seriousError" => class="seriousError error")
任何和`.error`有关的组合选择器样式也会被`.seriousError`以选择组合器的形式继承

```
    //应用到.seriousError a
    .error a{
        color: red;
        font-weight: 100;
    }
    //h1.seriousError
    h1.error {
        font-size: 1.2rem;
    }
```

### 6-1 何时使用继承

混合器主要用于展示性样式的重用; 而类名用于语义化样式的重用.

因为继承是基于类的, 所以应建立在语义化的关系上; 当一个元素拥有的类(.seriousError)表明他属于另一个类(.error)s时, 推荐使用继承(在html元素中, 一个类是另一个类的细化)

### 6-2 继承的高级用法
(任何`css`规则都可以继承或被继承)
继承一个HTML元素的全部样式(默认的浏览器样式不会继承)

```
    .disabled {
        color: gray;
        //继承;链接的样式
        @extend a;
    }
```

`.seriousError @extend .important.error` 只会继承 `improtant.error * `或`* important.error` 的样式, 而`.important`和`.error`中的样式不会被继承

`(#main .seriousError) @extend (.error)` 只有完全匹配`#main .seriousError`会继承样式

### 6-3 继承工作的细节

`@extend`的基本思想
>如果`.seriousError @extend error`, 样式表中任何一处`.error`都会使用`.error .seriousError`进行替换

继承的要点
> * 与混合器相比, 继承生成额外`css`代码相对较少(只需添加额外选择器?)
> * 继承遵守层叠

### 6-4 继承最佳实践

避免在后代选择器继承样式

## 参考

***

[快速入门](https://www.sass.hk/guide/)