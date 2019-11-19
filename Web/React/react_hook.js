import {rect} from './math'

// function hook(f){
//   hookStatck.push(f)
//   if(!)
// }


function useState(init){
  var val = init

  if(useStateCallIndex in currFuncStatArray){
    // 存在
    return [
      currFuncStatArray[useStateCallIndex],
      function setVal(val){
        currFuncStatArray[useStateCallIndex] = 
      }
    ]
  }else{

  }


  var setVal = function(val){
    currFuncStatArray[useStateCallIndex] = val
  }

  var val = init

  useStateCallIndex++
  return [val, setVal]

} 