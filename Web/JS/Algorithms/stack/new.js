// * Stack
function Stack(){
  this._top = null
  this._elementCount = 0
}

Stack.prototype = {
  pop(){
      if(this.top){
          var node = this.top
          this.top = this.top.next
          this._elementCount--
          return node
      }else{
          return undefined
      }
  },

  push(node){
      this._elementCount++
      if(this.top){
          
      }
  }
}

// // * Queue
// function QueueNode(val){
//   this._val = val,
//   this._next = null
// }

// function Queue(){
//   this._head = null,
//   this._tail = null,
//   this._elementCount = 0
// }

// Queue.prototype = {
//   remove(){
//     if(this._head){
//       this._elementCount--
//       let node = this._head
//       this._head = this._head.next
//       // * 当 queue 只有一个节点时
//       if(this._head === null) this._tail = null
//       return node.val
//     }else{
//       return undefined
//     }
//   },
//   add(val){
//     let node = new QueueNode()
//     this.elementCount++
//     if(this._head === null){
//       this._head = this._tail = node
//     }else{
//       this._tail.next = node
//       node.before = this._tail
//       this._tail = node
//     }
//   return this
//   }
// }

