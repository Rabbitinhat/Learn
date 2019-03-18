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
        return items.pop();
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


//NOTE 判断传入两个字符串类型操作数的优先级大小(只包含 +,-,*,%)
function comparePriority(str1, str2){
    //NOTE 保存操作数的数组
    let add = ["+", "-"];
    let mult = ["*", "%", "/"];
    //NOTE 如果str2的优先级小于str1, 返回true
    if(add.indexOf(str2)>-1 && mult.indexOf(str1)>-1){
        return true;
    }
    //NOTE 如果str2的优先级大于str1,或两者优先级相等, 返回false
    return false;

}
function isOperator(str){
    var operatorarr = ["+", "-", "*", "/", "%", "(", ")"];
    if(operatorarr.indexOf(str) > -1){
        return true;
    }
    return false;
}
//NOTE 修改,将中缀表达式转换为后缀表达式
function infixToPostfix(exp){
    var operatorStack = new Stack();
    //NOTE 存储结果数组
    var postfixExp = [];
    //NOTE 存储可能操作数的数组
    //NOTE 将传入的表达式字符串分割为数组, forEach()对数组中每个元素进行处理
    exp.split("").forEach(function(char){
        //NOTE 如果字符为操作数
        if(isOperator(char)){
            //NOTE 判断优先级(操作数栈顶元素, 和要入栈操作数)
            //NOTE 当栈顶操作符优先级大于待入栈操作符
            while(comparePriority(operatorStack.peek(), char)){
                //NOTE 弹出栈顶操作符
                let tmp = operatorStack.pop();
                postfixExp.push(tmp);
            }
            while(char === ")"){
                let tmp = operatorStack.pop();
                if(tmp !== "("){
                    postfixExp.push(tmp);
                }else{
                    break;
                }
            }
            //NOTE 当入栈操作符优先级大于栈顶操作符,且入栈操作符不为")"直接入栈
            if(char !== ")") operatorStack.push(char);
        }else{
        //NOTE 将操作数添加到结果数组
            postfixExp.push(char);
        }
    });
    //NOTE 将操作符栈中剩余操作符添加到结果数组中
    while (!operatorStack.isEmpty()){
        postfixExp.push(operatorStack.pop());
    }
    return postfixExp.join("");
}
//NOTE 计算转换后的后缀表达式
function computerPostfix(exp){
    var numStack = new Stack();
    exp.split("").forEach(function(char){
        //NOTE 去掉空白符
        if(char.trim()){
            if(!isOperator(char)){
                numStack.push(char);
            }else{
                var tmp = numStack.pop();
                numStack.push(eval(numStack.pop() + char + tmp));
            }
        }
    });
    return numStack.pop();
}

var postfixExp = infixToPostfix("3*(1+2)+6/3");
var postfixExpvalue = computerPostfix(postfixExp);
console.log(postfixExp);
console.log(postfixExpvalue);