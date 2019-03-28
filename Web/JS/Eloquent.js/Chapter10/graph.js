exports.buildGraph = function(edges){
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
};