//NOTE 优先级队列
//NOTE 优先级值越大,级别越高
let PriorityQueue = (function(){
    const items = new WeakMap();
    //NOTE 新建队列元素的构造函数
    function QueueElement(element, priority){
        this.element = element;
        this.priority = priority;
    }
    class PriorityQueue{
        constructor(){
            items.set(this, []);
        }
        enqueue(element, priority){
            let s = items.get(this);
            //NOTE 创建包含优先级属性的队列元素实例, 出入element和priority参数
            let queueElement = new QueueElement(element, priority);
            s.push(queueElement);
        }
        dequeue(){
            let s = items.get(this);
            let priority = s[0].priority;
            let index = 0;
            for(let i=0; i<s.length; i++){
                if(s[i].priority > priority){
                    priority = s[i].priority;
                    index = i;
                }
            }
            return s.splice(index, 1);

        }
        front(){
            let s = items.get(this);
            return s[0];
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
            for(let i=0; i<s.length; i++){
                console.log(`${s[i].element}, ${s[i].priority}`);
            }
        }
    };
    return PriorityQueue;
})();

var p = new PriorityQueue();
p.enqueue("Smith", 5);
p.enqueue("Jones", 5);
p.enqueue("Fehrenbach", 6);
p.enqueue("Ingram", 1);
p.enqueue("Brown", 1);
p.print();
console.log(p.size());
console.log(p.isEmpty());
console.log(p.dequeue());
console.log(p.dequeue());
console.log(p.front());
p.print();