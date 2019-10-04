// 抽象出事件处理绑定
function delegate(el, eventName, selector, handler){
	el.addEventListener(eventName, e=>{
		if(e.target.matches(selector)){
			handler()
			render()
		}
	})
}






// 使用模式字符串时, 每次渲染时, 都会重新渲染全部内容
// 引入diffDOM
// <script src="browser/diffDOM.js"></script>

// 生成新的DOM
function render2(){
	localStorage.toods = JSON.stringify(todos)
	div.innerHTML = html
}

function render(){
	var newDom = render2()
	// 返回具体修改的操作
	var operations = dd.diff(todoAppEl.firstChild, newDom)
	
	// 执行修改操作
	dd.apply(todoAppEl.firstChild, operations)
	
}


var firstDom = render2()

// 包含todo标签内容的tag
todoAppEl.innerHTML = html
todoAppEl.appendChild(firstDom)





// virtual DOM Object
// 根据virtual DOM 生成实际 元素
function virtualDom2RealDom(vd){
	if(vd){
		var node = document.createElement(vd.tag)
		if(vd.attrs){
			for(var prop in vd.attrs){
				var val = vd.attrs[prop]
				node.setAttribute(prop, val)
			}
		}
		if(vd.children){
			if(typeof vd.children === 'string'){
				node.appendChild(virtualDom2RealDom(vd.children))
			}else{
				for(let child of vd.children){
					node.appendChild(virtualDom2RealDom(child))
				}
			}
		}
	}else if (typeof vd === 'string'){
		return document.createTextNode(vd)
	}
}





// lit-html
// <script type="module">
//   import {html, render} from './node_modules/lit-html/lit-html.js';
//   window.html = html
//   window.litHtmlRender = render
// </script>

function render3(){
	// 根据数据生成 virtual DOM 对象
	var vdom = html`
	// dom node
	`
	return vdom
}

function render(){
	var dom = render3()
	// 根据 virtual DOM 对象进行渲染
	litHtmlRender(vdom, todoAppEl)
}



// vue.js