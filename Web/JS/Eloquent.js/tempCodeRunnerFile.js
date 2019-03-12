function deepEqual(val1, val2){
    if(typeof val1 === "object" && typeof val2 === "object" && val1 !== null && val2 !== null){
        //NOTE 比较对象
        //NOTE 获取对象属性名数组
        var val1attr = Object.keys(val1);
        var val2attr = Object.keys(val2);
        let sign = true;
        if(val1attr.length === val2attr.length){
            for(let i=0; i<val1attr.length; i++){
                
                if(sign === true){
                    sign = deepEqual(val1[val1attr[i]], val2[val2attr[i]]);
                }else{
                    return sign;
                }
            }
            return sign;
        }else{
            return false;
        }
    }else if(typeof(val1) !== "object" && typeof(val2) !== "object"){
        return val1 === val2;
    }else{
        return false;
    }
}

let obj3 = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj3, obj3));
console.log(deepEqual(obj3, {here: 1, object: 2}));
console.log(deepEqual(obj3, {here: {is: "an"}, object: 2}));