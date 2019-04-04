//生成请求
//Fetch 使用promise
fetch("example/data.txt").then(responese=>{
    console.log(response.status);
    console.log(response.headers.get("Content-Type"));
})

//获取实际响应内容
fetch("example/data.txt")
    .then(resp=>resp.text())
    .then(text=>console.log(text));

//发送请求
fetch("example/data.txt", {method: "DELETE"}).then(resp => {
    console.log(resp.status);
});

//在请求中添加header
fetch("example/data.txt", {headers: {Range: "bytes=8-19"}})
    .then(resp=>resp.text())
    .then(cosnole.log(resp));

//http sandbox
//Access-Control-Allow-Origin: * 表明可以跨域发送请求

//HTTP

//聚焦
