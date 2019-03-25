//NOTE 存储道路的数组
const roads = [
    "Alice's House-Bob's House", "Alice's House-Cabin",
    "Alice's House-Post Office", "Bob's House-Town Hall",
    "Daria's House-Ernie's House", "Daria's House-Town Hall",
    "Ernie's House-Grete's House", "Grete's House-Farm",
    "Grete's House-Shop", "Marketplace-Farm",
    "Marketplace-Post Office", "Marketplace-Shop",
    "Marketplace-Town Hall", "Shop-Town Hall"
];

//NOTE 存储该节点到达其他节点的道路
function buildGraph(edges){
    //NOTE 创建一个不从`Object.prototype`继承的空对象
    let graph = Object.create(null);
    //NOTE 建立函数,创建道路的两端之间的映射
    function addEdge(from, to){
        //NOTE 如果节点不存在,就添加新的节点
        if(graph[from] == null){
            graph[from] = [to];
        }else{
            graph[from].push(to);
        }
    }
    //NOTE 处理数组
    for(let [from, to] of edges.map(r => r.split("-"))){
        addEdge(from, to);
        addEdge(to, from);
    }
    return graph;
}

//NOTE 将数组转化为映射
const roadGraph = buildGraph(roads);

//NOTE 生成环境
class VillageState{
    constructor(place, parcels){
        //NOTE 当前位置和未送达包裹集合
        this.place = place;
        this.parcels = parcels;
    }

    //NOTE 移动后为当前情况计算一个新状态
    move(destination){
        //NOTE 映射中是否有当前位置到目的地的道路,没有则返回当前状态
        if(!roadGraph[this.place].includes(destination)){ 
            return this;
        }else{
            //? 创建一个新状态
            //NOTE 从未送达包裹集合中筛选
            let parcels = this.parcels.map(p=>{
                if(p.place != this.place) return p;
                //NOTE 当包裹的位置等于当前位置时,更新位置
                console.log(p);
                return {place: destination, address: p.address};
            }).filter(p=>p.place != p.address); //NOTE fliter移除已送达包裹
            //NOTE 返回新的机器人状态
            return new VillageState(destination, parcels);
        }
    }
}

//NOTE 创建机器人状态(当前位置,包裹状态)
let first = new VillageState(
    "Post Office",
    [{place: "Post Office", address: "Alice's House"}]
);
let next = first.move("Alice's House");

console.log(next.place);
console.log(next.parcels);
console.log(first.place);

//NOTE 使用Object.freeze()是对象忽略属性的写入
let object = Object.freeze({value: 5});
object.value = 10;
console.log(object.value);

function runRobot(state, robot, memory){
    for(let turn = 0; ;turn++){
        //送达包裹为0时,退出循环
        if(state.parcels.length == 0){
            console.log(`Done in ${turn} turns`);
            break;
        }
        //
        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
        console.log(`Moved to ${action.direction}`);
    }
}

//随机选择robot每回合行走方向
function randomPick(array){
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
}

function randomRobot(state){
    return {direction: randomPick(roadGraph[state.place])};
}

VillageState.random = function(parcelCount = 5){
    let parcels = [];
    for(let i=0; i<parcelCount; i++){
        let address = randomPick(Object.keys(roadGraph));
        console.log(address);
        let place;
        //?排除任何寄出地和目的地相同的包裹
        do {
            place = randomPick(Object.keys(roadGraph));
        }while(place == address);
        parcels.push({place, address});
    }
    return new VillageState("Post Office", parcels);
};

console.log("Run Robot");
runRobot(VillageState.random(), randomRobot);

//一条可以经过村庄所有地点的路线
const mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm",
    "Marketplace", "PostOffice"
];

//将路线保存在robot记忆中
function routeRobot(state, memory){
    if(memory.length == 0){
        memory = mailRoute;
    }
    return {direction: memory[0], memory: memory.slice(1)};
}

//the robot has memory
runRobot(VillageState.random(), randomRobot);

//实现寻路找到最短路线
function findRoute(graph, from, to){
    //工作列表, 一系列可能被探索的地方
    let work = [{at: FormData, route: []}];
    for(let i=0; i<work.length; i++){
        //从获取列表中的下一个项目
        let {at, route} = work[i];
        //循环图中关联的place
        for(let place of graph[at]){
            //如果place等于目标, 就将place添加到route数组中
            if(place == to) return route.concat(place);
            //如果有未探索地点, 将其添加到工作列表中
            if(!work.some(w => w.at == place)){
                work.push({at: place, route: route.concat(place)});
            }
        }
    }
}

function goalOrientedRobot({place, parcels}, route){
    if(route.length == 0){
        let parcel = parcels[0];
        if(parcel.place != place){
            route = findRoute(roadGraph, place, parcel.place);
        }else{
            route = findRoute(roadGraph, place, parcel.address);
        }
    }
    return {direction: route[0], memory: route.slice(1)};
}

runRobot(VillageState.random(), goalOrientedRobot, []);

