//NOTE n个人中每m次淘汰一个, 直至剩余2个人
let LoopLinkedList = function(){
    let Node = function(element){
        this.element = element;
        this.next = null;
    }

    let head = null;
    let length = 0;

    //NOTE 链表尾部添加一个新节点
    this.append = function(element){
        let node = new Node(element);
        let current = head;

        if(length === 0){
            head = node;
            node.next = head;
        }else{
            while(current.next!=head){
                current = current.next;
            }
            current.next = node;
            node.next = head;
        }
        length++;
        return true;
    }

    //NOTE 任意位置添加节点
    this.insert = function(position, element){
        if(position > -1 && position < length){
            let node = new Node(element);
            let current = head;
            let previous = null;

            if(position === 0){
                node.next = current;
                head = node;
            }else if(position === length-1){
                while(current.next!==head){
                    current = current.next;
                }
                current.next = node;
                node.next = head;
            }
            else{
                while(position--){
                    previous = current;
                    current = current.next;
                }
                previous.next = node;
                node.next = current;
            }
            length++;
            return true;
        }else{
            return false;
        }
    }

    //NOTE 任意位置删除节点
    this.removeAt = function(position){
        if(position > -1 && position < length){
            let current = head;
            let previous = null;
            if(position===0){
                head = current.next;

            }else{
                while(position--){
                    previous = current;
                    current = current.next;
                }
                previous.next = current.next;
            }
            length--;
            return current;
        }else{
            return null;
        }
    };
}