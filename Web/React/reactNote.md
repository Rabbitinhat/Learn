
## Start

React
- 声明式

React文件结构
- react.js 创建虚拟DOM
- react-dom 绘制DOM
  - 将虚拟DOM映射为真实的DOM元素
  - 可以将虚拟DOM通过canvas元素绘制
    - 相对于映射为真实DOM, 效率较高(内存占用大小, 速度)
  - 不同的react渲染位置
    - react-canvas
    - react-native/Weex
    - react-console
- 使用Babel将JSX格式代码渲染为JS

```html
<script type='text/babel'>
</script>
```

组件名应为大写
- 只有大写时, (Babel编译时)React.createElement参数才会为构造函数, 否则为字符串
```jsx
const element2 = <Mybutton>Hi</Mybutton>
//=> Babel 
const element2 = React.createElement(Mybutton, null, "Hi");
const element = <mybutton>Hello, world!</mybutton>;
//=> Babel
const element = React.createElement("mybutton", null, "Hello, world!");
```

source Map
- 保存渲染前的源代码, 供调试使用
- 将目标代码(渲染后代码)映射到源代码, 将两者相关联

`<Todo />`
- 组件实例
- JSX

`<Todo arg1=val, arg2=val />`
- 组件传参

`<button onClick={this.dec}>`
- 作为参数传给其他对象时, 可能会发生this丢失
-  使用bind进行硬绑定
-  在class中使用arrow function
   -  Arrow Function 中 this确定后, 无法被修改


- render中, return返回的元素都会通过`React.createElement()`返回React Element, 在根据不同的环境渲染为不同内容

`ReactDOM.render`
将虚拟DOM渲染至指定的元素内



`<div id="root"></div>` 根DOM节点

组件 拆分UI 独立, 复用

## JSX

```js
// JSX格式
const element = <h1>Hi</h1>
const element = <h1>Hi {element.name}</h1>
const element = <img src={element.src} />
```
- 防止注入
  - 传入内容都会经过转义

## 组件

function 组件
class 组件

纯函数
- 不应改变传入组件的参数

## State

constructor(props){
  super(props)
  this.state = {
    data: componentsData
  }
}

生命周期方法(class组件)
- 挂载
  - 组件第一次被渲染到DOM时运行
- 卸载
  - 组件从DOM中移除时

```js
// mount 时调用(在组件被渲染到DOM中后运行)
componentDidMount(){
}

// unmount 组件卸载时调用
componentWillUnmount(){

}
```

vue
- create/mouted
- destory


```JSX
render(){
  console.log('count render')
  return (
    console.log(this.props.count)
    <div>
      {this.props.count}
    </div>
  )
}
```



setState
- 含有大量重复操作, 需要进行优化
- 异步更新
- REVIEW 作为callback调用(或存在于callback中)时(事件处理...), 可能为同步操作
  - 异步原因
    - 避免连续的大量set state操作产生阻塞
    - 合并重复操作
  - 想要在修改后, 立即操作更改后的state, 可以使用setTimeout(fn)
- 传入状态的子结构
  - 覆盖之前的state结构
- 触发视图更新
- 想要重复操作时, setState可以传入一个function, 返回一个object
- 使用`Observe函数`处理state更新

```js
constructor(props){
  super(props)
}
```

调用setState修改state的值
observer函数

```js
// this.state.comment
this.setState({comment: 'Hello'})
```

this.state 和 this.props 可能会异步更新(值不会马上发生改变)


```js
this.setState((state, props) => {
  counter: state.counter + props.increment
})
```

## 事件处理

`onEvent = {function}`
- 传入函数名作为事件处理函数
- 显式调用`event.preventDefault()`
- 注意传递函数时的this丢失情况
- 传递参数时, e作为函数的第二个参数(?)
```js
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

使用 `event.preventDefault()` 阻止默认事件

## 条件渲染
- if else
  - function组件中使用if else语句
  - class组件中在render()使用一个变量存储不同状态的元素
- &&
  - 利用短路原理
- condition ? true : false
- 阻止组件渲染
  - render() return null

## 列表
- 使用map将数组元素转换为JSX元素
- 将返回的数组插入组件中

key
> key 帮助 React 识别哪些元素改变了，比如被添加或删除
> REVIEW 元素的 key 只有放在就近的数组上下文中才有意义。
- 兄弟节点间唯一
- key应位于map返回的JSX数组中的元素上(?)

## 表单

react自定义的onChange事件在`输入时`就会触发

受控
`value={this.state.value} onChange = {this.handleChange}`
- this.state.value 中的初始值作为表单默认值

```js
  this.setState({
    // 计算属性
    [name]: value
  });
```

### 状态提升

- React 组件调用时, 需要一个公共的父元素


上层组件改变下层组件状态(state), 下层触发事件使上层组件修改数据

## 事件处理

### review

webpack将node_module中文件, 和业务代码打包为两个文件
- chunk-vendors.xxx.js
- app.xxx.js


## 组合与继承

`<component style={stylesheet} />`
- 添加style样式

props
- 无法修改

继承和组合

继承问题(是否修改props)

```js
React createElement(require('foo'), {
    color: blue
})

var Foo = require('othermodule')

<Foo color="blue"/>
```

## 深入JSX

React.createElement(component, props, ...children)

使组件可以包含多个元素, 并且不需要添加额外的包裹元素

### JSX中的props

属性展开

`const {kind, ...others} = props`

### JSX 子元素

props.children

```js
// 传入callback作为子元素
  <Repeat numTimes={10}>
    {(index) => <div key={index}>This is item {index} in the list</div>}
  </Repeat>

  // array
  <ul>
  {todos.map((message) => <Item key={message} message={message} />)}
  </ul>

  // 表达式
  <MyComponent>{'foo'}</MyComponent>
```

## Fragments

需要返回多个并列组件
- 返回数组也可
- 类似于Vue中的`<template>`
- 作为数组元素时需要添加key

```js
render() {
  return (
    <React.Fragment>
      <ChildA />
      <ChildB />
      <ChildC />
    </React.Fragment>
  );
}

render() {
  return (
    <>
      <ChildA />
      <ChildB />
      <ChildC />
    </>
  );
}

render() {
  return (
    [
      <ChildA />
      <ChildB />
      <ChildC />
    ]
  );
}
```

## 不使用 ES6

`createReactClass`

## Refs

用于修改DOM节点或React元素

- DOM
- Class 组件
- 函数组件自身无法使用
  - 但函数组件内(返回的)非函数组件上可以使用
  - 函数组件没有实例(不是new调用, 而是返回值), class组件会创建一个实例
- this.ref.current => DOM/React元素
- this.props 无法访问ref(不存在ref属性)


`this.ref/refs`

### 使用

- 通过createRef()创建
  - Object.seal
- 传递给ref一个函数, 参数为DOM节点(React元素?)

### 生命周期

在组件挂载时(mounted, 组件渲染到DOM中时)调用(DOM节点作为参数), 在卸载时(从DOM中删去)调用(null为参数)

Boolean, null, undefined 会被忽略
- {flase/true/null/undefined} 不会被渲染

### 关于回调refs

组件数据更新时, 组件会重新渲染. 这时如果ref回调函数是写在JSX内时, 会运行两次.(每次更新都会运行) 第一次传入null作为参数(避免之前回调函数中存在对el的引用), 第二次传入DOM节点/React元素作为参数
- 每次更新传入ref的函数都不同

如果传入一个组件的函数(或createRef创建的对象), 则只会在挂载时执行一次
- 传入ref的参数不变


剩余参数 展开语法

#### 判断function组件和class组件

React.Component.isPrototypeOf(component)
- 判断React.Component是否位于component的原型链上

## 协调

diffing算法

声明周期函数调用

组件内部状态改变, 只修改该组件的组件树
未改变的组件不会刷新

5:30

component Update

如果对象内容发生变化, 而对象本身没有变化, 更新时传入新的对象(只修改变化的内容, 其余相同部分进行浅复制?) 

```js
staic getDerivedStateFromProps(props, state){

}
```

## state 和 生命周期

```js

  componentDidMount(){
    console.log('ComComponentDidMount')

  // 组件接收参数
  componentWillReceiveProps(){
    console.log('ComcomponentWillReceiveProps')

  // 组件更新
  // return Boolean 判断组件是否进行更新
  shouldComponentUpdate(){
    console.log('ComshouldComponentUpdate')
    return true

  // 组件更新
  componentDidUpdate(){
    console.log('ComcomponentDidUpdate')

  // 卸载组件
  componentWillUnmount(){
    console.log('ComcomponentWillUnmount')
  }
```

`shouldComponentUpdate(nextProps, nextState)` => boolean
- 判断当前组件的props和state变化时, 组件是否更新
- 默认返回true
- render() 调用前触发

`getDerivedStateFromProps(props, state)`
- render() 调用前触发
- 当需要组件的state符合传入的props时, 返回一个object修改组件的state
- 默认返回null

### 更新

```js
 // 组件更新
 // return Boolean 判断组件是否进行更新
 shouldComponentUpdate(nextprops, nextstate){
   // 根据传入的props是否发生改变决定是否update组件
   if(this.props === nextprops){
     return false
   }
   return true
 }
```

props, state 发生变化
- 传入新的props对象
- props对象不变, 但内容发生改变

### REVIEW 

组件
- render() 函数中不应调用setState()
  - setState异步修改, 而render则是同步返回

new.target
- 判断函数是否通过new调用

## PropTypes

class Components
- static propTypes = {}
- defaultProps

## strict mode

render()中
- <React.StrictMode>

## 静态类型检查

TypeScript

## Render Props

```js
<MouseTracker render={(props => (<div>{props.x}-{props.y}</div>))}/>,
```

- 传入函数作为参数
- 组件render()时, 调用传入的函数, 将返回值作为渲染内容
- 也可已使用children模式, 将函数作为组件的子组件(this.children) REVIEW 

## Refs 转发

React.forwardRef()

```js
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

// 你可以直接获取 DOM button 的 ref：
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
```

React.forwardRef() 返回一个组件, 该组件上的ref属性值作为forwardRef(fn)中fn的参数传递给fn返回的组件


## 高阶组件

REVIEW

```js
const EnhancedComponent = higherOrderComponent(WrappedComponent)
```

构造一个纯函数, 将组件作为参数, 返回新的组件, 新组件render()时包裹传入的组件参数, 并传入一个新参数
- 不要使用继承返回一个新组件
- 不要修改传入的组件
  - 纯函数

```js
function withSubscription(WrappedComponent, selectData){
  return class extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        data: selectData(DataSource, props)
      }
    }

    componentDidMount(){
      DataSource.addChangeListener(this.handleChange)
    }

    componentWillUnmount(){
      DataSource.removeChangeListener(this.handleChange)
    }

    handleChange(){
      this.setState({
        data: selectData(DataSource, this.props)
      })
    }

    render(){
      // 返回新创建的组件, 包裹传入的组件
      return <WrappedComponent data={this.state.data} {...this.props} />
    }
  }
}
```

## 与第三方库协同使用

this.ref

dispatch

React 组件更新时, 只会将数据变化前后的render中内容进行更新, 不会修改其他方式添加到组件内容中的DOM元素

## 错误边界

组件树中, 外部组件捕获内部组件发生的错误(冒泡)
- 渲染期间(render)
- 生命周期方法
- 整个组件树的构造函数中
- 无法处理事件处理函数的错误

static getDerivedStateFromError(error){error}
- 渲染备用UI
- FIXME static函数无法访问this

componentDidCatch(err, errInfo)
- 打印错误信息

错误边界组件
- class组件
- 包含处理错误的生命周期错误

## Portals

React的组件渲染时, 将组件插入到不同的DOM节点中(组件树结构不受影响, 默认情况下, 渲染出的DOM节点按照组件树的结构排列)
- 创建的Portal节点发生的事件仍然会按照render()中JSX的结构冒泡

```js
createPortalPanel(){
  return ReacDOM.createPortal((
    <div>
    Hi  
    </div>
  ), document.body)
}
```

## Context

创建一个组件, 包含可以供子组件访问的共享数据

```js
var MyUserContext = React.createContext(null) //default value

static contextType = MyUserContext

<MyUserContext.Consumer>
{value=>...this.context}
</MyUserContext>


// father Component
render(){
  return (
    <MyUserContext value="user">
      <Father>
      ...
      </Father>
    </MyUserContext>
  )
}

// children
<child>
{this.context.value}
</child>
```

## 合成事件

React中触发的事件, 其事件对象是由SyntheticEvent构造的
- 跨浏览器
- .nativeEvent => 原生的事件对象
- 默认情况下, SyntheticEvent对象在事件处理函数调用完毕后, 会被清空(所有属性置为null)
  - 在事件处理函数中, 无法异步访问事件对象(e/event)
    - `onClick((e) => {this.setState(state=>({text: e.target.value}))})`
    - 无法异步调用
  - 在事件处理函数中调用`event.persist()`, 会保留事件对象, 阻止事件对象的移除操作

## 代码分割

避免打包后的文件体积过大
- 打包为多个文件, 当不同部分被访问时, 在对相应文件进行加载
  - 懒加载

## DOM元素

className
- className = {''}
  - 只能传入字符串
  - 要动态返回className时
    - npm 'Classnames'

## SomeAPI

React.PureComponent
- 实现了shouldComponentUpdate()
- 对prop和state进行浅层对比, 来决定是否重新渲染组件

React.memo
- 类似React.PureComponent
- 用于函数组件

## REVIEW

### React.forwardRef Ref转发

组件元素, class组件生成的实例
Foo & `<Foo />`

<Foo />

- ReactElement 
- React.createElement(Foo)

Foo

- new Foo()
- class component Foo的实例
- Foo.render() => ReactElement

通过调用callback/外部函数的参数(函数类型), 通知外部函数当前函数的内部状态

### Context

导出context

```js
export const UserContext = React.createContext(null)
```
## API

REVIEW

React.lazy()

- 延迟导入组件

```js
const SomeComponent = React.lazy(() => import('./SomeComponent'));
```
```js
   // 支持ref转发(forwardRef)的lazy函数
    function lazy(f){
      class Lazy extends React.Component {
        constructor(props){
          super(props)
          this.state = {
            loading: true
          }

          f().then((Comp) => {
            this.Comp = Comp
            this.setState({
              loading: false
            })
          })
        }

        render(){
          if(this.state.loading){
            return <div>Loading...</div>
          }else{
            let Comp = this.Comp
            let {children, forwardRef, ...props} = this.props
            return <Comp {...props} ref={forwardRef} >{children}</Comp>
          }
        }
      }

      return React.forwardRef((props, ref) => {
        return (
            <Lazy 
              {...props}
              forwardRef={ref}
            >
            </Lazy>
          )
      })
    }
 
    let SomeLazyComp = lazy(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(class Foo extends React.Component {
            render(){
              return <div>FOo</div>
            }
          })
        }, 5000)
      })
    })

    class App extends React.Component {
      constructor(props){
        super(props)
        this.state = {
          show: false
        }
      }

      showing = () => {
        this.setState({
          show: true
        })
      }

      render(){
        return (
          <div onClick={this.showing}>
            Lorem
            {
              this.state.show && <SomeLazyComp />
            }
          </div>
        )
      }
    }

    ReactDOM.render(<App />, document.getElementById('app'))
```

### React.Component

## 性能优化



## HOOKS

useState: 依赖于执行顺序, 不要在if语句中使用

## Redux

state

Contaxt

## Create React App

React 创建单页应用

useCallback

## NotSafe

React-Fiber 异步渲染