addEventListener("message", event=>{
    //postMessage 发送消息, 触发接收方的message事件
    postMessage(event.data * event.data);
});