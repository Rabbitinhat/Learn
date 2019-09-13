// factor
function factor(num){
  for(let i=0; i*i <= num; i++){
    if(num % i === 0){
      console.log(i)
      console.log(num / i)
    }
  }
}

var fs = require('fs')
fs.readFile('./node.md', (err, data) => {
  console.log(data)
})

factor(process.argv[2] || 100)
console.log(process.argv[2])