function insert(root, val){
  let node = {
    val: val,
    left: null,
    right: null,
  }
  if(!root){
    return node
  }
  if(val > root.val){
    root.right = insert(root.right, val)
  }else{
    root.left = insert(root.left, val)
  }
  return root
}

var rootNode = null
rootNode = insert(rootNode,8)
rootNode = insert(rootNode,9)
rootNode = insert(rootNode,4)
rootNode = insert(rootNode,2)
for(let i=0; i< 20; i++){
  rootNode = insert(rootNode, Math.floor(Math.random()*11))
}
console.log(rootNode)

//  time: O(n * logN)
//  space: O(n)
function bstSort(ary){
  var root = ary.reduce(insert, null)

  k = 0
  // * 
  inOrderTraverse(root, val=>{
    ary[k++] = val
  })

  return ary
}

// * 中位排序
function inOrderTraverse(root, f){
  if(root){
    inOrderTraverse(root.right, f)
    f(root.val)
    inOrderTraverse(root.right, f)
  }
}

let ary = []
for(let i=0; i< 20; i++){
  ary.push(Math.floor(Math.random()*101))
}

// console.log(bstSort(ary))

// * 选择排序
// * time: O(n)
// * space: O(1)
function selectSort(ary){
  for(let i=0; i<ary.length-1; i++){
    let minPos = i
    for(let j=i+1; j<ary.length; j++){
      if(ary[minPos] >  ary[j]){
        minPos = j
      }
    }
    swap(ary, i, minPos)
  }
  return ary
}

console.log(ary)
console.log(selectSort(ary))

function swap(ary, i, j){
  if(ary[i] !== ary[j]){
    let temp = ary[i]
    ary[i] = ary[j]
    ary[j] = temp
  }
}

// * 插入排序 (数组 time: O(N ^２)) -> (改进 采用平衡二叉树, time: O(N*logN))
