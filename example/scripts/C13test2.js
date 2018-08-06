/*
 * @Author: chyon71 
 * @Date: 2018-07-24 23:36:06 
 * @Last Modified by: chyon71
 * @Last Modified time: 2018-07-26 18:22:34
 * @The Answer : The C Answer Book by Clovis L. Tondo & Scott E. Gimpel 
 */
var EventUtil = {
    addHandler: function(element, type, handler){
        if(element.addEventListener){
            element.addEventListener(type, handler, false);
        }else if(element.attachEvent){
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },
    getEvent: function(event){
        return event ? event : window.event;
    },

    getTarget: function(event){
        return event.target || event.srcElement;
    },
    preventDefault: function(event){
        if(event.preventDefault){
            event.preventDefault();
        }else{
            event.returnValue = false;
        }
    },
    removeHandler: function(element, type, handler){
        if(element.removeEventListener){
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent){
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    },
    stopPropagation: function(event){
        if(event.stopPropagation){
            event.stopPropagation();
        }else{
            event.cancelBubble = true;
        }
    },
    getRelatedTarget: function(event){
        if(event.relatedTarget){
            return event.relatedTarget;
        }else if(event.toElement){
            return event.toElement;
        }else if(event.fromElement){
            return event.fromElement;
        }else{
            return null;
        }
    },
    getButton: function(event){
        if(document.implementation.hasFeature("MouseEvents", "2.0")){
            return event.button;
    } else {
        switch(event.botton){
            case 0:
            case 1:
            case 3:
            case 5:
            case 7:
                return 0;
            case 2:
            case 6:
                return 2;
            case 4:
                return 1;
        }
        }
    },
    getWheelDelta: function(event){
        if(event.wheelDelta){
            retunr (client.engine.opera && client.engine.opera < 9.5 ? -event.wheelDelta : event.wheelDelta);
        } else {
            return -event.detail * 40;
        }
    },
    getCharCode: function(event){
        if(typeof event.charCode == "number"){
            return event.charCode;
        } else {
            return event.keyCode;
        }
    }
};

var item1 = document.getElementById("go Somewhere");
var item2 = document.getElementById("do Something");
var item3 = document.getElementById("sayHi");
var list = document.getElementById("myLinks");
EventUtil.addHandler(list, "click", function(event){
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);

    switch(target.id){
        case "doSomething":
            document.title = "I changed the document's title";
            break;
        case "goSomewhere":
            document.title = "http://wwww.baidu.com";
            break;
        case "sayHi":
            console.log("hi");
            break;
    }
})