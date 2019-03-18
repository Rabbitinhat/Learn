//NOTE 实现链表
function LinkedList() {
    //NOTE 实现单个节点结构 节点的值: element 指向下一个节点的指针: next
    let Node = function (element) {
        this.element = element;
        this.next = null;
    };

    //NOTE 链表长度
    let length = 0;
    //NOTE 头节点
    let head = null;

    //NOTE 向前移动n个节点
    this.advance = function (n, node) {
        let index = this.indexOf(node.element);
        if (index >= n) {
            let current = this.removeAt(node);
            return this.insert(index - n, current.element);
        }
        return false;
    }
    //NOTE 在链表尾部添加一个新节点
    this.append = function (element) {
        //NOTE 根据传入元素创建一个新节点
        let node = new Node(element), current;

        //NOTE 如果链表为空,添加的节点为链表头部
        if (head === null) {
            head = node;
        } else {
            //NOTE 否则设置当前节点为链表头部,进行循环
            current = head;
            //NOTE 循环列表至最后s
            while (current.next) {
                current = current.next;
            }

            //NOTE 将节点设置为链表结尾的下一个节点,添加到链表中
            current.next = node;
        }
        //NOTE 更新链表的长度
        length++;
    };
    //NOTE 在链表任意位置添加一个节点
    this.insert = function (position, element) {
        //NOTE 检查position
        if (position >= 0 && position <= length) {
            //NOTE 创建新节点
            let node = new Node(element), current = head,
                previous, index = 0;

            //NOTE 在链表头部添加元素
            if (position === 0) {
                node.next = current;
                head = node;
            } else {
                //NOTE 循环至position处
                while (index++ < position) {
                    previous = current;
                    current = current.next;
                }
                //NOTE 插入新节点
                node.next = current;
                previous.next = node;
            }
            length++;
            return true;
        } else {
            //NOTE pistion不再合理范围内
            return false;
        }
    };
    //NOTE 从链表任意位置移除一个节点
    this.removeAt = function (position) {
        //NOTE 检查position是否在范围内
        if (position > -1 && position < length) {
            let current = head, previous, index = 0;

            //NOTE 移除第一项
            if (position === 0) {
                head = current.next;
            } else {
                //NOTE 循环至position指明的位置
                while (index++ < position) {
                    previous = current;
                    current = current.next;
                }

                //NOTE 将previous与current的下一项连接起来, 跳过current, 从而移除它
                previous.next = current.next;
            }
            //NOTE 长度减1
            length--
            //NOTE 返回被移除的元素
            return current.element;
        } else {
            //NOTE 超出范围
            return null;
        }
    };
    //NOTE 删除任意元素
    this.remove = function (element) {
        //NOTE 搭配使用indexOf, removeAt()实现删除任意元素功能
        let index = this.indexOf(element);
        return this.removeAt(index);
    };
    //NOTE 判断元素是否存在于节点中
    this.indexOf = function (element) {
        let current = head,
            //NOTE 节点索引值
            index = 0;

        while (current) {
            //NOTE 如果元素为当前节点值
            if (element === current.element) {
                return index;
            }
            //NOTE 否则迭代至下一个节点
            index++;
            current = current.next;
        }
        return -1;
    };
    this.isEmpty = function () {
        return length === 0;
    };
    this.size = function () {
        return length;
    };
    this.getHead = function () {
        return head;
    };
    //NOTE 将链表转换为字符串
    this.toString = function () {
        let current = head,
            string = "";

        while (current) {
            string += current.element + (current.next ? "n" : "");
            current = current.next;
        }
        return string;
    };
    this.print = function () {
        console.log(this.toString());
    };
}

//NOTE 测试添加节点
let list = new LinkedList();
list.append(15);
list.append(10);
list.print();

function savegrades(arr){
    let list = new LinkedList();
    arr.forEach((n)=>{list.append(n)});
    list.print();
}

let grades = [];
for(let i=0; i<20; i++){
    grades.push(Math.floor(Math.random() * 101));
}

savegrades(grades);