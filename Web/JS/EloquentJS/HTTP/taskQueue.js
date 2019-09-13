class fQueue {
  constructor() {
    this.tasks = [];
    this.hasRunning = false;
  }
  add(f) {
    // 保存this值
    var self = this;
    if (!this.hasRunning) {
      this.hasRunning = true;
      f(function next() {
        if (self.tasks.length) {
          var nextTask = self.tasks.shift();
          nextTask(next);
        } else {
          self.hasRuning = false;
        }
      });
    } else {
      this.tasks.push(f);
    }
    return this;
  }
}

// 先输出1, 2秒后输出2, 3秒后输出3, 4秒后输出4
var que = new fQueue();
que
  .add(function f1(next) {
    console.log(1);
    setTimeout(() => {
      next();
    }, 1000);
  })
  .add(function f2(next) {
    console.log(2);
    setTimeout(() => {
      next();
    }, 2000);
  })
  .add(function f3(next) {
    console.log(3);
    setTimeout(() => {next()}, 3000)
  })
  .add(function f4(next) {
    console.log(4);
    next();
  });
