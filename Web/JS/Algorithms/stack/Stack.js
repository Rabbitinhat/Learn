//NOTE 创建栈
function Stack(){
    //NOTE 保存栈的元素
    //NOTE 私有变量
    let items = [];
    //NOTE 添加元素
    this.push = function(element){
        items.push(element);
    };
    //NOTE 移除元素
    this.pop = function(element){
        let element = items.pop();
        return element;
    };
    //NOTE 查看栈顶元素
    this.peek = function(){
        return items[items.length - 1];
    };
    //NOTE 栈是否为空
    this.isEmpty = function(){
        return items.length === 0;
    };
    //NOTE 返回栈的长度(size代替length)
    this.size = function(){
        return items.length;
    };
    //NOTE 清空栈; 也可使用pop()
    this.clear = function(){
        items = [];
    };
    //NOTE print 打印栈里的元素
    this.print = function(){
        console.log(items.toString());
    };
}

//NOTE 使用
//NOTE 初始化
let stack = new Stack();
console.log(stack.isEmpty());

//NOTE 向栈内添加元素
stack.push(5);
stack.push(8);

console.log(stack.peek());
stack.push(11);
console.log(stack.size());
console.log(stack.isEmpty());
stack.push(15);
stack.print();
stack.pop();
stack.pop();
console.log(stack.size());
stack.print();

//NOTE ES6
//NOTE 使用不可变类型 Symbol()
/* let _items = Symbol();
class Stack{
    constructor(){
        //NOTE 初始化_items的值
        this[_items] = [];
    } 
} */

//NOTE 使用weakmap保存items
const items = new WeakMap();

class Stack{
    constructor(){
        //NOTE this(Stack class) 作为 key; array 作为 value;
        items.set(this, []);
    }
    push(element){
        //NOTE 以this为key取出作为value的array
        let s = items.get(this);
        s.push(element);
    }
    pop(element){
        let s = items.get(this);
        let r = s.pop();
        return r;
    }
}

//NOTE 使用闭包防止items变量被访问
let Stack = (function(){
    const items = new WeakMap();
    class Stack{
        constructor(){
            //NOTE this(Stack class) 作为 key; array 作为 value;
            items.set(this, []);
        }
        push(element){
            //NOTE 以this为key取出作为value的array
            let s = items.get(this);
            s.push(element);
        }
        pop(element){
            let s = items.get(this);
            let r = s.pop();
            return r;
        }
    }
    //NOTE 返回class Stack的实例
    return Stack;
})();

//NOTE 解决十进制转换为二进制
//NOTE 使用字符串
function divideBy2(decNumber){
    var remStack = new Stack(), rem, binaryString = "";

    while(decNumber > 0){
        rem = Math.floor(decNumber % 2);
        console.log(rem);
        remStack.push(rem);
        decNumber = Math.floor(decNumber / 2);
    }

    while(!remStack.isEmpty()){
        binaryString = remStack.pop().toString();
    }
    return binaryString;
}

console.log(divideBy2(10));
/* 
//NOTE stack类
function Stack(){
    this dataStore = [];
    this.top = 0;
    this.push = push;
    this.pop = pop;
    this.peek = peek;
    this.clear = clear;
    this.length = length;
}

function push(element){
    this.dataStore[this.top++] = element;
}

function peek(){
    return this.dataStore[this.top-1];
}

function pop(){
    return this.dataStore[--this.top];
}

function clear(){
    this.top = 0;
}

function length(){
    return this.top;
} */


