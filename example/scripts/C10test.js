var na = navigator.userAgent;
console.log(na);
var html = document.documentElement;
console.log(html);
console.log(document.childNodes[0]);
console.log(html === document.lastChild);
var body = document.body;
var doctype = document.doctype;

var originalTitle = document.title;
document.title = "New Page Title";

console.log(document.lastChild);
console.log(document.lastChild.nextSibling);

var url = document.URL;
var domain = document.domain;
var referrer = document.referrer;
console.log(url);
console.log(domain);
console.log(referrer);

var div = document.getElementById("myDiv");
var images = document.getElementsByTagName("img");
var allElements = document.getElementsByTagName("*");
console.log(allElements);

var radios = document.getElementsByName("color");
console.log(radios);

var hasXmlDom = document.implementation.hasFeature("XML", "1.0");
console.log(hasXmlDom);

var div = document.getElementById("myDiv");
console.log(div.tagName);
console.log(div.tagName == div.nodeName);

var div = document.getElementById("myDiv");
console.log(div.id);
console.log(div.className);
console.log(div.title);
console.log(div.lang);
console.log(div.dir);

/*div.id = "someOtherId";
div.className = "ft";
div.title = "Some other text";
div.lang = "fr";
div.dir = "rtl";
*/
div.setAttribute("id", "someOtherId");
div.setAttribute("class", "ft");
div.setAttribute("title", "Some other text");
console.log(div.getAttribute("id"));
console.log(div.getAttribute("class"));
console.log(div.getAttribute("title"));
div.removeAttribute("class");

var value = div.getAttribute("my_special_attribute");
console.log(value);

console.log(div.my_special_attribute);

//var id = div.attributes.getNamedItem("id").nodeValue;
var id = div.attributes["id"].nodeValue;
console.log(id);

function outputAttributes(element){
    var pairs = new Array();
    var attrName;
    var attrValue;
    var i;
    var len;

    for(i=0, len=element.attributes.length; i<len; i++){
        attrName = element.attributes[i].nodeName;
        attrValue = element.attributes[i].nodeValue;
        if(element.attributes[i].specified){
            pairs.push(attrName + '=\"' + attrValue + '\"');
        }
    }
    return pairs.join(" ");
}

var attrarray = outputAttributes(div);
console.log(attrarray);

/*var div = document.createElement("div");
div.id = "myNewDiv";
div.className = "box";
document.body.appendChild(div);*/


/**
 * for(var i =0; len=element.childNodes.length; i<len; i++){
 *     if(element.childNode[i].nodeType == 1){
 *         doSomething();
 * }
 * }
*/
var element = document.createElement("div");
element.className = "message";

var textNode = document.createTextNode("Hello World!");
var anotherTextNode = document.createTextNode("Yippee! ");

element.appendChild(textNode);
element.appendChild(anotherTextNode);
document.body.appendChild(element);

console.log(element.childNodes.length);

element.normalize();
console.log(element.childNodes.length);
console.log(element.firstChild.nodeValue);

var newNode = element.firstChild.splitText(5);
console.log(element.firstChild.nodeValue);
console.log(newNode.nodeValue);
console.log(element.childNodes.length);

var newdiv = document.getElementById("newDiv");

var comment = document.createComment("A comment");
newdiv.appendChild(comment);
console.log(newdiv.firstChild.nodeValue);

var fragment = document.createDocumentFragment();

var fragment = document.createDocumentFragment();
var ul = document.getElementById("myList");
var li = null;

for(var i=0; i<3; i++){
    li = document.createElement("li");
    li.appendChild(document.createTextNode("Item " + (i+1)));
    fragment.appendChild(li);
}

ul.appendChild(fragment);

var attr = document.createAttribute("align");
attr.value = "left";
element.setAttributeNode(attr);
console.log(element.attributes["align"].value);
console.log(element.getAttributeNode("align").value);
console.log(element.getAttribute("align"));

function loadScriptString(code){
    var script = document.createElement("script");
    script.type = "text/javascript";
    try{
        script.appendChild(document.createTextNode(code));
    } catch(ex){
        script.text = code;
    }
    document.body.appendChild(script);
}

loadScriptString("function sayHi(){console.log('Hi');}");
sayHi();

function loadStyles(url){
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = url;
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(link);
}

loadStyles("style.css");
function loadStyleString(css){
var style = document.createElement("style");
style.type = "text/css";
try{
    style.appendChild(document.createTextNode(css));
} catch(ex){
    style.styleSheet.cssText = "body{background-color: red}";
}
var head = document.getElementsByTagName("head")[0];
head.appendChild(style);
}