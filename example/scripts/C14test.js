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
    },
    getClipboardText: function(event){
        var clipboardData = (event.clipboardData || window.clipboardData);
        return clipboardData.getData("text");
    },
    setClipboardText: function(event, value){
        if(event.clipboardData){
            return event.clipboardData.setData("text/plain", value);
        } else if(window.clipboardData){
            return window.clipboardData.setData("text", value);
        }
    },
};

var form = document.getElementById("form1");
/*
EventUtil.addHandler(form, "submit", function(event){
    event = EventUtil.getEvent(event);
    EventUtil.preventDefault(event);
});
EventUtil.addHandler(form, "click", function(event){
    form.submit();
})


EventUtil.addHandler(form, "reset", function(event){
    event = EventUtil.getEvent(event);
    EventUtil.preventDefault(event);
})

*/
var field1 = form.elements[0];
var field2 = form.elements["city"];
var fieldCount = form.elements.length;
console.log(field2.length);
console.log(fieldCount);

EventUtil.addHandler(form, "submit", function(event){
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);

    var btn = target.elements["submit-btn"];

    btn.disabled = true;
});

EventUtil.addHandler(window, "load", function(event){
    document.forms[0].elements[0].focus();
});

var textbox = document.forms[0].elements[3];

EventUtil.addHandler(textbox, "focus", function(event){
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);

    if(target.style.backgroundColor != "red"){
        target.style.backgroundColor = "yellow";
    }
});

EventUtil.addHandler(textbox, "blur", function(event){
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);

    if(/[^\d]/.test(target.value)){
        target.style.backgroundColor = "red";
    }else{
        target.style.backgroundColor = "";
    }
});

EventUtil.addHandler(textbox, "change", function(event){
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);

    if(/[^\d]/.test(target.value)){
        target.style.backgroundColor = "red";
    } else {
        target.style.backgroundColor = "";
    }
});
var textbox = document.forms[0].elements["textarea1"];
console.log(textbox.value);

textbox.value = "Some new value";

var textbox = document.forms[0].elements["textarea1"];
textbox.select();

EventUtil.addHandler(textbox, "focus", function(event){
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);

    target.select();
});

EventUtil.addHandler(textbox, "select", function(event){
    console.log("Text selected " + textbox.value);
});

function getSelecetedText(textbox){
    return textbox.value.substring(textbox.selectionStart, textbox.selectionEnd)
}

EventUtil.addHandler(textbox, "keypress", function(event){
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    var charCode = EventUtil.getCharCode(event);

    if(!/\d/.test(String.fromCharCode(charCode)) && charCode > 9 && !event.ctrlKey){
        EventUtil.preventDefault(event);
    }
});

EventUtil.addHandler(textbox, "paste", function(event){
    event = EventUtil.getEvent(evet);
    var text = EventUtil.getClipboardText(event);
    if(!/^\d*$/.test(text)){
        EventUtil.preventDefault(event);
    }
});

(function(){
    function tabForward(event){
        event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event);

        if(target.value.length == target.maxLength){
            var form = target.form;

            for(var i=0, len=form.elements.length; i<len; i++){
                if(form.elements[i] == target){
                    if(form.elements[i+1]){
                        form.elements[i+1].focus();
                    }
                    return;
                }
            }
        }
    }
    var textbox1 = document.getElementById("textTel1");
    var textbox2 = document.getElementById("textTel2");
    var textbox3 = document.getElementById("textTel3");

    EventUtil.addHandler(textbox1, "keyup", tabForward);
    EventUtil.addHandler(textbox2, "kepup", tabForward);
    EventUtil.addHandler(textbox3, "textTel3", tabForward);
})();

var isUsernameRequired = document.forms[0].elements["fave1"].required;
var isRequiredSupported = "required" in document.createElement("input");

var input = document.createElement("input");
input.type = "email";

var isEmailSupported = (input.type == "email");
console.log(isEmailSupported);

var isPatternSupported = "pattern" in document.createElement("input");
console.log(isPatternSupported);
var input = document.forms[0].elements["fave1"];
if(input.validity && !input.validity.valid){
    if(input.validity.valueMissing){
        console.log("Please specify a value");
    } else if(input.validity.typeMissmatch){
        console.log("Please enter an email address.");
    }else{
        console.log("Value is invalid.");
    }
}
var selectbox = document.forms[0].elements["location"];
selectbox.options[1].selected = false;
var selectedOption = selectbox.options[selectbox.selectedIndex];

var selectedIndex = selectbox.selectedIndex;
var selectedOption = selectbox.options[selectedIndex];
console.log("Selected index: " + selectedIndex + "\nSelected text: " + selectedOption.text + "\nSelected value: " + selectedOption.value);

function getSelectedOptions(selectbox){
    var result = new Array();
    var option = null;

    for(var i=0, len=selectbox.options.length; i<len; i++){
        option = selectbox.options[i];
        if(option.selected){
            result.push(option);
        }
    }

    return result;
}
var newOption = new Option("Option text", "Option value");
//selectbox.appendChild(newOption);
selectbox.add(newOption, undefined);

selectbox.removeChild(selectbox.options[selectbox.options.length-1]);
selectbox.options[0] = null;

/*
function serialize(form){
    var parts = [];
    var field = null;
    var i;
    var len;
    var j;
    var optLen;
    var option;
    var optValue;

    for(i=0, len=form.elements.length; i< len; i++){
        field = form.elements[i];
        switch(field.type){
            case "select-one":
            case "select-multipe":

            if(field.name.length){
                for(j=0, optLen = field.options.length; j<optLen; j++){
                    option = field.options[j];
                    if(option.selected){
                        optValue = "";
                        if(option.hasAttribute){
                            optValue = (option.hasAttribute("value") ? option.value : option.text);
                        }else{
                            optValue = (option.attributes["value"].specified ? option.value : option.text);
                        }
                        parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(optValue));
                    }
                }
            }
            break;

            case undefined:
            case "file":
            case "submit":
            case "button":
                break;
            case "radio":
            case "checkbox":
                if(!field.checked){
                    break;
                }
            default:
                if(field.name.length){
                    parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
                }
        }
    }
    return parts.join("&");
}
*/

var myDiv = document.getElementById("myDiv");
myDiv.contentEditable = "true";

document.execCommand("bold", false, null);

frames["richedit"].document.execCommand("italic", false, null);

document.execCommand("createlink", false, "http://www.baidu.com");

frames["richedit"].document.execCommand("formatblock", false, "<h1>");

var result = frames["richedit"].document.queryCommandEnabled("bold");
console.log(result);

var isBold = frames["richedit"].document.queryCommandState("bold");

/*
var selection = frames["richedit"].getSelection();
var selectedText = selection.toString();
var range = selection.getRangeAt(0);
var span = frames["richedit"].document.createElement("span");
span.style.backgroundColor = "yellow";
range.surroundContents(span);
*/