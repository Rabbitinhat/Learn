function todoList(props){
  return (
    <ul onClick={props.foo}>
      {
        props.todos.map((todo, idx) => {<TodoItem key={todo.content} todo={todo} idx={idx} />})
      }
    </ul>
  )
}

var mapState = (state) => {
  return {
    todos: state.todos
  }
}

var mapDispatch = (dispatch) => {
  return {
    foo: ()=>{
      dispatch({type: 'addTodo', todoText: 'hello' + Match.random()})
    }
  }
}

export default connect(mapState, mapDispatch)(todoList)


const TodoItem = connect(state => {

})

// 包裹, 修改 提交dispatch Redux
var TodoInput = connect(state=>{
  return {
    isAllCompleted: state.todos.every(todo => todo.done)
  }
}, dispatch => ({
  toggleAllStatus: () => dispatch({type: 'toggleAllStatus'}),
  addTodo: (e) => {
    if(e.keyCode == 13){
      dispath({type: ''})
    }
  }
}))(function todoInput(){
  return (
    <div>
      <input type="checkbox" checked={} onChange={props.toggleAllStatus}/>
      <input type="text" onKeyUp={props.addTodo}/>
    </div>
  )
})



function TodoApp(){

}


// connect实现
// Connect Provider
var StoreContext = React.createContext()


function connect(mapState, mapDispatch){
  // 返回函数以组件为参数
  return function(WrapComp){
    return function Comp(props){
      // useContext() ?
      var store = useContext(StoreContext)
      // 重新刷新状态
      var [r, steR] = useState(0)

      useEffect(() => {
        return store.subscribe(() => {
          // 刷新状态
          steR(r+1)
        })
      })

      var state = mapState(store.getState())
      var dispatch = mapDispatch(store.dispatch)

      // children只有一个, array?
      var {children, ...props2} = props
      // structure?
      return <WrapComp {...prop2} {...state} {...dispatchs}>{children}</WrapComp>
    }
  }
}