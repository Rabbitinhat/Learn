//NOTE 判断是否是回文
//NOTE 创建Stack
let Stack = (function(){
    const items = new WeakMap();
    class Stack{
        constructor(){
            items.set(this, []);
        }
        push(element){
            let s = items.get(this);
            s.push(element);
        }
        pop(){
            let s = items.get(this);
            return s.pop();
        }
        peek(){
            let s = items.get(this);
            return s[s.length - 1];
        }
        isEmpty(){
            let s = items.get(this);
            return s.length === 0;
        }
        size(){
            let s = items.get(this);
            return s.length;
        }
        print(){
            let s = items.get(this);
            console.log(s.toString());
        }
    }
    return Stack;
})();

//NOTE 判断是否是回文
function isPalindrome(word){
    var s = new Stack();
    //NOTE 将每个字母按顺序压入栈中
    for(var i=0; i<word.length; i++){
        s.push(word[i]);
    }
    var rword = "";
    //NOTE 将栈中字母逐个弹出
    while(s.size() > 0){
        rword += s.pop();
    }
    if(word == rword){
        return true;
    }else{
        return false;
    }
}

var word = "hello";
if(isPalindrome(word)){
    console.log(`${word} is a palindrome.`);
}else{
    console.log(`${word} is not a palindrome.`);
}

word = "racecar";
console.log(isPalindrome(word));