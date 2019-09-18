class EventEmmiter {
  constructor() {
    this.events = new Map();
  }

  on(event, cb) {
    if (this.events.get(event) === undefined) {
      this.events.set(event, [cb]);
    } else {
      let listeners = this.events.get(event);
      if (listeners.indexOf(cb) === -1) {
        listeners.push(cb);
      }
    }
    return this
  }

  off(event, cb) {
    let listeners = this.events.get(event);
    if (listeners !== undefined) {
      if (cb === undefined) {
        this.events.delete(event);
      } else {
        let pos = listeners.indexOf(cb);
        if (pos > -1) {
          listeners.splice(pos, 1);
        }
      }
    }
    return this
  }

  emit(event, ...args) {
    let listeners = this.events.get(event);
    if (listeners !== undefined) {
      // 书写较为底层代码时, 需要关注性能
      // 尽量少使用高阶函数
      for(var i=0; i<listeners.length; i++){
        var handler = listeners[i]
        handler.call(this, ...args)
      }
      return true;
    }
    return false;
  }
}

var emmiter = new EventEmmiter();
emmiter.on("foo", () => {
  console.log(1);
});

emmiter.emit("foo"); //will log 1
console.log(emmiter.on("good", (a, b) => console.log(a + b)));
console.log(emmiter.on("good", (a, b, c, d) => console.log(a * b * c * d)));
console.log(emmiter.events.get("good"));
emmiter.emit("good", 2, 3, 4, 5);


class EventEmmiter{
  constructor(){
    this.eventListener
  }

  addEventListener(type, handler){

  }

  removeEventListener(type, handler){

  }

  dispatchEvent(type, ...args){

  }
}