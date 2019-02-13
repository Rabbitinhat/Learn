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

输出`css`时, 操作类似普通嵌套

`>, +, ~`既可以用在外层选择器的后边, 也可放在里层选择器的前边
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

使用`sass`中的`@import`规则导入文件时, 可以省去文件后缀(意味着可以同时导入`.css`, `.sass`和`.scss` ?)

### 3-1 使用`SASS`局部文件

当使用`@import`规则时, 有些`sass`文件可能不需要生成对应独立的`css`文件, 这样的`sass`文件成为局部文件

`sass`将以`_`文件名开头的文件作为局部文件
`_night-sky.sass`, 局部文件在编译时不会单独输出`css`, 只是用于导入

导入局部文件时可以忽略文件后缀

### 3-2 默认变量值