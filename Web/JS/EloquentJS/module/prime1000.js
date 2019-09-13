// define(function(require, exports, module){
  var isPrime = require('is_Prime.js')
  
  console.log('in 1000')
  for(let i=0; i<1000; i++){
    if(isPrime(i)){
      console.log(i)
    }
  }

// })
