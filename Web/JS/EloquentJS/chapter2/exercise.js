// Q1 Looping a triangle
var output = "#"
for(let i=0; i<7; i++){
  console.log(output)
  output += "#"
}
// Q2 FIZZBUZZ
for(let i=1; i<101; i++){
  var output = ""
  if(i % 3 === 0){
    output = "Fizz"
  }
  if(i % 5 === 0){
    output += "Buzz"
  }
  output === "" ? console.log(i) : console.log(output)

}

// Q3 Chessboard
for(let i=1; i<9; i++){
  var rows = ""
  for(let j=1; j<9; j++){
    rows += ((i + j) % 2 !== 0 ? "#" : " ")
  }
  console.log(rows)
}