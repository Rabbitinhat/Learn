# Start Vue

## 安裝

`<script src="https://cdn.jsdelivr.net/npm/vue"></script>`

Vue 被聲明為全局變量

## 介紹

作用

- 用于构建用户界面的渐进式框架
- 响应式

## 使用

### 声明式渲染

`html`文件中
- {{data}} 数据渲染位置
- `v-` 指令
    - v-bind:htmlproperty(title...) = 'message' 将vue object的message属性和属性绑定
    - v-if='message' 条件判断
    - v-for='val of array' 渲染出array中所有内容
    - v-on:event 添加事件处理
    - v-model='message' 将输入作为vue.$data.message值
- vue 处理所有DOM操作

`<script>`
声明一个Vue Object
- `el` 绑定元素的id属性
- `data` 数据
- `method`
- `watch`
- `computed`


### 组件化

### 实例

MVVM model

vm(ViewModel) Vue实例

- 所有的Vue组件(components)都是Vue实例, 并且接收相同的选项对象
- (Vue 响应式系统)绑定了实例的data属性的值, 当值发生改变时, view会改变
    + 当data指向的值为read-only时(可使用Object.freeze()设置), 则data值无法动态响应
- $method vue自定义的实例属性和方法

Vim生命周期

- vim实例有不同生命周期, 可以绑定不同的方法
- 绑定方法, 回调时, 不要使用arrow function, 可能会导致this不指向vue实例对象

模板(也可直接写render)

插值

`{{value}}` Mustache语法
- 值修改时, 插值位置会响应改变
- `v-once` 使该tag内插入的值不会改变
- `v-html="htmlelement"` 插入html(可能导致XSS攻击)
- `v-bind: tagProperty` 绑定tag属性, 当绑定的值为`false, undefined, null`时, 该属性会被隐藏
- 可以插值JS表达式

指令 `v-*`

一般作用于单个js表达式, 当表达式的值变化时, 根据不同指令, 响应式地做出一些DOM操作
- `v-if='value'` 根据value的true/false, 判断是否插入tag
- 参数 `:` 后绑定, 属性名可以为一个JS表达式(动态求值, string), 空格和引号无效
    + `v-bind: tagProperty`
    + `v-on: event` 
- 修饰符后缀 `.`  
    + 修改绑定方式

- 缩写
    + `v-bind: href` => `:href` 
    + `v-on: click` => `@click`


### 计算属性和侦听器

计算属性(函数/方法)
- 存放于Vue实例的computed属性
- 基于依赖(data中的数据)进行缓存(依赖值不发生改变时, 该函数只运行一次)

方法
- 存放于method属性中
- 每次触发(? 调用的data数据)重新渲染时, 函数再次执行

侦听
- 位于watch属性中
- 只能侦听单一属性变化(?)
