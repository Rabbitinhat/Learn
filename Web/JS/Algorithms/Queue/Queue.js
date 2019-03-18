//NOTE Queue
function Queue() {
    //NOTE 使用数组存储队列数据
    let items = [];

    //NOTE 添加元素
    this.enqueue = function (element) {
        items.push(element);
    };
    //NOTE 删除
    this.dequeue = function () {
        return items.shift();
    };
    //NOTE 查看队列头部
    this.font = function () {
        return items[0];
    };
    //NOTE 判断队列是否为空
    this.isEmpty = function () {
        return items.length === 0;
    };
    //NOTE 队列长度
    this.size = function () {
        return items.length;
    };
    //NOTE 打印队列
    this.print = function () {
        console.log(items.toString());
    };

}

//NOTE 使用
let queue = new Queue();
console.log(queue.isEmpty());

queue.enqueue("John");
queue.enqueue("Jack");
queue.enqueue("Camila");
queue.print();
console.log(queue.size());
console.log(queue.isEmpty());
queue.dequeue();
queue.dequeue();
queue.print();

//NOTE ES6
//NOTE 使用闭包, WeakMap类
let Queue2 = (function () {
    const item = new WeakMap();
    class Queue {
        constructor() {
            items.set(this, []);
        };
        enqueue(element) {
            let s = items.get(this);
            s.push(element);
        };
        dequeue(element) {
            let s = items.get(this);
            let r = s.shift();
            return r;
        };
        font() {
            let s = items.get(this);
            return s[0];
        };
        isEmpty() {
            let s = items.get(this);
            return s.length === 0;
        };
        size() {
            let s = items.get(this);
            return s.length;
        };
        print() {
            let s = items.get(this);
            console.log(s.toString());
        };
    }
})();

//NOTE 修改版
//NOTE 优先队列
//NOTE 最小优先队列
function PriorityQueue() {
    let items = [];
    //NOTE 添加优先级(priority)构造函数
    function QueueElement(element, priority) {
        this.element = element;
        this.priority = priority;
    }

    this.enqueue = function (element, priority) {
        //NOTE 根据优先级设置元素
        let queueElement = new QueueElement(element, priority);

        let added = false;
        for (let i = 0; i < items.length; i++) {
            if (queueElement.priority < items[i].priority) {
                //NOTE 使用splice将元素添加到优先级低(priority值更大)的元素之前
                //NOTE 使用splice()将元素放在当前较小优先级的元素的位置
                items.splice(i, 0, queueElement);
                //NOTE 修改标记,跳出循环
                added = true;
                break;

            }
        }
        //NOTE 优先级最低(priority值最大)
        if (!added) {
            items.push(queueElement);
        }
    };
    this.print = function () {
        for (let i = 0; i < items.length; i++) {
            console.log(`${items[i].element} - ${items[i].priority}`);
        }
    };
    //NOTE 其他方法相同
    //NOTE 删除
    this.dequeue = function () {
        return items.shift();
    };
    //NOTE 查看队列头部
    this.font = function () {
        return items[0];
    };
    //NOTE 判断队列是否为空
    this.isEmpty = function () {
        return items.length === 0;
    };
    //NOTE 队列长度
    this.size = function () {
        return items.length;
    };
}

let priorityQueue = new PriorityQueue();
priorityQueue.enqueue("John", 2);
priorityQueue.enqueue("Jack", 1);
priorityQueue.enqueue("Camila", 1);
priorityQueue.print();