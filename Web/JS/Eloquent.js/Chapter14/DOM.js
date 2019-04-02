//处理嵌套数据结构时, 使用递归
function talksAbout(node, string){
    if(node.nodeType == document.ELEMENT_NODE){
        for(let i=0; i<node.childNodes.length; i++){
            //递归直到找到文本元素
            if(talksAbout(node.childNodes[i], string)){
                return true;
            }
        }
        return false;
    }else if (node.nodeType == document.TEXT_NODE){
        //判断文本节点中是否包含所选字符串
        return node.nodeValue.indexOf(string) > -1;
    }
}

console.log(talksAbout(document.body, "book"));

//InsertBefore
//改变了DOM结构
let paragraphs = document.body.getElementsByTagName("p");
document.body.insertBefore(paragraphs[3], paragraphs[1]);

//Array.from()转换DOM对象为数组
//type为HTMLCollection
console.log(paragraphs);
let array = Array.from(paragraphs);
//type为array
console.log(array);

//elt创建新的元素节点
function elt(type,...children){
    let node = document.createElement(type);
    for(let child of children){
        if(typeof child != "string") node.appendChild(child);
        else node.appendChild(document.createTextNode(child));
    }
    return node;
}

document.getElementById("quote").appendChild(
    elt("footer", "-",
        elt("strong", "Karl Popper"),
            ", preface to the second editon of ",
                elt("em", "The Open Society and Its Enemies"),
                    ", 1950")
);

/* offset client */
let para = document.body.getElementsByTagName("p")[4];
//client padding+width/height
console.log(`clientHeight: ${para.clientHeight}; clientWidth: ${para.clientWidth}`);
//offset border+padding+width/height
console.log(`offsetHeight: ${para.offsetHeight}; offsetWidth: ${para.offsetWidth}`);

/* 使用position创建动画 */
let cat = document.querySelector("img");
//计算角度
let angle = Math.PI / 2;
function animate(time, lastTime){
    if(lastTime != null){
        angle += (time - lastTime) * 0.001;
    }

    lastTime = time;
    cat.style.top = (Math.sin(angle) * 20) + "px";
    cat.style.left = (Math.cos(angle) * 200) + "px";
    requestAnimationFrame(newTime => animate(newTime, time));
}

//浏览器重绘时调用animate()
requestAnimationFrame(animate);