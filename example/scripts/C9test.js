/*
 * @Author: chyon71 
 * @Date: 2018-07-11 15:02:32 
 * @Last Modified by: chyon71
 * @Last Modified time: 2018-07-24 20:50:59
 * @The Answer : The C Answer Book by Clovis L. Tondo & Scott E. Gimpel 
 */

 //Chapter 9 Client Detection

 //9.1
 /*
 function getElement(id){
     if(document.getElementById){
         return document.getElementById(id);
     } else if (document.all){
         return document.all[id];
     } else {
         throw new Error("No way to retrieve element!");
     }
 }

 //9.1.1
 function isSortable(object){
     return typeof object.sort == "function";
 }

 function isHostMethod(object, property){
     var t = typeof object[property];
     return t == 'function' || (!!(t=='object' && object[property])) || t=='unknown';
 }

 //9.1.2
 var hasNSPlugins = !!(navigator.plugins && navigator.plugins.length);

 var hasDOM1 = !!(document.getElementById && document.createElement && document.getElementsByTagName);
//9.2
var hasDontEnumQuirk = function(){
    var o = {toString : function(){} };
    for(var prop in o){
        if(prop == 'toString'){
            return false;
        }
    }
    return true;
}();

var hasEnumShadowsQuick = function(){
    var o = { toString : function(){} };
    var count = 0;
    for(var prop in o){
        if(prop == "toString"){
            count++;
        }
    }

    return (count > 1);
}();
*/
//9.3
//9.3.2
var client = function(){
    var engine = {
        //呈现引擎
        ie: 0,
        gecko: 0,
        webkit: 0,
        khtml: 0,
        opera: 0,
        //版本号
        ver: null
    };
    var browser = {
        //浏览器
        ie: 0,
        firefox: 0,
        safari: 0,
        konq: 0,
        opera: 0,
        chrome: 0,

        ver: null
    };
    var system = {
        //平台
        win: false,
        mac: false,
        x11: false,
        //moblie phone
        iphone: false,
        ipod: false,
        ipad: false,
        ios: false,
        android: false,
        nokiaN: false,
        winMobile: false,
        //video game
        will: false,
        ps: false
    };
    return {
        engine: engine,
        browser: browser,
        system: system
    };
}();

var ua = navigator.userAgent;
//opera
if(window.opera){
    engine.ver = browser.ver = window.opera.version();
    engine.opera = browser.ver = parseFloat(engine.ver);
} else if(/AppleWebKit\/(\S+)/.test(ua)){
    //webkit
    engine.ver = RegExp["$1"];
    engine.webkit = pareseFloat(engine.ver);
    //chrome or Safari
    if(/Chrome\/(S+)/.test(ua)){
        browser.ver = RegExp["$1"];
        browser.chrome = parseFloat(browser.ver);
    } else if(/Version\/(S+)/.test(ua)){
        browser.ver = RegExp["$1"];
        browser.safari = parseFloat(browser.ver);
    } else {
        var safariVersion = 1;
        if(engine.webkit < 100){
            safariVersion = 1;
        } else if (engine.webkit < 312){
            safariVersion = 1.2;
        } else if (engine.webkit < 421){
            safariVersion = 1.3;
        } else {
            safariVersion = 2;
        }

        browser.ver = browser.safari = safariVersion;
    }

} else if(/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)){
    //khtml
    engine.ver = browser.ver = RegExp["$1"];
    engine.khtml = browser.khtml = pareseFloat(engine.ver);
} else if(/rv: ([^\)]+)\) Gecko\/\d{8}/.test(ua)){
    //gecko
    engine.ver = RegExp["$1"];
    engine.gecko = parseFloat(engine.ver);

    //not firefox
    if(/Firefox\/(S+)/.test(ua)){
        browser.ver = RegExp["$1"];
        browser.firefox = parseFloat(browser.ver);
    }
} else if(/MSIE ([^;]+)/.test(ua)){
    //ie
    engine.ver = browser.ver = RegExp["$1"];
    engine.ie = browser.ie = parseFloat(engine.ver);
}

var p = navigator.platform;
system.win = p.indexOf("Win") == 0;
system.mac = p.indexOf("Mac") == 0;
system.x11 = (p.indexOf("X11") == 0) || (p.indexOf("Linux") == 0);

if(system.win){
    if(/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)){
        if(RegExp["$1"] == "NT"){
            switch(RegExp["$2"]){
                case "5.0":
                    system.win = "2000";
                    break;
                case "5.1":
                    system.win = "XP";
                    break;
                case "6.0":
                    system.win = "Visita";
                    break;
                case "6.1":
                    system.win = "7";
                    break;
                default:
                    system.win = "NT";
                    break;
            }
        } else if (RegExp["$1"] == "9x"){
            system.win = "ME";
        } else {
            system.win = RegExp["$1"];
        }
    }
}

system.iphone = ua.indexOf("iPhone") > -1;
system.ipod = ua.indexOf("iPod") > -1;
system.ipad = ua.indexOf("iPad") > -1;

if(system.mac && ua.indexOf("Mobile") > -1){
    if(/CPU (?:iPhone )?OS (\d+_\d+)/.test(ua)){
        system.ios = parseFloat(RegExp.$1.replace("_", "."));
    } else {
        system.ios = 2;
    }
}

if(/Android (\d+\.\d+)/.test(ua)){
    system.android = parseFloat(RegExp.$1);
}

system.nokiaN = ua.indexOf("NokiaN") > -1;

//windows mobile
if(system.win == "CE"){
    system.winMobile = system.win;
} else if(system.win == "Ph"){
    if(/Windows Phone OS (\d+.\d+)/.test(ua)){
        system.win = "Phone";
        system.winMobile = parseFloat(RegExp["$1"]);
    }
}

system.wii = ua.indexOf("Wii") > -1;
system.ps = /playstation/i.test(ua);