var out = "PA";
var keyNum = 3;
for(var i=1; i<=100; i++){
    if(i % keyNum == 0 || i%10 == keyNum){
        console.log(out);
    }else{
        console.log(i);
    }
}