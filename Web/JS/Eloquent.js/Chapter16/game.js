//平台跳跃游戏
//定义关卡字符串
class Level {
    constructor(plan){
        let rows = plan.trim().split("\n").map(l=>[...l]);
        this.height = rows.length;
        this.width = rows[0].length;
        //保存可移动元素
        this.startActors = [];
        this.rows = rows.map((row, y) => {
            return row.map((ch, x) => {
                //使用leveChars Object, 将背景元素映射为String, 角色映射为class
                let type = levelChars[ch];
                //如果是背景
                if(typeof type == "string") return type;
                //如果是角色, 创建一个对象(create)添加到startActors中
                this.startActors.push(
                    type.create(new Vec(x, y), ch)
                );
                //为角色时, 背景返回"empty"
                return "empty";
            });
        });
    }
}

//跟踪游戏状态
class State{
    constructor(level, actors, status){
        this.level = level;
        this.actors = actors;
        this.status = status;
    }

    //static ?
    static start(level) {
        return new State(level, level.startActors, "playing");
    }

    get player() {
        return this.actors.find(a => a.type == "player");
    }
}

//定义角色
class Vec {
    constructor(x, y) {
        this.x = x; this.y = y;
    }
    plus(other){
        return new Vec(this.x + other.x, this.y + other.y);
    }
    times(factor){
        return new Vec(this.x * factor, this.y * factor);
    }
}

//定义玩家类
class Player {
    constructor(pos, speed){
        this.pos = pos;
        this.speed = speed;
    }

    get type(){return "player";}

    static create(pos){
        return new Player(pos.plus(new Vec(0, -0.5)), new Vec(0, 0));
    }
}

Player.prototype.size = new Vec(0.8, 1.5);

//岩浆角色
class Lava{
    constructor(pos, speed, reset){
        this.pos = pos;
        this.speed = speed;
        this.reset = reset;
    }

    get type(){return "lava";}

    static create(pos, ch){
        if(ch == "="){
            return new Lava(pos, new Vec(2, 0));
        }else if(ch == "|"){
            return new Lava(pos, new Vec(0, 2));
        }else if(ch == "v"){
            return new Lava(pos, new Vec(0, 3), pos);
        }
    }
}

Lava.prototype.size = new Vec(1, 1);

//Coin
class Coin {
    constructor(pos, basePos, wobble){
        this.pos = pos;
        this.basePos = basePos;
        this.wobble = wobble;
    }

    get type(){return "coin";}

    static create(pos){
        let basePos = pos.plus(new Vec(0.2, 0.1));
        return new Coin(basePos, basePos, Math.random()*Math.PI * 2);
    }
}

Coin.prototype.size = new Vec(0.6, 0.6);

//levelChars 将平面字符图映射为背景网格类型, 或角色类
const levelChars = {
    "." : "empty", "#": "wall", "+": "lava",
    "@" : Player, "o": Coin,
    "=": Lava, "|": Lava, "v": Lava
};

let simpleLevel = new Level(simpleLevelPlan);
console.log(`${simpleLevel.width} by ${simpleLevel.height}`);

//封装绘图代码
function elt(name, attrs, ...children){
    let dom = document.createElement(name);
    for(let attr of Object.keys(attrs)){
        dom.setAttribute(attr, attrs[attr]);
    }
    for(let child of children){
        dom.appendChild(child);
    }
    return dom;
}

//指定显示
class DOMDisplay {
    constructor(parent, level){
        this.dom = elt("div", {class: "game"}, drawGrid(level));
        this.actorLayer = null;
        parent.appendChild(this.dom);
    }

    clear(){this.dom.remove();}
}

const scale = 20;

//使用table实现网格结构 Grid
function drawGrid(level){
    return elt("table", {
        class: "background",
        style: `width: ${level.width * scale}px`
    }, ...level.rows.map(row =>
        elt("tr", {style: `height: ${scale}px`},
        ...row.map(type => elt("td", {class: type})))
        ));
}

function drawActors(actors){
    return elt("div", {}, ...actors.map(actor => {
        let rect = elt("div", {class: `actor ${actor.type}`});
        rect.style.width = `${actor.size.x * scale}px`;
        rect.style.height = `${actor.size.y * scale}px`;
        rect.style.left = `${actor.pos.x * scale}px`;
        rect.style.top = `${actor.pos.y * scale}px`;
        return rect;
    }));
}

//使显示器显示给定的状态
DOMDisplay.prototype.setState = function(state){
    if(this.actorLayer) this.actorLayer.remove();
    this.actorLayer = drawActors(state.actors);
    this.dom.appendChild(this.actorLayer);
    this.scrollPlayerIntoView(state);
};

//调整视口viewport
DOMDisplay.prototype.scrollPlayerIntoView = function(state){
    let width = this.dom.clientWidth;
    let height = this.dom.clientHeight;
    let margin = width / 3;

    //The viewport
    let left = this.dom.scrollLeft, right = left + width;
    let top = this.dom.scrollTop, bottom = top + height;

    let player = state.player;
    let center = player.pos.plus(player.size.times(0.5)).times(scale);

    if(center.x < left + margin){
        this.dom.scrollLeft = center.x - margin;
    }else if(center.x > right - margin){
        this.dom.scrollLeft = center.x + margin - width;
    }
    if(center.y < top + margin){
        this.dom.scrollTop = center.y - margin;
    }else if(center.y > bottom - margin){
        this.dom.scrollTop = center.y + margin - height;
    }
};

let simpleLevel = new Level(simpleLevelPlan);
let display = new DOMDisplay(document.body, simpleLevel);
display.setState(State.start(simpleLevel));

//判断矩形是否回碰到给定类型的网格
Level.prototype.touches = function(pos, size, type){
    var xStart = Math.floor(pos.x);
    var xEnd = Math.ceil(pos.x + size.x);
    var yStart = Math.floor(pos.y);
    var yEnd = Math.ceil(pos.y + size.y);

    for(var y = yStart; y < yEnd; y++){
        
    }
}