var button = document.getElementById("myButton");
button.onclick = function(){
    console.log(this.id);
};
button.onclick = null;

var btn = document.getElementById("myButton");
var handler = function(){
    console.log(this.id);
};
btn.addEventListener("click", handler, false);
btn.removeEventListener("click", handler, false);

/* IE
btn.attachEvent("onclick", function(){
    console.log("Clicked");
});

btn.attchEvent("onclick", function(){
    console.log("Hello, Listener");
});
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

btn.onclick = function(){
    console.log(event.type);
}
btn.onclick = null;

document.body.onclick = function(event){
    console.log(event.currentTarget);
    console.log(event.target);
    console.log(this === document.body);
}
document.body.onclick = null;
var handler = function(event){
    switch(event.type){
        case "click":
            console.log("Clicked");
            event.stopPropagation();
            break;
        case "mouseover":
            event.target.style.backgroundColor = "red";
            break;
        case "mouseout":
            event.target.style.backgroundColor = "";
            break;
    }

};

btn.onclick = handler;
btn.onmouseover = handler;
btn.onmouseout = handler;

var link = document.getElementById("myLink");
link.onclick = function(event){
    event.preventDefault();
};
link.onclick = null;

document.body.onclick = function(event){
    console.log("body clicked");
};

var btn = document.getElementById("myButton2");
btn.onclick = function(){
    console.log(window.event.srcElement === this);
};

btn.addEventListener("click", function(event){
    console.log(event.srcElement === this);
}, false);

var isSupported = document.implementation.hasFeature("HTMLEvents", "2.0");

EventUtil.addHandler(window, "load", function(event){
    console.log("Loaded!");
});

var img = document.getElementById("myImage");
EventUtil.addHandler(img, "load", function(event){
    event = EventUtil.getEvent(event);
    console.log(EventUtil.getTarget(event).src);
})

EventUtil.addHandler(window, "load", function(){
    var script = document.createElement("script");
    EventUtil.addHandler(script, "load", function(event){
        console.log("Loaded");
    });
    script.src = "simple.js";
    document.body.appendChild(script);
}
);

EventUtil.addHandler(window, "unload", function(event){
    console.log("Unloaded");
});

EventUtil.addHandler(window, "resize", function(event){
    console.log("Resized");
});

EventUtil.addHandler(window, "scroll", function(event){
    if(document.compatMode == "CSS1Compat"){
        console.log(document.documentElement.scrollTop);
    } else{
        console.log(document.body.scrollTop);
    }
});

var isSupported = document.implementation.hasFeature("MouseEvents", "2.0");
console.log(isSupported);

var div = document.getElementById("myDiv");
EventUtil.addHandler(div, "click", function(event){
    event = EventUtil.getEvent(event);
    console.log("Client coordinates: " + event.clientX + "," + event.clientY);
});

var div = document.getElementById("myDiv");
EventUtil.addHandler(div, "click", function(event){
    event = EventUtil.getEvent(event);
    console.log("Page coordinates: " + event.pageX + "," + event.pageY);
});

EventUtil.addHandler(div, "click", function(event){
    event = EventUtil.getEvent(event);
    var pageX = event.pageX;
    var pageY = event.pageY;

    if(pageX === undefined){
        pageX = event.clientX + (document.body.scrollLeft || document.documentElement.scrollLeft);
    }

    if(pageY === undefined){
        pageY = event.clientY + (document.body.scrollTop || document.documentElement.scrollTop);
    }

    console.log("Page coordinates: " + pageX + "," + pageY);
});

EventUtil.addHandler(div, "click", function(){
    event = EventUtil.getEvent(event);
    console.log("Screen coordinates: " + event.screenX + "," + event.screenY);
});

EventUtil.addHandler(div, "click", function(){
    event = EventUtil.getEvent(event);
    var keys = new Array();

    if(event.shiftKey){
        keys.push("shift");
    };
    if(event.ctrlKey){
        keys.push("ctrl");
    };
    if(event.altKey){
        keys.push("alt");
    };
    if(event.metaKey){
        keys.push("meta");
    };
    console.log("Keys: " + keys.join(","));
})

var div = document.getElementById("myDiv2");
EventUtil.addHandler(div, "mouseout", function(event){
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    var relatedTarget = EventUtil.getRelatedTarget(event);
    console.log("Moused out of " + target.tagName + " to " + relatedTarget.tagName);
});

var div = document.getElementById("myDiv2");
EventUtil.addHandler(div, "mousedown", function(event){
    event = EventUtil.getEvent(event);
    console.log(EventUtil.getButton(event));
});

EventUtil.addHandler(document, "mousewheel", function(event){
    event = EventUtil.getEvent(event);
    console.log(event.wheelDelta);
});

var textbox = document.getElementById("myText");
EventUtil.addHandler(textbox, "keyup", function(event){
    event = EventUtil.getEvent(event);
    console.log(event.keyCode);
});

var textbox = document.getElementById("myText");
/*EventUtil.addHandler(textbox, "keyup", function(event){
    event = EventUtil.getEvent(event);
    console.log(event.keyCode);
})

EventUtil.addHandler(textbox, "keypress", function(event){
    event = EventUtil.getEvent(event);
    console.log(EventUtil.getCharCode(event));
})
EventUtil.addHandler(textbox, "keypress", function(event){
    event = EventUtil.getEvent(event);
    var identifier = event.key || event.keyIdentifier;
    if(identifier){
        console.log(identifier);
    }
})

EventUtil.addHandler(textbox, "compositionstart", function(event){
    event = EventUtil.getEvent(event);
    console.log(event.data);
});
*/
EventUtil.addHandler(textbox, "textInput", function(event){
    event = EventUtil.getEvent(event);
    console.log(event.data);
});

var isSupported = document.implementation.hasFeature("MutationEvents", "2.0");
console.log(isSupported);

EventUtil.addHandler(window, "load", function(event){
    var list = document.getElementById("myList");

    EventUtil.addHandler(document, "DOMSubtreeModified", function(event){
        console.log(event.type);
        console.log(event.target);
    });

    EventUtil.addHandler(document, "DOMNodeRemoved", function(event){
        console.log(event.type);
        console.log(event.target);
        console.log(event.relateNode);
    });

    EventUtil.addHandler(document, "DOMNodeRemovedFromDocument", function(event){
        console.log(event.type);
        console.log(event.target);
    });

    list.parentNode.removeChild(list);
});

EventUtil.addHandler(window, "load", function(event){
    var div = document.getElementById("myDiv3");

    EventUtil.addHandler(div, "contextmenu", function(event){
        event = EventUtil.getEvent(event);
        EventUtil.preventDefault(event);

        var menu = document.getElementById("myMenu");
        menu.style.left = event.clientX + "px";
        menu.style.top = event.clientY + "px";
        menu.style.visibility = "visible";
    });

    EventUtil.addHandler(document, "click", function(event){
        document.getElementById("myMenu").style.visibility = "hidden";
    });
});

EventUtil.addHandler(window, "beforeunload", function(event){
    event = EventUtil.getEvent(event);
    var message = "I'm really going to miss you if you go.";
    event.returnValue = message;
    return message;
    
    
});

/*EventUtil.addHandler(document, "DOMContentLoaded", function(event){
    console.log("content loaded");
});*/

(function(){
    var showCount = 0;

    EventUtil.addHandler(window, "load", function(){
        console.log("Load fired");
    });

    EventUtil.addHandler(window, "pageshow", function(){
        showCount++;
        console.log("Show has been fired " + showCount + " times" + " times.Persisited? " + event.persisted);
    });
})();