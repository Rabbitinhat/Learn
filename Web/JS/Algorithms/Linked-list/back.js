//NOTE 实现双向链表
function DoublyLinkedList() {
    //NOTE 节点构造函数
    let Node = function (element) {
        this.element = element;
        this.next = null;
        this.prev = null;
    };

    let length = 0;
    let head = null;
    //NOTE 保存链表最后一项引用
    let tail = null;


    //NOTE method
    this.append = function(element){
        let node = new Node(element);
        console.log(node);
        console.log(length);
        if(length === 0){
            head = node;
            tail = node;
        }else{
            tail.next = node;
            node.prev = tail;
        }
        tail = node;
        length++;
    }
    //NOTE 任意位置插入新节点
    this.insert = function (position, element) {
        if (position > -1 && position < length) {
            let node = new Node(element);
            let current = head;
            let previous;
            let index = 0;

            //NOTE 新节点添加到头部
            if (position === 0) {
                //NOTE 链表为空
                if (!head) {
                    //NOTE 链表的头部和尾部指向同一节点
                    head = node;
                    tail = node;
                } else {
                    //NOTE 链表不为空
                    node.next = current;
                    current.prev = node;
                    head = node;
                }
            } else if (position === length) {
                //NOTE 添加到链表末尾
                current = tail;
                current.next = node;
                node.prev = current;
                tail = node;
            } else {
                while (index++ < position) {
                    previous = current;
                    current = current.next;
                }
                node.next = current;
                previous.next = node;
                current.prev = node;
                node.prev = previous;
            }
            length++;
            return true;
        } else {
            return false;
        }
    }

    //NOTE 任意位置移除元素
    this.removeAt = function (position) {
        if (position > -1 && position < length) {
            let current = head;
            let previous;
            let index = 0;

            //NOTE 删除头部
            if (position === 0) {
                head = current.next;

                //NOTE 如果只有一项
                if (length === 1) {
                    tail = null;
                } else {
                    head.prev = null;
                }
            } else if (position === length - 1) {
                //NOTE 删除尾部
                current = tail;
                tail = current.prev;
                tail.next = null;
            } else {
                while (index++ < position) {
                    previous = current;
                    current = current.next;
                }

                //NOTE 链接previous和current的下一项
                previous.next = current.next;
                current.next.previous = previous;
            }
            length--;
            return current.element;
        } else {
            return null;
        }
    }
    this.remove = function(element){
        let index = this.indexOf(element);
        return this.removeAt(index);
    };
    this.indexOf = function(element){
        let current = head;
        let index = 0;
        while(current){
            if(element === current.element){
                return index;
            }
            index++;
            current = current.next;
        }
        return -1;
    };
    this.back = function(n, node){
        let index = this.indexOf(node.element);
        let current = this.removeAt(index);
        if(!(index+n > length)){
        return this.insert(index + n, current.element);
        }else{
            return this.insert(length, current.element);
        }
    };
    this.size = function(){};
    this.isEmpty = function(){};
    this.getHead = function(){};
    this.getTail = function(){};
    this.toString = function(){
        let current = head;
        let string = "";

        while(current){
            string += current.element + (current.next ? "n" : "");
            current = current.next;
        }
        return string;
    };
    //NOTE 反向输出
    this.dispRevese = function(){
        let current = tail;
        let string = "";

        while(current){
            string += current.element + (current.prev ? "n" : "");
            current = current.prev;
        }
        return string;
    };
    this.print = function(){
        console.log(this.toString());
    }
}

var cities = new DoublyLinkedList();
cities.append("Conway");
cities.print();
cities.append("Russellville");
cities.append("Carlisle");
cities.append("Alma");
cities.print();
cities.remove("Carlisle");
cities.print();
console.log(cities.dispRevese());
