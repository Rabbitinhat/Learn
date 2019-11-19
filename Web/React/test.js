function meme(FC, isEqual=isShadowEqual) {
    return class Comp extends React.Component {
        constructor(props) {
            super(props)
        }
        // this.props newProps 从哪里读取
        shouldComponentUpdate(newPrpos) {
            // for (var p in newProps) {
            //     // 假定this.props和newProps字段数量相同
            //     if (this.props[p] !== newProps[p]) {
            //         return true
            //     }
            return isEqual(this.props, newProps)
        }
        // sideeffect, 非主要功能的其他效果(请求数据...)
        render() {
            return <FC {...this.props}/>
        }
    }
}



function memo(FunctionComponent){
    return class extends React.PureComponent{
        render(){
            return <FunctionComponent {...this.props} />
        }
    }
}