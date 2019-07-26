// * Retry


class InputError extends Error {
  constructor(message){
    super(message)
  }

  get name(){
    return "InputError"
  }
}


function primitiveMultiply(a, b){
  // * Math.round(Math.random())
  // * Math.random() > .5
  if(Math.floor(Math.random() * 2)){
    return a * b
  }else{
    throw new InputError("Bad Lucky")
  }
}



function MultiplicatorUnitFailure(a, b){
  while(1){
    try{
      primitiveMultiply(a, b)
      break
    }catch(e){
      // * 判断error种类
      if(e instanceof InputError){
        return MultiplicatorUnitFailure(a, b)
      }else{
        throw e
      }
    }
  }
}

// * answer
function MultiplicatorUnitFailure() {
  this.message = ""
  // * err.stack
  this.stack = (new Error()).stack
}
MultiplicatorUnitFailure.prototype = Object.create(Error.prototype)
MultiplicatorUnitFailure.prototype.name = "MultiplicatorUnitFailure"


function primitiveMultiply(a, b) {
  if (Math.random() < 0.5)
    return a * b;
  else
    throw new MultiplicatorUnitFailure();
}

// * 断线重连
function reliableMultiply(a, b) {
  // Your code here.
    while(1){
    try{
      primitiveMultiply(a, b)
      break
    }catch(e){
      // * 判断error种类
      if(e instanceof MultiplicatorUnitFailure){
        return reliableMultiply(a, b)
      }else{
        throw e
      }
    }
  }
}

console.log(reliableMultiply(8, 8));
// → 64

// function primitiveMultiply2(a, b){
//   if(Math.round(Math.random() * 1)){
//     return a * b
//   }else{
//     return null
//   }
// }

// function chance(f, n){
//   let sum = 0
//   for(let i = 0; i<n; i++){
//     let a = Math.floor(Math.random() * 101)
//     let b = Math.floor(Math.random() * 101)
//     if(f(a, b) !== null){
//       sum++
//     }
//   }
//   return (sum / n).toFixed(2)
// }

// console.log(chance(primitiveMultiply2, 100))
MultiplicatorUnitFailure(12, 23)

+// * locked box

function withBoxUnlocked(body) {
  // Your code here.
  // * 打开操作
  box.unlock
  try{
  	box()
  }catch(e){
    console.log("Error: " + err.message)
  }finally{
  // * 关闭操作
  box.lock()
  return true
  }
}

withBoxUnlocked(function() {
  box.content.push("gold piece");
});

try {
  withBoxUnlocked(function() {
    throw new Error("Pirates on the horizon! Abort!");
  });
} catch (e) {
  console.log("Error raised:", e);
}
console.log(box.locked);
// → true
