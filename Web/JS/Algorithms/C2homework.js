//NOTE 记录学生对象,添加成绩,显示平均成绩
function Student(){
    this.grades = [];
    this.add = add;
    this.average = average;
}

function add(gra){
    this.grades.push(gra);
}

function average(){
    var total = 0.0;
    for(var i=0; i<this.grades.length; i++){
        total += this.grades[i];
    }
    //NOTE 保留小数点后两位
    return ((total/this.grades.length).toFixed(2));
}

var student = new Student();
student.add(50);
student.add(67);
student.add(88);
student.add(45);
student.add(22);

console.log(student.average());

//NOTE 储存单词在数组中,并以正序,倒序显示单词
var words = [];
words.push("document");
console.log(words);
words.push("unified");
words.push("consitutution");
words.unshift("superme");
words.unshift("delegate");
words.unshift("wealthy");

console.log(words.sort());
console.log(words.reverse());

//NOTE 修改weeklyTemps对象 存储月数据
function matrix(numrows){
    var end = [];
    for(let i=0; i<numrows; i++){
        end[i] = [];
    }
    return end;
}
function MonthTemps(){
    this.dataStore = matrix(4);
    this.add = add;
    this.monthaverage = monthaverage;
    this.oneweek = oneweek;
    this.allweek = allweek;
}

function add(temp){
    for(let i=0; i<this.dataStore.length; i++){
        if(this.dataStore[i].length < 7){
            this.dataStore[i].push(temp);
        }
    }
}

function monthaverage(){
    var total = 0.0, count = 0;
    for(let i=0; i<this.dataStore.length; i++){
        for(let j=0; j<this.dataStore[i].length; j++){
            total += this.dataStore[i][j];
            count++;
        }
    }
    return (total/count).toFixed(2);
}

function oneweek(num){
    var total = 0.0
    for(let i=0; i<this.dataStore[num-1].length; i++){
        total += this.dataStore[num-1][i];
    }
    return (total / this.dataStore[num-1].length).toFixed(2);
}

function allweek(){
    var weektemp = [];
    for(let i=0; i < this.dataStore.length; i++){
        var total = 0.0;
        for(let j=0; j < this.dataStore[i].length; j++){
            total += this.dataStore[i][j];
        }
        weektemp.push((total/this.dataStore[i].length).toFixed(2));
    }
    return weektemp;
}

var monthtemps = new MonthTemps();
for(let i=0; i<28; i++){
    monthtemps.add(Math.random() * 51);
}
console.log(monthtemps);

console.log(monthtemps.monthaverage());
console.log(monthtemps.allweek());
console.log(monthtemps.oneweek(2));

//NOTE 字母组成单词
function GetWords(){
    this.words = [];
    this.getchar = getchar;
    this.getwords = getwords;
}

function getchar(str){
    //NOTE split 参数为"", 会分割string返回单字符数组
    this.words = str.split("");
}

function getwords(){
    return this.words.join("");
}

var word = new GetWords();
word.getchar("better");
console.log(word.words);
console.log(word.getwords());