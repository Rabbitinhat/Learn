//NOTE 实现自平衡二叉搜索树
let Avltree = function(){
    let Node = function(key){
        this.key = key;
        this.left = null;
        this.right = null;
    }
    let root = null;

    //NOTE 插入节点
    let insertNode = function(node, element){
        if(node === null){
            node = new Node(element);
        }else if(element < node.key){
            node.left = insertNode(node.left, element);

            if(node.left !== null){
                //NOTE 确认是否需要平衡
                //NOTE 计算左子树和右子树高度的差值
                if((heightNode(node.left) - heightNode(node.right)) > 1){

                }
            }
        }else if(element > node.key){
            node.right = insertNode(node.right, element);

            if(node.right !== null){
                if((heightNode(node.right) = heightNode(node.left)) > 1){

                }
            }
        }
        return node;
    };

    //NOTE 计算节点高度
    let heightNode = function(node){
        if(node === null){
            return -1;
        }else{
            return Math.max(heightNode(node.left), heightNode(node.right) + 1);
        }
    }

    //NOTE 平衡子节点
    //NOTE 向左的单旋转
    let rotationRR = function(node){
        let temp = node.right;
        node.right = tmp.left;
        tmp.left = node;
        return tmp;
    };

    //NOTE 向右的单旋转
    let rotationLL = function(node){
        let tmp = node.left;
        node.left = tmp.right;
        tmp.right = node;
        return tmp;
    };
}