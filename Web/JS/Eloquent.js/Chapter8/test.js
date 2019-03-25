//重试
class MuliplicatorUnitFailure extends Error {}

function primitiveMultiply(a, b){
    if(Math.random() < 0.2){
        return a * b;
    }else{
        throw new MultiplicatorUnitFailure();
    }
}

function reliableMultiply(a, b){
    while(1){
    try{
        return primitiveMultiply(a, b);
    }catch(err){
        console.log(`Some went wrong : ${err}`);
    }
}
}

console.log(reliableMultiply(8 ,8));

//上锁的箱子
const box = {
    locked: true,
    unlock() {this.locked = false;},
    lock(){this.locked = true;},
    _content: [],
    get content(){
        if(this.locked) throw new Error("Locked!");
        return this._content;
    }
};

function withBoxUnlocked(body){
    box.unlock();
    try{
        body();
    }finally{
        box.lock();
    }
}

withBoxUnlocked(function(){
    box.content.push("gold piece");
});

try {
    withBoxUnlocked(function(){
        throw new Error("Pirates on the horizon! Abort!");
    });
}catch(e){
    console.log("Error raised:", e);
}
console.log(box.locked);