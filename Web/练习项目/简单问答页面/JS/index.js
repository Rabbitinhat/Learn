

var allQuestions = [
    {
        //1
        question: "They went to the Town Hall on Wedensday evening, They went __ .",
        choices: [
            "the evening",
            "on the evening",
            "evening",
            "in the evening"
        ],
        correctAnswer: 3,
    },
    {
        //2
        question: "The people __ under the Town Hall clock.",
        choices: [
            "were",
            "was",
            "is",
            "be"
        ],
        correctAnswer: 0,
    },
    {
        //3
        question: "___ will it strike ? In twenty minutes' time.",
        choices: [
            "When",
            "How long",
            "How long ago",
            "How much"
        ],
        correctAnswer: 1,
    },
    {
        //4
        question: "What time did it stop? __ five to twelve.",
        choices: [
            "On",
            "At",
            "In",
            "During"
        ],
        correctAnswer: 1,
    },
    {
        //5
        question: "Did __ happen? No, nothing happened.",
        choices: [
            "nothing",
            "anything",
            "any",
            "a thing"
        ],
        correctAnswer: 1,
    },
    {
        //6
        question: "How many times did the clock ___ ?",
        choices: [
            "hit",
            "beat",
            "knock",
            "strike"
        ],
        correctAnswer: 3,
    },
    {
        //7
        question: "It was fifteen minutes __ eleven.",
        choices: [
            "pass",
            "past",
            "passed",
            "pasted"
        ],
        correctAnswer: 2,
    },
    {
        //8
        question: "A clock usually has two hands, a minute hand and __ hand.",
        choices: [
            "a second",
            "an hour",
            "a time",
            "a big"
        ],
        correctAnswer: 0,
    },
    {
        //9
        question: "Most people wear or carry __ .",
        choices: [
            "an alarm clock",
            "an alarm",
            "a clock",
            "a watch"
        ],
        correctAnswer: 3,
    },
    {
        //10
        question: "It refuesd to welcome the New Year. It __ .",
        choices: [
            "denied it",
            "wanted to",
            "didn't want to",
            "wished to"
        ],
        correctAnswer: 2,
    }

];


/* 实现交互
* 用数组保存问题数据
* 使用数组保存答案数据

* 监听click事件获得选择的答案
* 更新页面内容
* 显示正确答案数量

进阶
* 客户端验证, 回答当前问题才能进入下个问题
* 添加“Back”按钮，允许用户返回修改答案。最多可以返回到第一个问题.
* 注意对于用户回答过的问题，选择按钮要显示被选中。这样用户就无需重新回答已经答过的问题。
*/

//Variable

//添加一个数组, 保存用户的答案
var userAns = [];
var isClick = false;
//问题显示交互

//获取DOM对象
var answerPage = document.getElementById("answerPage");
console.log(answerPage);
var next = document.getElementById("next");
var back = document.getElementById("back");
var ques = document.getElementById("ques");
var choices = document.getElementById("answer").getElementsByTagName("a");

//动态添加文字
function makeQ(i) {
    ques.innerHTML = allQuestions[i].question;
    var allchoices = allQuestions[i].choices;
    if (choices.length !== allchoices.length) {
        console.log("The choices number shoud be 4");        
        return false;
    }
    for (var i = 0, len = choices.length; i < len; i++) {
        choices[i].innerHTML = allchoices[i];
    }
}

//Function

/* 添加类函数(要添加类名的DOM对象, 要添加的类名)
* 若传入对象类名为空, 直接添加
* 否则将传入的类名追加到className属性末尾
*/
function addClass(obj, str) {
    if (obj.className === "") {
        obj.className = str;
    } else {
        var old = obj.className;
        if (old.indexOf(str) === -1) {
            old += ", " + str;
            obj.className = old;
        }
    }
}

function judgeMent(num, index){
    console.log(index);
    console.log(num);
    console.log(allQuestions[index].correctAnswer)
    if (num === allQuestions[index].correctAnswer) {
        addClass(choices[num], "right");
    } else {
        addClass(choices[num], "wrong");
    }
}
//DOM
function qA() {
    var index = 0;
    //back按钮点击事件
    back.onclick = function(){
        index--;
        if(index < 0){
            return false;
        }
        for(var i=0, len=choices.length; i<len; i++){
            choices[i].className = "";
        }
        makeQ(index);
        console.log("press back button"); 
        judgeMent(userAns[index], index);
         
        return false;    
    }
    //next 按钮点击事件
    next.onclick = function () {
        index++;
        //添加标签判断是否点击选项
        isClick = false;
        if (index > 9) {
            answerPage.innerHTML = "None Answers";
/*             var button = document.createElement("a");
            button.innerHTML = "NEXT";
            button.id = "back";
            answerPage.appendChild(button);
            return false; */
        }

        //移除之前按钮选择的样式
        //isNull变量通过判断选项是否添加类名(wrong, right)来判断选项是否被点击
        var isNull = true;
        for (var i = 0, len = choices.length; i < len; i++) {
            if(choices[i].className !== ""){
                isNull = false;
                choices[i].className = "";
            }
        }
        //如果选项未被点击, 则不填加Next的click事件处理程序, 直接返回
        if(isNull == true){
            return false;
        }
        makeQ(index);
        console.log("press next button");
        return false;
    }

    //选项点击事件
    for (var i = 0, len = choices.length; i < len; i++) {
        choices[i].onclick = function (num) {
            //闭包
            return function () {
                //根据isClick的状态判断是否添加点击事件处理程序
                if(isClick === true){
                    return false;
                }
                
                userAns.push(num);
                judgeMent(num, index);
                isClick = true;
                return false;
            }
        }(i);
    }

}

window.onload = function () {
    
    makeQ(0);
    qA();
}