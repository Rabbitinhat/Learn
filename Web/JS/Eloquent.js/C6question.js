//NOTE Vec 二维空间中表示数组 向量类型
class Vec{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    plus(vec){
        //NOTE 求解和向量 x1+x2, y1+y2
        return new Vec(this.x + vec.x, this.y + vec.y); 
    }
   minus(vec){
        //NOTE 求解差向量 x1-x2, y1-y2
        return new Vec(this.x - vec.x, this.y - vec.y);
    }
    get length(){
        //NOTE 求解到(0, 0)的直线长度
        return Math.floor(Math.sqrt(this.x*this.x + this.y*this.y));
    }
}

console.log(new Vec(1, 2).plus(new Vec(2, 3)));
console.log(new Vec(1, 2).minus(new Vec(2, 3)));
console.log(new Vec(3, 4).length);

//NOTE 分组
class Group{
    constructor(){
        //NOTE 添加一个数组属性,用于存储值
        this.values = [];
    }
    has(value){
        if(this.values.indexOf(value) > -1){
            return true;
        }
        return false;
    }
    add(value){
        //NOTE indexOf判断值是否存在
        if(!has(value)){
            this.values.push(value);
        }
    }
    delete(value){
        //NOTE 使用indexOf()返回的索引, 通过splice()删除元素
        //NOTE answer this.values =  this.values.fliter((val)=>val!=value);
        if(!has(value)){
            this.values.splice(this.values.indexOf(value), 1);
        }
    }

    static form(obj){
        //NOTE 创建新的实例,循环添加值,再返回
        let group = new Group();
        for(let element of obj){
            group.add(element);
        }
        return group;
    }
}

let group = Group.form([10, 20]);
console.log(group.has(10));
console.log(group.has(30));
group.add(10);
group.delete(10);
console.log(group.has(10));

//NOTE 可迭代分组

class GroupIterator{
    constructor(group){
        //NOTE 分组为一维形式
        this.x = 0;
        this.group = group;
    }
    next(){
        //NOTE 检查是否位于分组末尾
        if(this.x == this.group.values.length) return {done: true};

        //NOTE 当前值
        let value = this.group.values[this.x];
        //NOTE 索引增加
        this.x++

        return {value, done: false};
    }
}

//NOTE 创建接口
Group.prototype[Symbol.iterator] = function(){
    return new GroupIterator(this);
}

//NOTE 测试接口
for(let value of Group.form(["a", "b", "c"])){
    console.log(value);
}

//NOTE 借鉴方法
let map = {one: true, two: true, hasOwnProperty:true};
console.log(Object.prototype.hasOwnProperty.call(map, "three"));
