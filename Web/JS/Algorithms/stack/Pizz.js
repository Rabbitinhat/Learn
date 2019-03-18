//NOTE 佩兹糖果盒,去除栈中不想要元素后,仍保持其他元素顺序不变

//NOTE 创建栈
//NOTE 使用栈将中缀表达式转换为后缀表达式
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
    this.pop = function(){
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

//NOTE main
function pizz(stack, aim){
    //NOTE 作为中转
    let temp = new Stack();
    //NOTE 作为删除元素后返回的结果
    let result = new Stack();

    while(!stack.isEmpty()){
        let i = stack.pop().toString();
        if(i === aim){
            continue;
        }else{
            temp.push(i);
        }
    }
    while(!temp.isEmpty()){
        result.push(temp.pop());
    }
    result.print();
    return;
}

var newpizz = new Stack();
var types = ["white", "red", "yellow"];
for(var i=0; i<20; i++){
    let num = Math.floor(Math.random() * 3);
    newpizz.push(types[num]);
}
newpizz.print();
pizz(newpizz, "yellow");
