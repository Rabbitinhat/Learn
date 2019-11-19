    // 函数组件
    // function Welcome(props){
    //   return <h1>Hello, {props.name}</h1>
    // }

    // ReactDOM.render(Welcome({name:'Jack'}), document.getElementById('root'))
    
    class Welcome extends React.Component {
      render(){
        return <h1>Hello, {this.props.name}</h1>
      }
    }
    //渲染组件
    ReactDOM.render(Welcome({name:'Jack'}), document.getElementById('root'))


