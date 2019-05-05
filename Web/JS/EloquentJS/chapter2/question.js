/* C2 Q1 Loopinga Triangle */
let abc = "abc";
console.log(abc.length);

let s = "";
for(let i=0; i<7; i++){
  s += "#"
  console.log(s);
}

for(let line="#"; line.length<7; line+="#")
console.log(line);

/* Q2 FizzBuzz */
function fizzBuzz(){
  for(let i=1; i<101; i++){
    let output = "";
    if(i%3 === 0){
      output += "Fizz";
    }
    if(i%5 === 0){
      output += "Buzz";
    }
    console.log(output||i);
  }
}

fizzBuzz();

/* Q3 ChessBoard */
function chessBoard(size){
  
  for(let i=0; i<size; i++){
    let line = "";
    for(let j=0; j<size;j++){
      line += (i+j)%2==0? " " : "#";
    }
    console.log(line);
  }
}

chessBoard(8);
chessBoard(10);