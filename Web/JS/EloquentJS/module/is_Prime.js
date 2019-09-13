// define(function(require, exports, module){
  var isPrime = function(n) {
    if (n < 2) {
      return false;
    }
  
    var sqrt_n = Math.floor(Math.sqrt(n));
  
    for (var i = 2; i <= sqrt_n; i++) {
      if (n % i == 0) {
        return false;
      }
    }
  
    return true;
  };
  
  module.exports = isPrime
// })

