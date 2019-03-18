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
//NOTE 循环队列
//NOTE 击鼓传花
function hotPotato(nameList, num){
    let queue = new Queue();

    for(let i=0; i<nameList.length; i++){
        //NOTE 将队列填入nameList中所有姓名
        queue.enqueue(nameList[i]);
    }

    let eliminated = "";
    //NOTE 剩余的孩子数量大于1, 继续游戏
    while(queue.size() > 1){
        for(let i=0; i<num; i++){
            //NOTE 重复出列,入列
            queue.enqueue(queue.dequeue());
        }
        //NOTE 时间停止后
        eliminated = queue.dequeue();
        console.log(eliminated + " 在击鼓传花游戏中被淘汰")
    }
    //NOTE 最后剩余一个元素出列
    return queue.dequeue();
}

let names = ["John", "Jack", "Camila", "Ingrid", "Carl"];
let winner = hotPotato(names, 7);
console.log("The winner is: " + winner);