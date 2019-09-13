var button = document.getElementById("change");
var spans = button.getElementsByTagName("span");
var link = document.getElementsByTagName("link")[0];

if(spans.length > 0 && link !== null){
    for(var i=0; i<spans.length; i++){
        spans[i].onclick = function(i){
            return function(){
                link.href = spans[i].getAttribute("data-link");
            }
        }(i);
    }
}