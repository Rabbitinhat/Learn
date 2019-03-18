//NOTE JS数字计算
var x = 3;
var y = 1.1;
console.log(x + y);
console.log(x * y);
console.log((x + y)*(x - y));
var z = 9;
console.log(Math.sqrt(z));
console.log(Math.abs(z));

//NOTE 使用递归
function factorial(number){
    if(number == 1){
        return number;
    }
    else {
        return number * factorial(number - 1);
    }
}
console.log(factorial(5));

//NOTE 定义和使用Checking对象

function Checking(amount){
    this.balance = amount;
    this.deposit = deposit;
    this.withdraw = withdraw;
    this.toString = toString;
}

function deposit(amount){
    this.balance += amount;
}

function withdraw(amount){
    if(amount <= this.balance){
        this.balance -= amount;
    }
    if(amount > this.balance){
        console.log("Insufficient funds");
    }
}

function toString(){
    return "Balance: " + this.balance;
}

var account = new Checking(500);
account.deposit(1000);
console.log(account.toString());
account.withdraw(750);
console.log(account.toString());
account.withdraw(800);
console.log(account.toString());