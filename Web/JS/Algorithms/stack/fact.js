//NOTE 使用Stack模拟递归; 计算数字阶乘
function Stack() {
    let items = [];
    this.push = (element) => {
        items.push(element);
    };
    this.pop = () => {
        return items.pop();
    };
    this.size = () => {
        return items.length;
    };
    this.peek = () => {
        return items[0];
    };
    this.isEmpty = () => {
        return items.length === 0;
    };
    this.print = () => {
        console.log(items.toString());
    };
}

//NOTE main
function fact(n) {
    var s = new Stack();
    while (n > 1) {
        //NOTE 将数字逐一减一压入栈中
        s.push(n--);
    }
    var product = 1;
    while (s.size() > 0) {
        product *= s.pop();
    }
    return product;
}

console.log(fact(5));
console.log(fact(20));

//NOTE 匹配括号

function rightBrackets(str) {
    let brackets = new Stack();
    let wrong = "";
    let bl = ["(", "[", "{"];
    let br = [")", "]", "}"];
    for (let i = 0; i < str.length; i++) {
        if (bl.indexOf(str[i]) > -1) {
            brackets.push(i);
            brackets.print();
        }
        if (br.indexOf(str[i]) > -1) {
            if (!brackets.isEmpty()) {
                let l = brackets.pop();
                let index = br.indexOf(str[i]);
                if (str[l] == bl[index]) {
                    continue;
                } else {
                    wrong += (i + ", ");
                }
            } else {
                wrong += (i + ", ");
            }
        }
    }
    while (!brackets.isEmpty()) {
        wrong += brackets.pop() + ", ";
    }
    console.log(`Wrong position are: ${wrong}`);
}

var str = "2.3 + 23/12 + (3.14 X 0.24";
var str2 = "5 + 14 ) - {56 + [12 + (34 + 13]}";
rightBrackets(str);
rightBrackets(str2);