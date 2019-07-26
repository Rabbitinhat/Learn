class myHeap {
  constructor(initialValues = []) {
    // * 以数组形式表示二叉树
    this.heap = initialValues.slice()
    this._heapify()

    // this.heap = []
    // for(let element of initialValues){
    //   this.heap.push(element)
    // }
  }
         
  _heapify() {
    // if(this.heap){
    // * 无法直接_heapDown调整堆, 无法确保一次heepDown之后, 元素在正确的位置 会直接跳出循环
    //   this._heapDown(0)
    //   return this
    // }



    // * 找到堆底部的一个父节点
    let currIdex = (this.heap.length - 2) >> 1 
    for(let i=currIdex; i >= 0; i--){
      this._heapDown(i)
    }
    return this
  }

  _heapUp(ary, currIdx, compare = (a, b) => a - b){
    if(currIdx > 0){
    let minuIdx = currIdx;
      let f_Idx = (currIdx - 1) >> 1;

      if (this.heap[f_Idx] && compare(this.heap[f_Idx], this.heap[currIdx]) < 0) {
        minuIdx = f_Idx
      }

      if(minuIdx !== currIdx){
        this._swap(currIdx, minuIdx)
        this._heapUp(minuIdx)
      }
    }
    return undefined
  }

  _heapDown(ary, currIndex, compare = (a, b) => a - b){
    if (currIndex < this.heap.length) {
      let maxIndex = currIndex;
      let l_Index = currIndex * 2 + 1;
      let r_Index = currIndex * 2 + 2;
      if (this.heap[l_Index] && compare(this.heap[l_Index], this.heap[maxIndex]) > 0) {
        maxIndex = l_Index;
      }
      if (this.heap[r_Index] && compare(this.heap[r_Index], this.map[maxIndex]) > 0) {
        maxIndex = r_Index;
      }
      if (maxIndex !== currIndex) {
        this._swap(currIndex, maxIndex);
        this._heapDown(maxIndex)
      }
    }
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
      this._heapDown(currIndex)
      return this
    }
  }

  push(val) {
    this.heap.push(val);

    let currIdx = this.heap.length - 1;
    this._heapUp(currIdx)
    return this
  }

  
  _swap(i, j) {
    var t = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = t;
  }
}

// let heap = new myHeap()
// console.log(heap.push(8))
// console.log(heap.push(5))
// console.log(heap.push(4))
// console.log(heap.push(2))
// console.log(heap.push(5))
// console.log(heap.push(8))
// console.log(heap.push(6))
// console.log(heap.push(3))
// console.log(heap.push(0))
// console.log(heap.push(8))

let heap2 = new myHeap([8, 5, 4, 2, 5, 8, 6, 3, 0, 8])
console.log("Heap2" + heap2.heap)


class Heap extends Array {
  constructor(compare = (a, b) => a - b, initialValues = []){
    super() // ? 调用父类
    this.compare = compare
  }

  // heapify(){
  //   let currIdx = (this.length - 1) >> 1
  //   for(let i=currIdx; i>0; i--){
  //     this.heapDown(i)
  //   }
  // }
  heapUp(index){
    let pre_Idx = (index - 1) >> 1
    if(this.compare(this[index], this[pre_Idx]) > 0) {
      this.swap(index, pre_Idx)
      this.push(pre_Idx)
    }
  }
  heapDown(index){
    let currIdx = index
    let r_Idx = index * 2 + 2
    let l_Idx = index * 2 + 1
    if(l_Idx < this.length && this.compare(this[l_Idx], this[currIdx]) > 0) currIdx = l_Idx
    if(r_Idx < this.length && this.compare(this[r_Idx], this[currIdx]) > 0) currIdx = r_Idx
    if(currIdx !== index){
      this.swap(currIdx, index)
      this.pop(currIdx)
    }
  }
  pop(){
    let result = this[0]
    super.pop()
    if(this.length > 0){
      let last = this[this.length - 1]
      this[0] = last
      this.heapDown(0)
    }
    return result
  }
  push(val){
    super.push(val)
    this.heapUp(this.length - 1)
  }
  swap(i, j){
    let temp = this[i]
    this[i] = this[j]
    this[i] = temp
  }
}

let heap = new Heap()
console.log(heap.push(8))
console.log(heap.push(5))
console.log(heap.push(4))
console.log(heap.push(2))
console.log(heap.push(5))
console.log(heap.push(8))
console.log(heap.push(6))
console.log(heap.push(3))
console.log(heap.push(0))
console.log(heap.push(8))
console.log(heap)

