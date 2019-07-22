class myHeap {
  constructor(initialValues = []) {
    // * 以数组形式表示二叉树
    this.heap = initialValues.slice()
    this._heapify()
  }

  _heapify() {
    if(this.heap){
      // * 无法直接_heapDown调整堆, 如果当root节点值大于其左右节点,会直接跳出循环
      this._heapDown(0)
      return this
    }
  }

  _heapUp(currIdx){
    if(currIdx > 0){
    let minuIdx = currIdx;
      let f_Idx = (currIdx - 1) >> 1;

      if (this.heap[f_Idx] && this.heap[f_Idx] < this.heap[currIdx]) {
        minuIdx = f_Idx
      }

      if(minuIdx !== currIdx){
        this._swap(currIdx, minuIdx)
        this._heapUp(minuIdx)
      }
    }
    return undefined
  }

  _heapDown(currIndex){
    if (currIndex < this.heap.length) {
      let maxIndex = currIndex;
      let l_Index = currIndex * 2 + 1;
      let r_Index = currIndex * 2 + 2;
      if (this.heap[l_Index] && this.heap[l_Index] > this.heap[maxIndex]) {
        maxIndex = l_Index;
      }
      if (this.heap[r_Index] && this.heap[r_Index] > this.heap[maxIndex]) {
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

let heap = new myHeap()
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

let heap2 = new myHeap([8, 5, 4, 2, 5, 8, 6, 3, 0, 8])
console.log("Heap2" + heap2.heap)
