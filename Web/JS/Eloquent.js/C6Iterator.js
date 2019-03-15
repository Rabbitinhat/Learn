//NOTE 通过可迭代接口,实现可迭代数据结构
class Matrix {
    constructor(width, height, element = (x, y)=>undefined){
        this.width = width;
        this.height = height;
        this.content = [];
        for(let y=0; y<height; y++){
            for(let x=0; x<width; x++){
                //NOTE 按行存储元素;索引基于0;结果基于element()运行结果
                this.content[y*width + x] = element(x, y);
            }
        }
    }
    //NOTE 按行存储元素,返回基于0的索引
    get(x, y){
        return this.content[y*this.width + x];
    }
    set(x, y, value){
        this.content[y * this.width + x] = value;
    }
}
//NOTE 迭代器
class MatrixIterator {
    constructor(matrix){
        this.x = 0;
        this.y = 0;
        this.matrix = matrix;
    }
    //NOTE 迭代使用的next()方法
    next() {
        //NOTE 检查是否到达矩阵底部
        if(this.y == this.matrix.height) return {done: true};

        //NOTE 创建保存当前值的对象
        let value = {
            x: this.x,
            y: this.y,
            value: this.matrix.get(this.x, this.y)
        };
        //NOTE 更新位置
        this.x++;
        //NOTE 如果到了行尾,结束迭代
        if(this.x == this.matrix.width){
            this.x = 0;
            this.y++;
        }
        return {value, done:false};
    }
}

//NOTE 创建接口,使Matrix类可迭代,可以直接在MatrixIterator类中声明
Matrix.prototype[Symbol.iterator] = function(){
    return new MatrixIterator(this);
};

//NOTE 测试迭代器,使用for/of遍历矩阵
let matrix = new Matrix(2, 2, (x, y) => `value ${x}, ${y}`);
for(let {x, y, value} of matrix){
    console.log(x, y, value);
}

//?
//NOTE 继承 inheritance
class SymmetricMatrix extends Matrix {
    constructor(size, element = (x,y) => undefined) {
        //NOTE 通过super调用superclass的constructor
        super(size, size, (x, y) => {
            //NOTE 传入具体的函数创建新的构造函数,交换对角线的值
            if (x<y) return element(y, x);
            else return element(x, y);
        });
    }
    set(x, y, value){
        //NOTE 调用superclass的特定方法
        super.set(x, y, value);
        if(x != y){
            super.set(y, x, value);
        }
    }
}
let matrix2 = new SymmetricMatrix(5, (x, y)=>`${x}, ${y}`);
//NOTE 使用superclass中的方法
console.log(matrix2.get(2, 3));

//NOTE instanceof
console.log(new SymmetricMatrix(2) instanceof SymmetricMatrix);
console.log(new SymmetricMatrix(2) instanceof Matrix);
console.log(new Matrix(2, 2) instanceof SymmetricMatrix);
console.log([1] instanceof Array);