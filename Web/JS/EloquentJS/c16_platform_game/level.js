// @ts-check

// 关卡
let simpleLevelPlan = `
......................
..#................#..
..#..............=.#..
..#.........o.o....#..
..#.@......#####...#..
..#####............#..
......#++++++++++++#..
......##############..
......................`;

// 构造关卡对象, 构造函数接收一个字符串定义整个关卡
// FIXME 考虑修改字符串参数为数组
class Level {
  constructor(plan) {
    // l => [...l]
    let rows = plan
      .trim()
      .split("\n")
      .map(l => [...l]);

    this.height = rows.length;
    this.width = rows[0].length;

    this.startActors = [];

    this.rows = rows.map((row, y) => {
      return row.map((ch, x) => {
        // levelChars 游戏中表示不同内容特殊字符
        let type = levelChars[ch];
        if (typeof type === "string") return type;
        // type: actor类, .create创建一个对象
        // FIXME
        this.startActors.push(type.create(new Vec(x, y), ch));
        // 对背景元素返回'empty'
        // REVIEW
        return "empty";
      });
    });
  }
}

// action
// 判断某个矩形是否会碰到给定的类型的网格(lava, coin)
Level.prototype.touches = function(pos, size, type) {
  // 获得元素占用的背景方块位置
  var xStart = Math.floor(pos.x);
  var xEnd = Math.floor(pos.x + size.x);
  var yStart = Math.floor(pos.y);
  var yEnd = Math.floor(pos.y + size.y);

  for (var y = yStart; y < yEnd; y++) {
    for (var x = xStart; x < xEnd; x++) {
      // 防止元素位于关卡外面
      let isOutside = x < 0 || x >= this.width || y < 0 || y >= this.height;
      // 当元素位于关卡外面时. 将here重置为wall, 否则为当前位置字符
      let here = isOutside ? "wall" : this.rows[y][x];
      // 查找元素所在范围内是否存在指定类型的元素
      if (here === type) return true;
    }
  }
  return false;
};

// 使用State类保存游戏状态
class State {
  constructor(level, actors, status) {
    this.level = level;
    this.actors = actors;
    this.status = status;
  }

  // 重置State状态为当前关卡的初始状态
  static start(level) {
    return new State(level, level.startActors, "playing");
  }

  // 找到player的当前状态
  get player() {
    return this.actors.find(a => a.type == "player");
  }
}

//
State.prototype.update = function(time, keys) {
  // REVIEW
  let actors = this.actors.map(actor => actor.update(time, this, keys));
  let newState = new State(this.level, actors, this.status);
  if (newState.status != "playing") return newState;

  let player = newState.player;
  if (this.level.touches(player.pos, player.size, "lava")) {
    return new State(this.level, actors, "lost");
  }
  for (let actor of actors) {
    if (actor != player && overlap(actor, player)) {
      newState = actor.collide(newState);
    }
  }

  return newState;
};

// overlip 检测角色是否重叠
function overlap(actor1, actor2) {
  // actor1的左边界小于actor2的右边界,但actor1的右边界大于actor2的左边界
  // FIXME
  // a1的下边界大于a2的上边界, 但a1的上边界
  return (
    actor1.pos.x + actor1.size.x > actor2.pos.x &&
    actor1.pox.x < actor2.pox.x + actor2.size.x &&
    actor1.pos.y + actor1.size.y > actor2.pos.y &&
    actor1.pos.y < actor2.pos.y + actor2.size.y
  );
}

// Vec 类 用于角色移动速度
class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  plus(other) {
    return new Vec(this.x + other.x, this.y + other.y);
  }
  times(factor) {
    return new Vec(this.x * factor, this.y * factor);
  }
}

// Player
class Player {
  constructor(pos, speed) {
    this.pos = pos;
    this.speed = speed;
  }

  get type() {
    return "player";
  }

  static create(pos) {
    // 由于Player高度设置为1.5个格子高, 所以初始位置要比@字符的位置高出.5个格子高, 从而使它的底部和底部方格对齐
    return new Player(pos.plus(new Vec(0, -0.5)), new Vec(0, 0));
  }
}

// 所有的player object的size都相同
Player.prototype.size = new Vec(0.8, 1.5);

const playerXSpeed = 7;
const gravity = 30;
const jumpSpeed = 17;

Player.prototype.update = function(time, state, keys) {
  let xSpeed = 0;
  if (keys.ArrowLeft) xSpeed -= playerXSpeed;
  if (keys.ArrowRight) xSpeed += playerXSpeed;
  let pos = this.pos;
  let movedX = pos.plus(new Vec(xSpeed * time, 0));
  if (!state.level.touches(movedX, this.size, "wall")) {
    pos = movedX;
  }

  let ySpeed = this.speed.y + time * gravity;
  let movedY = pos.plus(new Vec(0, ySpeed * time));
  if (!state.level.touches(movedY, this.size, "wall")) {
    pos = movedY;
  } else if (keys.ArrowUp && ySpeed > 0) {
    // ?
    ySpeed = -jumpSpeed;
  } else {
    ySpeed = 0;
  }
  return new Player(pos, new Vec(xSpeed, ySpeed));
};

// Leve
class Lava {
  constructor(pos, speed, reset) {
    this.pos = pos;
    this.speed = speed;
    this.reset = reset;
  }

  get type() {
    return "lava";
  }

  // Vec
  static create(pos, ch) {
    if (ch == "=") {
      return new Lava(pos, new Vec(2, 0));
    } else if (ch == "|") {
      return new Lava(pos, new Vec(0, 2));
    } else if (ch == "v") {
      return new Lava(pos, new Vec(0, 3), pos);
    }
  }
}

Lava.prototype.size = new Vec(1, 1);

// 处理元素发生接触的情况
Lava.prototype.collide = function(state) {
  return new State(state.level, state.actors, "lost");
};

// 状态更新 Lava
Lava.prototype.update = function(time, state) {
  let newPos = this.pos.plus(this.speed.times(time));
  if (!state.level.touches(newPos, this.size, "wall")) {
    // reset
    return new Lava(newPos, this.speed, this.reset);
  } else if (this.reset) {
    return new Lava(this.reset, this.speed, this.reset);
  } else {
    return new Lava(this.pos, this.speed.times(-1));
  }
};

// Coin
class Coin {
  constructor(pos, basePos, wobble) {
    this.pos = pos;
    this.basePos = basePos;
    this.wobble = wobble;
  }

  get type() {
    return "coin";
  }

  static create(pos) {
    let basePos = pos.plus(new Vec(0.2, 0.1));
    return new Coin(basePos, basePos, Math.random() * Math.PI * 2);
  }
}

Coin.prototype.size = new Vec(0.6, 0.6);

Coin.prototype.collide = function(state) {
  // 硬币碰撞后就会消失, 新的状态中actors不包括当前的coin
  let filtered = state.actors.filter(a => a != this);
  let status = state.status;
  // 如果剩余的actors中不包含金币, 则win
  if (!filtered.some(a => a.type == "coin")) status = "won";
  return new State(state.level, filtered, status);
};

// Coin 状态更新
const wobbleSpeed = 8,
  wobbleDist = 0.07;

Coin.prototype.update = function(time) {
  let wobble = this.wobble + time * wobbleSpeed;
  // REVIEW Math.sin(wobble)?
  let wobblePos = Math.sin(wobble) * wobbleDist;
  return new Coin(
    this.basePos.plus(new Vec(0, wobblePos)),
    this.basePos,
    wobble
  );
};

// levelChars
// 角色, 将Level中特殊字符映射为字符串, 或角色类
const levelChars = {
  ".": "empty",
  "#": "wall",
  "+": "lava",
  "@": Player,
  o: Coin,
  "=": Lava,
  "|": Lava,
  v: Lava
};

// 绘图对象

// 根据传入的属性object和子节点创建新节点
function elt(name, attrs, ...children) {
  let dom = document.createElement(name);
  for (let attr of Object.keys(attrs)) {
    dom.setAttribute(attr, attrs[attr]);
  }
  for (let child of children) {
    dom.appendChild(child);
  }

  return dom;
}

class DOMDisplay {
  constructor(parent, level) {
    this.dom = elt("div", { class: "game" }, drawGrid(level));
    // actorLayer 保存角色元素, 方便移除和重置
    this.actorLayer = null;
    parent.appendChild(this.dom);
  }

  clear() {
    this.dom.remove();
  }
}

// 将基于1个方块的尺寸放大至实际尺寸(pixel, 20px * 20px)
const scale = 20;

// 绘制关卡(table元素)
function drawGrid(level) {
  return elt(
    "table",
    {
      class: "background",
      style: `width: ${level.width * scale}px`
    },
    ...level.rows.map(row => {
      return elt(
        "tr",
        { style: `height: ${scale}px` },
        ...row.map(type => elt("td", { class: type }))
      );
    })
  );
}

// 绘制角色元素
function drawActors(actors) {
  return elt(
    "div",
    {},
    ...actors.map(actor => {
      let rect = elt("div", { class: `actor ${actor.type}` });
      rect.style.width = `${actor.size.x * scale}px`;
      rect.style.height = `${actor.size.y * scale}px`;
      rect.style.left = `${actor.pos.x * scale}px`;
      rect.style.top = `${actor.pos.y * scale}px`;
      return rect;
    })
  );
}

DOMDisplay.prototype.syncState = function(state) {
  // 移除旧的角色元素状态
  if (this.actorLayer) this.actorLayer.remove();
  this.actorLayer = drawActors(state.actors);
  this.dom.appendChild(this.actorLayer);
  this.dom.className = `game ${state.status}`;
  // scrollPlayerIntoView 控制卷轴滚动
  this.scrollPlayerIntoView(state);
};

DOMDisplay.prototype.scrollPlayerIntoView = function(state) {
  let width = this.dom.clientWidth;
  let height = this.dom.clientHeight;
  let margin = width / 3;

  // viewport
  let left = this.dom.scrollLeft,
    right = left + width;
  let top = this.dom.scrollTop,
    bottom = top + height;

  let player = state.player;
  // (plater.pos + (size * 1/2)) * scale
  let center = player.pos.plus(player.size.times(0.5)).times(scale);

  // ?
  if (center.x < left + margin) {
    this.dom.scrollLeft = center.x - margin;
  } else if (center.x > right - margin) {
    this.dom.scrollLeft = center.x + margin - width;
  }
  if (center.y < top + margin) {
    this.dom.scrollTop = center.y - margin;
  } else if (center.y > bottom - margin) {
    this.dom.scrollTop = center.y + margin - height;
  }
}

function trackKeys(keys){
  let down = Object.create(null)
  function track(event){
    if(keys.includes(event.key)){
      down[event.key] = event.type === 'keydown'
      event.preventDefault()
    }
  }
  window.addEventListener('keydown', track)
  window.addEventListener('keyup', track)
  return down
}

const arrowKeys = trackKeys(['ArrowLeft', 'ArrowRight', 'ArrowUp'])

function runAnimation(frameFunc){
  let lastTime = null
  function frame(time){
    let stop = false
    if(lastTime !== null){
      let timeStep = Math.min(time - lastTime, 100) / 1000
      if(frameFunc(timeStep) === false) return
    }
    lastTime = time
    requestAnimationFrame(frame)
  }
  requestAnimationFrame(frame)
}

function runLevel(level, Display){
  let display = new Display(document.body, level)
  let state = State.start(level)
  let ending = 1
  return new Promise(resolve => {
    runAnimation(time => {
      state = state.update(time, arrowKeys)
      display.setState(state)
      if(state.status == 'playing'){
        return true
      }else if(ending > 0)
    })
  })
}