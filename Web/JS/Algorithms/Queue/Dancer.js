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
    this.front = function () {
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
function Dancer(name, sex){
    this.name = name;
    this.sex = sex;
}

function getDancers(males, females){
    var names = read("dancers.txt").split("\n");
    for(var i=0; i<names.length; i++){
        //NOTE 清除姓名中的空白
        names[i] = names[i].trim();
    }
    for(var i=0; i<names.length; i++){
        //NOTE 分割数据
        var dancer = names[i].split(" ");
        var sex = dancer[0];
        var name = dancer[1];
        //NOTE 根据性别分类
        if(sex == "F"){
            femaleDancers.enqueue(new Dancer(name, sex));
        }else{
            maleDancers.enqueue(new Dancer(name, sex));
        }
    }
}

function dance(males, females){
    console.log("The dance partners are: \n");
    while(!females.isEmpty() && !males.isEmpty()){
        let person = females.dequeue();
        console.log(`Female dancer is ${person}`);
        let person = males.dequeue();
        console.log("Male dancer is ${person}");
    }
    print();
}

//NOTE 测试
//NOTE 需要每个Queue实例保存不同items副本
var maleDancers = new Queue();
var femaleDancers = new Queue();

getDancers(maleDancers, femaleDancers);
dance(maleDancers, femaleDancers);

if(!femaleDancers.isEmpty()){
    console.log(`${femaleDancers.front().name} is waitting to dance.`);
}
if(!maleDancers.isEmpty()){
    console.log(`${maleDancers.front().name} is waitting to dance.`);
}