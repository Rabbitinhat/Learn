//NOTE 基数排序
//NOTE 实现队列
let Queue = (function(){
    const items = new WeakMap();
    class Queue{
        constructor(){
            items.set(this, []);
        };
        enqueue(element){
            let s = items.get(this);
            s.push(element);
        };
        dequeue(){
            let s = items.get(this);
            return s.shift();
        };
        front(){
            let s = items.get(this);
            return s[0];
        };
        isEmpty(){
            let s = items.get(this);
            return s.length === 0;
        };
        size(){
            let s = items.get(this);
            return s.length;
        };
        print(){
            let s = items.get(this);
            console.log(s.toString());
        };
    }
    return Queue;
})();
function distribute(nums, queues, n ,digit){
    for(var i=0; i<n; i++){
        //NOTE 根据传入的位数,分配不同队列
        if(digit == 1) {
            //NOTE 个位
            queues[nums[i]%10].enqueue(nums[i]);
        }else{
            //NOTE 十位
            queues[Math.floor(nums[i]/10)].enqueue(nums[i]);
        }
    }
}

//NOTE 从0~9输出数字至nums中
function collect(queues, nums){
    var i = 0;
    for(var digit = 0; digit < 10; digit++){
        while(!queues[digit].isEmpty()){
            nums[i++] = queues[digit].dequeue();
        }
    }
}

function dispArray(arr){
    for(var i=0; i<arr.length; i++){
        console.log(`${arr[i]} `);
    }
}

//NOTE main
var queues = [];
for(var i=0; i<10; i++){
    //NOTE 根据0~9建立10个队列
    queues[i] = new Queue();
}

var nums = [];
//NOTE 随机生成0~100以内10个数字
for(var i=0; i<10; i++){
    //NOTE Math.floor ?
    nums[i] = Math.floor(Math.floor(Math.random() * 101));
}
console.log("Before radix sort: ");
dispArray(nums);
//NOTE 第一次扫描
distribute(nums, queues, 10, 1);
collect(queues, nums);

//NOTE 第二次扫描
distribute(nums, queues, 10, 10);
collect(queues, nums);

console.log("\n\nAfter radix sort: ");
dispArray(nums);
