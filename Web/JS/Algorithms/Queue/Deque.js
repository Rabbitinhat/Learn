//NOTE 双向队列
let Deque = (function(){
    const items = new WeakMap();
    class Deque{
        constructor(){
            items.set(this, []);
        }
        enqueue(element){
            let s = items.get(this);
            s.push(element);
        }
        popqueue(){
            let s = items.get(this);
            return s.pop();
        }
        dequeue(){
            let s = items.get(this);
            return s.shift();
        }
        unshiftqueue(element){
            let s = items.get(this);
            s.unshift(element);
        }
        front(){
            let s = items.get(this);
            return s[0];
        }
        end(){
            let s = items.get(this);
            return s[s.length - 1];
        }
        size(){
            let s = items.get(this);
            return s.length;
        }
        isEmpty(){
            let s = items.get(this);
            return s.length === 0;
        }
        print(){
            let s = items.get(this);
            console.log(s);
        }

    }
    return Deque;
})();

//NOTE 测试
var q = new Deque();
//NOTE 尾部插入
q.enqueue("Meredith");
//NOTE 头部插入
q.unshiftqueue("Cynthia");
q.unshiftqueue("Tom");
console.log(q.front());
q.print();
//NOTE 尾部删除
q.popqueue();
console.log(q.end());
q.print();
//NOTE 头部删除
q.dequeue();
q.print();
console.log(q.isEmpty());
console.log(q.size());

//NOTE 判断是否是回文
function isPalindrome(word){
    let s = new Deque();
    let reword = "";
    word.split("").forEach(function(i){
        s.unshiftqueue(i);
    })
    while(!s.isEmpty()){
        reword += s.dequeue();
    }
        console.log(reword);
    if(word === reword){
        return true;
    }else{
        return false;
    }
}

let word = "hello";
console.log(isPalindrome(word));
word = "racecar";
console.log(isPalindrome(word));