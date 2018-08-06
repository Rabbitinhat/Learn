/*
 * @Author: chyon71 
 * @Date: 2018-07-22 23:41:03 
 * @Last Modified by: chyon71
 * @Last Modified time: 2018-07-23 15:35:54
 * @The Answer : The C Answer Book by Clovis L. Tondo & Scott E. Gimpel 
 */
//querySelector()
var body = document.querySelector("body");
var myDiv = document.querySelector("#myDiv");
var selected = document.querySelector(".selected");
var img = document.querySelector("img.button");
//querySelectorAll()
var ems = document.getElementById("myDiv").querySelectorAll("em");
var selecteds = document.querySelectorAll(".selected");
var strongs = document.querySelectorAll("p strong");

var i, len, strong;
for(i=0, len=strongs.length; i<len; i++){
    strong = strongs[i];
    strong.className = "important";
}

/*if(document.body.webkitMatchesSelector("body.page1")){
    console.log("It match");
}*/

function matchesSelector(element, selector){
    if(element.matchesSselector){
        return element.matchesSelector(selector);
    } else if(element.msMatchesSelector){
        return element.msMatchSelector(selector);
    } else if(element.mozMatchesSelector){
        return element.mozMatchSelector(selector);
    } else if(element.webkitMatchesSelector){
        return element.webkitMatchesSelector(selector);
    } else{
        throw new Error("Not supported.");
    }
}
function  bian(element){
var i, len, child = element.firstElementChild;
while(child != element.lastElementChild){
    processChild(child);
    child = child.nextelementSibling;
}
}

var button = document.getElementById("myButton");
button.focus();
console.log(document.activeElement == button);

var button = document.getElementById("myButton");
button.focus();
console.log(document.hasFocus());

if(document.compatMode == "CSS1Compat"){
    console.log("Standeards mode");
} else {
    console.log("Quirks mode");
}

var head = document.head || document.getElementsByTagName("head")[0];

console.log(document.charset);
document.charset = "UTF-8";
console.log(document.charset);

if(document.charset != document.defaultCharset){
    console.log("Custom character set being used.");
}

var div = document.getElementById("myDiv");

var appId = div.dataset.appId;
var myName = div.dataset.myName;

div.dataset.appId = 23456;
div.dataset.myName = "Micheal";

if(div.dataset.myName){
    console.log("Hello " + div.dataset.myName);
}

var div = document.getElementById("content");
console.log(div.innerHTML);
console.log(div.outerHTML);
div.innerHTML = "Hello & welcome, <b>\"reader\"!</b>";
div.insertAdjacentHTML("beforebegin", "<p>Hello world!</p>");
div.insertAdjacentHTML("afterbegin", "<p>Hello, World!</p>");

var text = "<a href=\"#\" onclick=\"console.log('hi')\">Click Me</a>";

/* var itemsHtml = "";
for(var i=0, len=values.length; i<len; i++){
    itmsHTML += "<li>" + values[i] + "</li>;
}
URL.innerHTML = itemsHTML;
*/
console.log(document.documentElement.contains(document.body));
var result = document.documentElement.compareDocumentPosition(document.body);
console.log(result);

function contains(refNode, otherNode){
    if(typeof refNode.contains == "function" && (!client.engine.webkit || client.engine.webkit >= 522)){
        return refNode.contains(otherNode);
    }else if(typeof refNode.compareDocumentPosition == "function"){
        return !!(refNode.compareDocumentPosition(otherNode) & 16);
    }else{
        var node = otherNode.parentNode;
        do{
            if(node == refNode){
                return true;
            } else {
                node = node.parentNode;
            }
    } while(node != null);
    return false;
}
}

div.innerText = "Hello & welcome, <b>\"reader\"</b>";
div.innerText = div.innerText;