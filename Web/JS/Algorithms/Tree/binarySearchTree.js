//NOTE 创建二叉搜索树 BinarySearchTree
function BinarySearchTree() {
    //NOTE 声明树的数据结构
    let Node = function (key) {
        this.key = key;
        this.left = null;
        this.right = null;
    };

    var root = null;

    //NOTE 插入一个节点
    this.insert = function (key) {
        var newNode = new Node(key);

        //NOTE 如果树为空
        if (root === null) {
            root = newNode;
        } else {
            //NOTE 不为空,插入节点
            insertNode(root, newNode);
        }
    };

    //NOTE 插入节点辅助函数,找到新节点应插入位置
    var insertNode = function (node, newNode) {
        //NOTE 值小于节点
        if (newNode.key < node.key) {
            //NOTE 如果传入节点的左子节点(较小值)为空
            if (node.left === null) {
                node.left = newNode;
            } else {
                insertNode(node.left, newNode);
            }
        } else {
            //NOTE 如果新节点的值大于传入节点值
            //NOTE 如果传入节点右子节点(值大于传入节点)为空
            if (node.right === null) {
                node.right = newNode;
            } else {
                //NOTE 查找传入节点右侧
                insertNode(node.right, newNode);
            }
        }
    };

    //NOTE 中序遍历
    this.inOrderTraverse = function(callback){
        inOrderTraverseNode(root, callback);
    }

    //NOTE 辅助函数
    let inOrderTraverseNode = function(node, callback){
        if(node !== null){
            inOrderTraverseNode(node.left, callback);
            callback(node.key);
            inOrderTraverseNode(node.right, callback);
        }
    };

    //NOTE 先序遍历
    this.preOrderTraverse = function(callback){
        preOrderTraverseNode(root, callback);
    };

    let preOrderTraverseNode = function(node, callback){
        if(node !== null){
            //NOTE 先处理节点,再访问节点的左侧子节点,再访问节点的右侧子节点
            callback(node.key);
            preOrderTraverseNode(node.left, callback);
            preOrderTraverseNode(node.right, callback);
        }
    }

    //NOTE 后续遍历
    this.postOrderTraverse = function(callback){
        postOrderTraverseNode(root, callback);
    };

    let postOrderTraverseNode = function(node, callback){
        if(node !== null){
            postOrderTraverseNode(node.left, callback);
            postOrderTraverseNode(node.right, callback);
            callback(node.key);
        }
    };

    //NOTE 搜索树的最小值
    this.min = function(){
        return minNode(root);
    };

    let minNode = function(node){
        //NOTE 节点不为空
        if(node){
            //NOTE 循环至树的最左边
            while(node && node.left !== null){
                node = node.left;
            }
            return node.key;
        }
        return null;
    };

    //NOTE 查找最大值
    this.max = function(){
        return maxNode(root);
    };

    var maxNode = function(node){
        if(node){
            while(node && node.right !== null){
                node = node.right;
            }
            return node;
        }
        return null;
    };

    //NOTE 搜索特定值
    this.search = function(key){
        return searchNode(root, key);
    };

    let searchNode = function(node, key){
        if(node == null){
            return false;
        }
        if(key < node.key){
            return searchNode(node.left, key);
        }else if(key > node.key){
            return searchNode(node.right, key);
        }else{
            return true;
        }
    };

    //NOTE 移除一个节点
    this.remove = function(key){root = removeNode(root, key)};

    //NOTE removeNode实现
    let removeNode = function(node, key){
        if(node === null){
            return null;
        }
        if(key < node.key){
            node.left = removeNode(node.left, key);
            return node;
        }else if(key > node.key){
            node.right = removeNode(node.right, key);
            return node;
        }else{
            //NOTE 键等于node.key
            //NOTE 第一种情况--一个叶节点(没有子元素的节点)
            if(node.left === null && node.right === null){
                node = null;
                return node;
            }

            //NOTE 第二种情况--只有一个子节点的节点
            if(node.left === null){
                node = node.right;
                return node;
            }else if(node.right === null){
                node = node.left;
                return node;
            }

            //NOTE 有两个子节点的节点
            var aux = findMinNode(node.right);
            node.key = aux.key;
            node.right = removeNode(node.right, aux.key);
            return node;
        }
    }
}

let tree = new BinarySearchTree();
for(let i=0; i<20; i++){
    let num = Math.floor(Math.random() * 21);
    tree.insert(num);
}

//NOTE 打印节点值
function printNode(value){
    console.log(value);
}

//NOTE 作为回调函数传入中序遍历
tree.inOrderTraverse(printNode);

tree.preOrderTraverse(printNode);

console.log(tree.search(1) ? "Key 1 found" : "Key 1 not found.");
console.log(tree.search(8) ? "Key 8 found." : "Key 8 not found.");