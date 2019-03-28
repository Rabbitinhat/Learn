import {bigOak} from "./crow-tech";

bigOak.readStorage("food caches", caches => {
    let firstCache = caches[0];
    bigOak.readStorage(firstCache, info=>{
        console.log(info);
    });
});

//鸟巢发送请求(目标的名称, 请求的类型, 请求内容, 回调函数)
bigOak.send("Cow Pasture", "note", "Let's caw loudly at 7PM", ()=>console.log("Note delivered."));

//定义请求类型note
import {defineRequestType} from "./crow-tech";

defineRequestType("note", (nest, content, source, done) => {
    //请求到达时发送
    console.log(`${nest.name} received note: ${content}`);
    //回调函数
    done();
});

//storage
function storage(nest, name){
    return new Promise(resolve => {
        nest.readStorage(name, result => resolve(result));
    });
}

storage(bigOak, "enemies")
    .then(value => console.log("Got", value));


class Timeout extends Error {}

function request(nest, target, type, content){
    return new Promise((resolve, reject) => {
        let done = false;
        function attempt(n) {
            nest.send(target, type, content, (failed, value) => {
                done = true;
                if(failed) reject(failed);
                else resolve(value);
            });
            setTimeout(()=>{
                if (done) return;
                else if(n < 3) attempt(n+1);
                else reject(new Timeout("Timed out"));
            }, 250);
        }
        attempt(1);
    })
}