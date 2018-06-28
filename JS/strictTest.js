//function doSomething(){
    "use strict";
    //var octalNum1 = 070;
    //console.log(octalNum1);
    function doAdd(num1, num2){
        arguments[1] = 5;
        console.log(arguments[0] + num2);
    }
    doAdd(10, 30);
//}