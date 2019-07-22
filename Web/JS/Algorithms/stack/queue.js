// queue
class Queue {
  static from(ary) {
    var q = new Queue();
    for (var val of ary) {
      q.add(val);
    }
    return q;
  }

  constructor() {
    this._head = null;
    this._tail = null;
    this._size = 0;
  }

  add(val) {
    var node = {
      val: val,
      next: null
    };
    this._size++;
    if (this._head == null) {
      this._head = this._tail = node;
    } else {
      this._tail.next = node;
      this._tail = node;
    }
    return this;
  }

  remove() {
    if (!this._head) {
      return undefined;
    }
    this._size--;
    var node = this._head;
    this._head = this._head.next;
    if (this._head == null) {
      this._tail = null;
    }
    return node.val;
  }

  get size() {
    return this._size;
  }
}

// let b = Queue.from([1, 2, 3, 4, 5, 6])
// console.log(b._head)
// console.log(b.size)
// console.log(b.remove())
// console.log(b)

// * class 类似let, 创建的类名唯一
class myQueue {
  // * static 创建Queue的方法
  static from(ary) {
    let q = new myQueue();
    for (let element of ary) {
      console.log(element);
      q.add(element);
    }
    return q;
  }
  // * 构造函数
  constructor() {
    (this._head = null), (this._tail = null), (this._size = 0);
  }
  // * 添加节点
  add(val) {
    let node = {
      val: val,
      next: null
    };
    console.log(node);
    this._size++;
    // * 如果队列为空
    // * 将head, tail都设置为node
    if (this._head === null) {
      this._head = node;
      this._tail = node;
    } else {
      // * 否则在尾部添加node
      this._tail.next = node;
      this._tail = node;
    }
    return this;
  }
  // * 移除节点
  remove() {
    // * 如果队列为空
    if (!this._head) return undefined;
    this._size--;
    let node = this._head;
    this._head = this._head.next;
    // * 如果队列只有一个节点, 重新设置tail为null
    if (this._head === null) {
      this._tail = null;
    }
    return node.val;
  }
  get getsize() {
    return this._size;
  }
}

let b = myQueue.from([1, 2, 3, 4, 5, 6]);
console.log(b._head);
console.log(b.getsize);
console.log(b);

class Stack {
  static from(ary) {
    let p = new Stack();
    for (let element of ary) {
      p.push(element);
    }
    return p;
  }

  constructor() {
    this._top = null;
    this._stackCount = 0;
  }

  push(val) {
    let node = {
      val: val,
      next: this._top
    };
    this._stackCount++;
    this._top = node;
    return this;
  }

  pop() {
    if (!this._top) return undefined;
    this._stackCount--;
    let node = this._top;
    this._top = this._top.next;
    return node.val;
  }

  get size() {
    return this._stackCount;
  }
}

let c = Stack.from([1, 2, 3, 4, 5, 6]);
console.log(c);
console.log(c.size);
console.log(c.push(7));
console.log(c.pop());
console.log(c.size);

// * 无序性, 互异性(每个元素都不相同), 确定性(元素存在/不存在于集合中)
class Set {
  constructor(initialValues) {
    this.set = {};
    this.setsize = 0;
    if (initialValues) {
      for (let element of initialValues) {
        this.set[element] = element;
        this.setsize++;
      }
    }
  }

  add(val) {
    if (!this.set[val]) {
      this.set[val] = val;
      this.setsize++;
      return this;
    }
  }

  remove(val) {
    if (this.has(val)) {
      delete this.set[val];
      this.setsize--;
      return val;
    } else {
      return undefined;
    }
  }

  has(val) {
    if (this.set[val] !== undefined) {
      return true;
    }
    return false;
  }

  clear() {
    this.set = {};
    this.setsize = 0;
    return this;
  }

  get size() {
    return this.setsize;
  }
}

let set = new Set([1, 2, 3, 4, 5, 6]);
console.log(set);
console.log(set.add(100));
console.log(set.add(1));
console.log(set.remove(3));
console.log(set.remove(200));
console.log(set.has(4));
console.log(set.has(4000));
console.log(set.size);
console.log(set.clear());

// * Map
class Map {
  constructor(initialValues) {
    this.map = [];
    // ? size 为隐藏属性
    this.setsize = 0;
    // * "1" !== 1 用值来保存, key, value
    for (let element of initialValues) {
      // ? 构造函数不能使用class中的方法
      let node = {
        key: element[0],
        value: element[1]
      };
      let inMap = 0;
      for (let ary of this.map) {
        // * 引用类型进行`===`判断时, 由于引用的对象不同, 即使值相等也会返回false([1, 2] === [1, 2] => false)
        if (ary["key"] === element[0]) {
          ary["value"] = element[1];
          inMap = 1;
        }
      }
      if (!inMap) {
        this.map.push(node);
        this.setsize++;
      }
    }
  }

  set(key, val) {
    let node = {
      key: key,
      value: val
    };
    for (let element of this.map) {
      if (element["key"] === key) {
        element["value"] = val;
        return this.map;
      }
    }
    this.map.push(node);
    this.setsize++;
    return this.map;
  }

  get(key) {
    for (let element of this.map) {
      if (element["key"] === key) {
        return element["value"];
      }
    }
    return undefined;
  }

  delete(key) {
    for (let i = 0; i < this.map.length; i++) {
      if (this.map[i]["key"] === key) {
        // ?
        this.map.splice(i, 1);
        this.setsize--;
        return true;
      }
    }
    return false;
  }

  has(key) {
    for (let element of this.map) {
      if (element["key"] === key) {
        return true;
      }
    }
    return false;
  }

  clear() {
    this.map = [];
    this.setsize = 0;
  }

  get size() {
    return this.setsize;
  }
}

let map = new Map([[1, 2], [3, 2], [5, 6], [3, 6]]);
console.log(map);
console.log(map.set([1, 2, 3, 4], 68686));
console.log(map.size);
console.log(map.get([1, 2, 3, 4]));
console.log(map.has(1));
console.log(map.size);
console.log(map.clear());
console.log(map);
console.log(map.get([1, 2, 3, 4]));
console.log(map.has(1));

class MySet {
  constructor() {
    // * 存储各种类型值
    this._values = [];
  }

  add(val) {
    if (!this.has(val)) {
      this._values.push(val);
    }
    return this;
  }

  has(val) {
    return this._values.includes(val);
  }

  delete(val) {
    // * NaN
    if (val !== val) {
    }
    var idx = this._values.indexOf(val);
    if (indexOf >= 0) this._values.splice(index, 1);
    return this;
  }

  clear() {
    this._values = [];
    return this;
  }

  get size() {
    return this._values.length;
  }
}

class MyMap {
  constructor(initialValues) {
    this._keys = [];
    this._values = [];

    for (let element of initialValues) {
      this.set(element[0], element[1]);
    }
  }

  set(key, val) {
    let idx = this._keyIndex(key);
    if (idx >= 0) {
      this._values[idx] = val;
    } else {
      this._keys.push(key);
      this._values.push(val);
    }
    return this;
  }

  get(key) {
    let idx = this._keyIndex(key);

    return key >= 0 ? this_values[idx] : undefined;
  }

  _keyIndex(key) {
    if (key !== key) {
      for (let i = 0; i < this._key.length; i++) {
        if (this.keys[i] !== this.keys[i]) return i;
      }
    } else {
      return this._keys.indexOf(key);
    }
  }

  delete(key) {
    let idx = this._keyIndex(key);
    if (key >= 0) {
      this._values.splice(idx, 1);
      this._keys.splice(idx, 1);
    }
  }

  clear() {
    this._keys = [];
    this._values = [];
    return this;
  }

  get size() {
    return this._keys.length;
  }
}

// * HTML 表格
tableHTML([{ a: 1 }, { b: 2 }]);
function tableHTML(data) {
  var result = "<table><thead><tr>\n";
  var keys = _.unique(_.flatten(data.map(Object.keys)));

  for (var key of keys) {
    result += "<th>" + key + "</th>\n";
  }
  result += "</tr></thead>\n<tbody>\n";

  for (let item of data) {
    result += "<tr>\n";
    for (let key of keys) {
      if (key in item) {
        // ?
        var className = getClassName(item[key]);
        if (typeof item[key] === "string") {
          result += '<td class="' + className + '">"' + item[key] + '"</td>\n';
        } else {
          result += '<td class="' + className + '">' + item[key] + "</td>\n";
        }
      } else {
        result += "<td></td>\n";
      }
    }
    result += "</tr>\n";
  }

  result += "</tbody>\n</table>";
  return result;
  function getClassName(val) {
    if (typeof val == "number") {
      return "number";
    } else if (typeof val === "string") {
      return "string";
    }
  }
}

// * 堆
class PriorityQueue {
  constructor(initialValues = []) {
    this.elements = initialValues.slice();
    this.heapify();
  }

  heapify() {}

  _swap(i, j) {
    var t = this.elements[i];
    this.elements[i] = this.elements[j];
    this.elements[j] = t;
  }

  // * 从某个位置(idx)开始向上调整, 适用于堆尾增加了一个元素时
  heapUp(currIdx) {
    if (currIdx > 0) {
      var pIdx = (currIdx - 1) >> 1;
      if (this.elements[currIdx] > this.elements[pIdx]) {
        this._swap(currIdx, pIdx);
      } else {
        return;
      }
      // * 递归调用
      this.heapUp(pIdx);
    }
  }

  // * 从某个位置(idx)开始向下调整, 适用于堆顶删除了一个元素时, 堆尾元素补在了堆顶
  heapDown(maxIdx) {
    if (idx < this.elements.length) {
      var currIdx = maxIdx;
      var lIdx = currIdx * 2 + 1;
      var rIdx = lIdx + 1;
      if (lIdx < this.elements.length && this.elements[lIdx] > this.e) {
        currIdx = lIdx;
      }
      if (rIdx < this.elements.length && this.elements[rIdx] > this.e) {
        currIdx = rIdx;
      }

      if (currIdx !== maxIdx) {
        this._swap(currIdx, maxIdx);
        // * 递归调用
        this.heapDown(maxIdx);
      }
    }
  }
  // * 删除并返回堆顶元素
  pop() {
    var result = this.elements[0];
    var last = this.elements.pop();
    if (this.elements.length === 0) {
      return result;
    } else {
      this.elements[0] = last;
    }

    // * 调整堆顶元素 heapUp
    var maxIdx = 0;
    while (currIdx < this.elements.length) {
      var currIdx = maxIdx;
      var lIdx = currIdx * 2 + 1;
      var rIdx = lIdx + 1;
      if (lIdx < this.elements.length && this.elements[lIdx] > this.e) {
        currIdx = lIdx;
      }
      if (rIdx < this.elements.length && this.elements[rIdx] > this.e) {
        currIdx = rIdx;
      }

      if (currIdx !== maxIdx) {
        this._swap(currIdx, maxIdx);
        maxIdx = currIdx;
      } else {
        break;
      }
    }

    return result;
  }

  // * 返回堆顶元素, 不删除
  peek() {}

  // * 向堆中添加一个元素
  push(val) {
    this.elements.push(val);
    // * 从堆中最后一个节点开始
    var currIdx = this.length - 1;

    while (currIdx > 0) {
      var pIdx = (currIdx - 1) >> 1;
      if (this.elements[currIdx] > this.elements[pIdx]) {
        this._swap(currIdx, pIdx);
      } else {
        return;
      }
      currIdx = pIdx;
    }
  }

  get size() {}
}

// * 堆排序: 由最大堆的顶部为最大值, 每次将堆的根节点取出, 重排剩余元素; 最后得到排序结果

class myHeap {
  constructor() {
    // * 以数组形式表示二叉树
    this.heap = [];
  }

  shift() {
    if (this.heap) {
      let head = this.heap[0];
      let last = this.heap.pop();
      if (this.heap.length === 0) {
        return head;
      } else {
        this.heap[0] = last;
      }

      let currIndex = this.heap[0];
      while (currIndex < this.heap.length) {
        maxIndex = currIndex;
        l_Index = currIndex * 2 + 1;
        r_Index = currIndex * 2 + 2;
        if (this.heap[l_Index] && this.heap[l_Index] > this.map[maxIndex]) {
          maxIndex = l_Index;
        }
        if (this.heap[r_Index] && this.heap[r_Index] > this.map[maxIndex]) {
          maxIndex = r_Index;
        }
        if (maxIndex !== currIndex) {
          swap(this.heap, currIndex, maxIndex);
          currIndex = maxIndex;
        } else {
          break;
        }
      }
      return this;
    }
  }

  push(val) {
    this.heap.push(val);

    let currIdx = this.heap.length - 1;
    while (currIdx > 0) {
      let minuIdx = currIdx;
      let f_Idx = (currIdx - 1) >> 1;

      if (this.heap[f_Idx] && this.heap[f_Idx] < this.heap[currIdx]) {
        minuIdx = f_Idx
      }

      if(minuIdx !== currIdx){
        swap(this.heap, currIdx, minuIdx)
        currIdx = minuIdx
      }
    }
    return this
  }

  swap(i, j) {
    var t = this.elements[i];
    this.elements[i] = this.elements[j];
    this.elements[j] = t;
  }
}
