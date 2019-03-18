var add3 = function(n){
    return function(m){
        return function(j){
            return n + m + j;
        }
    }
}

console.log(add3(1)(2)(3));