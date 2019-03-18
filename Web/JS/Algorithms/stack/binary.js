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
//NOTE 解决十进制转换为二进制
//NOTE 使用字符串
function divideBy2(decNumber){
    var remStack = new Stack(), rem, binaryString = "";

    while(decNumber > 0){
        //NOTE Math.floor 取余时是否必要
        rem = Math.floor(decNumber % 2);
        remStack.push(rem);
        decNumber = Math.floor(decNumber / 2);
    }

    while(!remStack.isEmpty()){
        binaryString += remStack.pop().toString();
    }
    return binaryString;
}

console.log(divideBy2(10));
console.log(divideBy2(233));
console.log(divideBy2(1000));

//NOTE 添加基数, 指定转换进制
function baseConverter(decNumber, base){
    var remStack = new Stack(),
        rem,
        baseString = "",
        //NOTE 将余数做转换
        digits = "0123456789ABCDEF";

    while(decNumber > 0){
        rem = Math.floor(decNumber % base);
        remStack.push(rem);
        decNumber = Math.floor(decNumber / base);
    }

    while(!remStack.isEmpty()){
        baseString += digits[remStack.pop()];
    }
    return baseString;
}

console.log(baseConverter(100345, 2));
console.log(baseConverter(100345, 8));
console.log(baseConverter(100345, 16));