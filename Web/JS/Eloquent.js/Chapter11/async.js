//callback
setTimeout(() => console.log("Tick"), 500);

//Promise
let fifteen = Promise.resolve(15);
//.then()获得Promise()的结果, 声明一个回调函数
//当Promise解析并产生一个值时被调用
fifteen.then(value => console.log(`Got ${value}`));

