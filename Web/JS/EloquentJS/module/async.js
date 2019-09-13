// 一次下载3张图片
function downloadOne(){
get(ary[i++], function (img){
  div.appendChild(img)
  downloadOne()
})
}



function asyncFilter(ary, filterFun, done){
  var result = []
  var count = 0

  for(let i=0; i<ary.length; i++){
    // 表示ary第i项是否保留
    filterFunc(ary[i], (retain) => {
      if(retain){
        result[i] = ary[i]
      }
      count++
      if(count === ary.length){
        // 去掉空位置
        var realResult = []
        for(var idx in result){
          realResult.push(result[idx])
        }
      }
    })
  }
}

function asyncEvery(ary, test, callback){
  var passCount = 0
  var called = false
  for(let i=0; i<ary.length; i++){
    test(ary[i], isPass => {
      if(isPass){
        passCount++
        if(passCount === ary.length){
          callback(true)
        }
      }else{
        if(!called){
          callback(false)
          called = true
        }      
      }
    })
  }
}

function asyncSome(ary, test, callback){
  var unPassCount = 0
  var called = false
  for(let i=0; i<ary.length; i++){
    test(ary[i], isPass => {
      if(isPass){

      }else{
        if(!called){
          callback(false)
          called = true
        }      
      }
    })
  }
}

