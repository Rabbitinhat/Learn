// // 组合生成器函数 和 promise 优化异步函数书写
// function* natureNumber(n) {
//   for (let i = 0; i < n; i++) {
//     setTimeout(() => console.log("before", i, ":", a), 200);
//     // yeild 操作符, 会返回结果
//     // 不会有赋值操作
//     // console.log(a) 输出undefined
//     // yield 后的值为next输出结果的value
//     // yield i 为一体 (类似typeof a?)

//     // yield throw() 抛出错误
//     // yield return () 函数结束, 返回return()中参数, yield也会结束
//     console.log(yield i);
//   }
// }

// var con = natureNumber(10);

// for (let i = 0; i < 10; i++) {
//   console.log("con", con.next().value);
// }

// REVIEW done 为true时, value中保存着function 的返回值
// 生成器将异步语句转换为同步的形式
// 这段操作本身仍为异步
function getVal(val) {
  return new Promise(resolve => {
    setTimeout(() => resolve(val * val), 1000 + Math.random() * 2000);
  });
}

run(
  // 这个函数是逐步执行的
  function* foo() {
    var x = yield getVal(8);
    console.log(x);
    var y = yield getVal(7);
    console.log(y);
  //     yield会将Promise的错误抛出
    try{
      var z = yield Promise.reject(6);
      console.log(z);
    }catch(e){
      console.log('Wrong! ', e)
    }
    var d = yield getVal(5);
    console.log(d);
    var e = yield getVal(4);
    console.log(e());
    var m = yield getVal(3);
    console.log(m);
    var n = yield getVal(2);
    console.log(n);
    return new Promise((resolve, reject) => {
    setTimeout(() => resolve(16 * 16), 1000 + Math.random() * 2000);
})
  }
).then((val) => {
  console.log(val)
}, (reason) => {
  console.error(reason)
})

// 将操作封装为run函数, generator执行完毕后, 返回结束时的生成器对象
function run(generatorFunction){
  return new Promise((resolve, reject) => {
    var conn = generatorFunction();
    // var obj = conn.next()
    // console.log(obj.value) // => {value: [Promise], done: false}
    
    // conn.value.then((val) => {
    // next()传入参数相当于yield 的返回值
    //   conn.next(val).value.then(val => {
    //     conn.next(val).value.then(val => {
    //       conn.next(val).value.then(val => {
    //         conn.next(val)
    //       })
    //     })
    //   }) // => x => val
    // })
    
    var generated 
    try{
      generated = conn.next();
    }catch(e){
      console.log('Wrong! ', e)
      reject(e)
    }
    step();
    
    function step() {
    // generated是否完成
      if (!generated.done) {
        generated.value.then(val => {
//           如果generatorFunction运行中存在错误, 会在调用下一个yield(通过next())的返回位置抛出错误
          try{
          generated = conn.next(val)
          step();
          }catch(e){
            console.error('Wrong! ', e)
            reject(e)
          }
        }, reason => {
          // throw 返回错误给z
          // yield会继续执行
          // 执行到下一次的yield操作符位置, 传入getVal, 返回new Promise
          // 需要一个值接住返回的promise对象
         try{
          //  REVIEW step 位置可能会导致死循环
          generated = conn.throw(reason) 
          step()
         }catch(e){
           console.error('Wrong! ', e)
           reject(e)
         }
        });
      }else{
// REVIEW        如果generatorFunction返回值为promise时, resolve会对promise值进行解析, 返回实际值
//         console.log(generated.value)
//         resolve(generated.value)
// REVIEW
Promise.resolve(generated.value).then(resolve, reject)
      }
    }
  })}


// JS对象中, 可能还会绑定事件
// 对特殊情况进行响应

// stream
