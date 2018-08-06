/*
 * @Author: chyon71 
 * @Date: 2018-07-10 17:11:58 
 * @Last Modified by: chyon71
 * @Last Modified time: 2018-07-11 14:53:36
 * @The Answer : The C Answer Book by Clovis L. Tondo & Scott E. Gimpel 
 */
var age = 29;
function sayAge(){
    console.log(this.age);
}

console.log(window.age);
sayAge();
window.sayAge();

var age = 29;
window.color = 'red';

console.log(delete window.age);

delete window.color;
console.log(age);
console.log(window.color);

var newValue = window.oldValue;
//var newValue = oldValue;

var leftPos = (typeof window.screenLeft == "number") ? window.screenLeft : window.screenX;
var topPos = (typeof window.screenTop == "number") ? window.screenTop : window.screenY;

console.log(leftPos);
console.log(topPos);

window.moveTo(0, 0);

window.moveBy(0, 100);

var pageWidth = window.innerWidth, pageHeight = window.innerHeight;

if(typeof pageWidth != "number"){
    if(document.compatMode == "CSS1Compat"){
        pageWidth = document.documentElement.clientWidth;
        pageWidth = document.documentElement.clientHeight;
    } else {
        pageWidth = document.body.clientWidth;
        pagewidth = document.body.clientHeight;
    }
}

console.log(pageWidth);
console.log(pageHeight);

window.resizeTo(100, 100);
//window.resizeBy(100, 50);
//window.resizeTo(300, 300);

var wroxWin = window.open("http://www.wrox.com/", "wroxWindow", "height=400, width=400, top=10, left=100, resizable=no, status=yes, scrollbars=no, toolbar=no, menubar=no");
/*wroxWin.resizeTo(500, 500);
wroxWin.moveTo(100, 100);

wroxWin.close();
console.log(wroxWin.closed);
console.log(wroxWin.opener == window);
*/
/*var wroxWin = window.open("http://www.wrox.com", "_blank");
if(wroxWin == null){
    console.log("The popup was blocked!");
} else {
    console.log("not blocked!");
}

var blocked = false;

try {
    var wroxWin = window.open("http://www.wrox.com", "_blank");
    if(wroxWin == null){
        blocked = true;
    }
} catch (ex) {
    blocked = true;
}

if(blocked){
    console.log("The popup was blocked!");
}

var timeoutId = setTimeout(function(){
    alert("Hello world!");
}, 3000);
setTimeout(function(){
    clearTimeout(timeoutId);
}, 1000);

/*var num = 0;
var max = 10;
var intervalId = null;

function incrementNumber(){
    num++;
    console.log(num);
    if(num == max){
        clearInterval(intervalId);
        alert("Done");
    }
}

intervalId = setInterval(incrementNumber, 2000);*/

var num = 0;
var max = 10;

function incrementNumber(){
    num++;
    console.log(num);
    if(num < max){
        setTimeout(incrementNumber, 500);
    } else {
        console.log("Done");
    }
}

setTimeout(incrementNumber, 1000);

if(confirm("Are you sure?")){
    console.log("I'm so glad you're sure! ");
} else {
    console.log("I'm sorry to hear you're not sure.");
}

function getQueryStringArgs(){
    var qs = (location.search.length > 0 ? location.search.substring(1): ""),

    args = {},

    items = qs.length ? qs.split("&") : [],
    item = null, name = null, value = null,

    i = 0, len = item.length;

    for(i=0; i<len; i++){
        item = items[i].split("=");
        name = dedodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);

        if(name.length){
            args[name] = value;
        }
    }
    return args;
}

location.assign("http://www.wrox.com");
//window.location("http:/www.wrox.com");
//location.href = "http://www.wrox.com";
function url(){
//URL: http://wwww.wrox.com/WileyCDA/

location.hash = "#section1";
location.search = "?q=javascript";
location.hostname = "www.yahoo.com";
location.pathname = "mydir";
location.port = 8080;
}

//plugine
function hasPlugin(name){
    name = name.toLowerCase();
    for(var i=0; i<navigator.plugins.length; i++){
        if(navigator.plugins[i].name.toLowerCase().indexOf(name) > -1){
            return true;
        }
    }
    return false;
}


//plugine IE
function hasIEPlugin(name){
    try{
        new ActiveXObject(name);
        return true;
    }catch(ex){
        return false;
    }
}

function hasFlash(){
    var result = hasPlugin("Flash");
    if(!result){
        result = hasIEPlugin("ShockwaveFlash.ShockwaveFlash");
    }
    return result;
}

console.log(hasFlash());

function registertest(){
    navigator.registerContentHandler("application/rss+xml", "http://www.somereader.com?feed=%s", "Some Reader");
    navigator.registerProtocolHandler("mailto", "http:/www.somemailclient.com?cmd=%s", "Some Mail Client");
}