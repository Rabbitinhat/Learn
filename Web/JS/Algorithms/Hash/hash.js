class HashMap {
  constructor() {
    this.values = new Array(97)

    // * 存储对应的key值, 用于解决冲突
    this.keys = new Array(97)
    // * 解决collision方法, 开放定址法 Opening addressing 线性探测(linear Probing)
    this.f = function(x){
      return x
    }

    // * 记录hash table中的已有数据数量
    this.cout = 0
  }

  // ! 4:26
  enlargeSpace(){
    // * 扩大表的长度
    var keys = this.keys
    var values = this.values

    var newSize = keys.length * 2


    this.keys = new Array(newSize)
    this.values = new Array(newSize)


    // * 将原先hash table中数据重新填入新的长度的table中
    for(var idx in keys){
      var key = keys[idx]
      var values = values[idx]
      this.set(key, values)
    }


  }

  /**
   *
   * @param {*} key string //=>'abc'
   */
  hash(key) {
    var weight = [4, 1, 9, 7, 3, 5, 17, 22, 88, 53, 37, 97, 71]

    let sum = 0

    for (let i = 0; i < key.length; i++) {
      // ? 计算整个key的总的字符*对应weight的值
      sum += key.charCodeAt(i) * weight[i]
    }
    // * 将hash后的值范围限制在[0, this.values.length-1]
    return sum % this.values.length
    // key.split('')
    // .map(it=>it.charCodeAt(0))
    // .map((code, idx)=>code*weight[idx])
    // .reduce((a, b) => a + b) % this.values.length
  }

  set(key, val) {
    var initIdx = this.hash(key)
    for (var x = 0; x < 5; x++) {
      // * 开放地址法 依次寻找idx+f(0)(idx), idx + f(1), ....
      var idx = (initIdx + this.f(x)) % this.keys.length
      if (idx in this.keys) {
        // * idx位置存在一个key
        // * idx位置的key值存在
        if (this.keys[idx] === key) {
          this.values[idx] = val
          break
        }
        // * 当前idx存储其他key值
        // * 寻找下一个可能
      } else {
        // * idx位置为空
        this.values[idx] = val
        this.keys[idx] = key
        // * 添加新数据, count + 1
        this.count++
        // * 判断table中的容量
        if(this.count / this.keys.length > 0.7){
          this.enlargeSpace()
        }
        break
      }
    }
  }

  // * 更改key值對應的value值
  setAt(key, f){
    
  }

  get(key) {
    var initIdx = this.hash(key)
    for (var x = 0; x < 5; x++) {
      // * 开放地址法 依次寻找idx+f(0)(idx), idx + f(1), ....
      var idx = (initIdx + this.f(x)) % this.keys.length
      if (idx in this.keys) {
        // * idx位置存在一个key
        // * idx位置的key值存在
        if (this.keys[idx] === key) {
          return this.values[idx]
        }
        // * 当前idx位置存储其他的key值
        // * 寻找下一个可能
      }
    }
  }

  delete() {
    var initIdx = this.hash(key)
    for (var x = 0; x < 5; x++) {
      // * 开放地址法 依次寻找idx+f(0)(idx), idx + f(1), ....
      var idx = (initIdx + this.f(x)) % this.keys.length
      if (idx in this.keys) {
        // * idx位置存在一个key
        // * idx位置的key值存在
        if (this.keys[idx] === key) {
          delete this.keys[idx]
          delete this.values[idx]
          break
        }
        // * 当前key值存储别的index值
        // * 寻找下一个可能
      }
    }
  }
}

  // * review 链表添加, 移除节点
  class myHashTable{
    constructor(){
      this.values = new Array(97)
      this.count = 0
      this.size = 0
    }
  
    hash(key){
      let weight = [4, 1, 9, 7, 3, 5, 17, 22, 88, 53, 37, 97, 71]
      let sum = 0
      for(let i=0; i<key.length; i++){
        sum += key[i].charCodeAt() * weight[i % weight.length]
      }
  
      return sum % this.values.length
    }
  
    set(key, val){
      let initIdx = this.hash(key)
      let node = {
        key: key,
        val: val,
        next: null
      }
  
      if(initIdx in this.values){
        let currlist = this.values[initIdx]
        // * 否则遍历currlist至倒数第一个节点
        while(currlist.next){
          if(currlist.key === key){
            currlist.val = val
            return this
          }
          currlist = currlist.next
        }
        // * 如果当前节点key为key, 则修改val属性值
        if(currlist.key === key){
          currlist.val = val
        }else{
          // * 否则将next指向新节点
          // ? this.count++
          currlist.next = node
          this.count++
        }
        return this
      }else{
        this.values[initIdx] = node
        this.count++ 
        this.size++
      }
      return this
    }
  
    get(key){
      let initIdx = this.hash(key)
      if(initIdx in this.values){
        let currlist = this.values[initIdx]
        while(currlist){
          if(currlist.key === key){
            return currlist.val
          }
          currlist = currlist.next
        }
      }
    }
  
    delete(key){
      let initIdx = this.hash(key)
      if(initIdx in this.values){
        this.count--
        let currlist = this.values[initIdx]
        let prevnode = currlist
        while(currlist){
          if(currlist.key === key){
            // * 当当前位置的头节点就为要删除节点
            if(prevnode === currlist){
              if(currlist.next){
                // * 如果头节点后还有其他节点, 当前位置就为之后节点
                this.values[initIdx] = currlist.next
              }else{
                // * 如果当前位置只有一个节点, 直接删除该位置的节点
                delete this.values[initIdx]
                this.size--
              }
            }else{
              // * 不是头节点, 则从链表中删除当前节点
              prevnode.next = prevnode.next.next
            }
          }
          // * 将当前节点赋值给保存上一节点的变量prev
          prevnode = currlist
          currlist = currlist.next
        }
      }
    }
  }


