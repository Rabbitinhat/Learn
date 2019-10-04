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
    - v-bind:htmlproperty(title...) = 'message' 将vue object的message属性和属性绑定 `:property` 
    - v-if='message' 条件判断
    - v-for='val of array' 渲染出array中所有内容 
    - v-on:event 添加事件处理 `@event`
    - v-model='message' 将输入作为vue.$data.message值, model指该元素对应的数据
        + type='number' v-model.number='num'
        + type='select'
            * mulitype v-model='array'
            * signle v-model='string'
- vue 处理所有DOM操作

`<script>`
声明一个Vue Object
- `el` 绑定元素的id属性, 只在该元素及其所有子元素中生效
- `data` 数据
- `method` ?通过 this.name 调用指定的数据值
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
    + 修改绑定方式?

- 缩写
    + `v-bind: href` => `:href` 
    + `v-on: click` => `@click`


### 计算属性和侦听器

computed 计算属性(函数/方法)
- 存放于Vue实例的computed属性
- 基于依赖(data中的数据)进行缓存(依赖值不发生改变时, 该函数只运行一次)
- 属性名不能和data中属性名重复(其他未验证)

method 方法
- 存放于method属性中
- 每次触发(? 调用的data数据)重新渲染时, 函数再次执行

watch 侦听
- 位于watch属性中
- 只能侦听单一属性变化(?)

### class & 内联样式

### 条件渲染

- v-if
- v-else
- v-else-if

tag 中使用 key 表示两个元素的数据是独立的(默认为同一数据)

```html
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username" key="username-input">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address" key="email-input">
</template>
```

v-show 切换元素的display属性来控制元素的显示

### 列表渲染, 循环

v-for
- in
- of


`v-for='item in items'`

`v-for='{item, index} in items'` 
- `{{ parentMessage }} - {{ index }} - {{ item.message }}`

? 使用v-bind:key 使 v-for 来判断数组/对象中每个元素顺序, 进行重排
    - key 不会影响元素的顺序

- 变异方法(mutation method) 改变原有数组
- 非变异(non-mutation method) 不改变原有数组, 但会返回新数组

下列修改无法响应
- 但是修改会被执行

- 使用索引直接设置一个值
    - `Vue.set(vm.items, indexOfItem, newValue)`
    - $set(Vue.set) `vm.$set(vm.items, indexOfItem, newValue)`    - 
    - `vm.items.splice(indexOfItem, 1, newValue)`
- 修改数组长度时
- 对象属性的添加或删除
    + `Vue.set/vue.$set`

使用 computed/method 调用函数, 处理数组(filter, reverse)

v-for='n of integer'
- 返回0-integer数量

同一节点中, v-for的优先级高于v-if(执行多个循环, 每个循环中执行v-if)

### 事件处理

监听
- v-on
    + v-on:event = eventlistener
    + methods: eventListener
    + `$event` 将事件名作为参数
- 修饰符 event.doSomething
    + `.prevent` 阻止默认事件
    + `.stop` 阻止冒泡


## 设计模式

