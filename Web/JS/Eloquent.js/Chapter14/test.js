//根据所给对象建立表格
function mkTable(array) {
    let table = document.createElement("table");
    array.forEach((obj) => {
        let row = document.createElement("tr");
        let rowhead = document.createElement("tr");
        for (let attr in obj) {
            //使用属性名称创建标题
            if (table.childNodes.length == 0 && row.childNodes.length < 4) {
                let col1 = document.createElement("th");
                let text1 = document.createTextNode(attr);
                col1.style.border= "1px solid #333";
                col1.appendChild(text1);
                rowhead.appendChild(col1);
                let col = document.createElement("td");
                //
                let text = document.createTextNode(obj[attr]);
                col.style.border= "1px solid #333";
                col.appendChild(text);
                row.appendChild(col);
            } else {
                let col = document.createElement("td");
                //
                let text = document.createTextNode(obj[attr]);
                col.style.border= "1px solid #333";
                col.appendChild(text);
                row.appendChild(col);
            }
        }
        //如果存在标题, 添加到表格中, 然后将其赋值为null
        if(rowhead != null){
            table.appendChild(rowhead);
            rowhead = null;
        }
        table.appendChild(row);
    });

    return table;
}

const MOUNTAINS = [
    { name: "Kilimanjaro", height: 5895, place: "Tanzania" },
    { name: "Everest", height: 8848, place: "Nepal" },
    { name: "Mount	Fuji", height: 3776, place: "Japan" },
    { name: "Vaalserberg", height: 323, place: "Netherlands" },
    { name: "Denali", height: 6168, place: "United	States" },
    { name: "Popocatepetl", height: 5465, place: "Mexico" },
    { name: "Mont	Blanc", height: 4808, place: "Italy/France" }
]

const mountains = document.getElementById("mountains");
let table = mkTable(MOUNTAINS);
table.style.textAlign = "left";
mountains.appendChild(table);

//test2
function byTagName(node, tagName){
    let result = [];
    tagName = tagName.toUpperCase();

    function explore(node){
        for(let i=0; i<node.childNodes.length; i++){
            let child = node.childNodes[i];
            if(child.nodeType == document.ELEMENT_NODE){
                if(child.nodeName == tagName) result.push(child);
                explore(child);
            }
        }
    }

    explore(node);
    return result;
}

console.log(byTagName(document.body, "h1").length);
console.log(byTagName(document.body, "span").length);

let para = document.querySelector("p");
console.log(byTagName(para, "span").length);

//test3
let cat = document.querySelector("#cat");
let hat = document.querySelector("#hat");

let angle = 0;
let lastTime = null;
function animate(time){
    if(lastTime != null) angle += (time - lastTime) * 0.001;
    lastTime = time;
    cat.style.top = (Math.sin(angle) * 40 + 40) + "px";
    cat.style.left = (Math.cos(angle) * 40 + 200) + "px";
    hat.style.top = (Math.sin(angle + Math.PI) * 40 + 40) + "px";
    hat.style.left = (Math.cos(angle + Math.PI) * 40 + 200) + "px";

    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);