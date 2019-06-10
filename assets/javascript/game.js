//TODO: questions, options, correct answer in array
var quiz = [{question: "6 * 16 = ?", op_1: "86", op_2: "96", op_3: "106", op_4: "66", answer: "op_2"},
    {question: "Which one is NOT a prime number?", op_1: "1", op_2: "2", op_3: "3", op_4: "5", answer: "op_1"},
    {question: "587(10) to ???(2)", op_1: "1001001001", op_2: "1001101011", op_3: "1001001111", op_4: "1001001011", answer: "op_4"},
    {question: "How many cats do I have?", op_1: "0", op_2: "1", op_3: "2", op_4: "3", answer: "op_3"}];
    var correct = 0;
    var wrong = 0;
    var unsolved = 0;
    var quizNum = 0;
    var intervalId;
    var time = 0;
    var timeForEach = 3;
    var isTimerRunning = false;
    var isShowAnswer = false;
    var temp;
$(document).ready(function() {
//TODO: make the timer

function resetGame() {
    quizNum = 0;
    correct = 0;
    wrong = 0;
    unsolved = 0;
    $("#correct").text("");
    $("#wrong").text("");
    $("#unsolved").text("");
}
//TODO: click START button
$("#start").on("click", function() {
    $("#start").css("visibility", "hidden");
    startTimer(30);
    nextQuestion();
});
$("#start_over").on("click", function() {
    $("#start_over").css("visibility", "hidden");
    resetGame();
    startTimer(30);
    nextQuestion();
});
//TODO: timer start countdown
function startTimer(sec) {
    if (!isTimerRunning){
        intervalId = setInterval(function() {countdown(sec);}, 1000);
        isTimerRunning = true;
    }
}
function resetTimer() {
    isTimerRunning = false;
    time = 0;
    clearInterval(intervalId);
}
function countdown(sec) {
    time++
    $("#timer").text(`Time Remaining: ${sec-time} Seconds`);
    if (sec-time===0&&!isShowAnswer) {
        unsolved++;
        resetTimer();
        next();
    }else if (sec-time===0&&isShowAnswer) {
        isShowAnswer = false;
        $(temp).css("background-color", "transparent");
        resetTimer();
        next();
    }
}
function showResult() {
    $("#timer").text("");
    $("#qst").text("");
    $("#op-1").text("");
    $("#op-2").text("");
    $("#op-3").text("");
    $("#op-4").text("");
    $("#correct").text(`Correct: ${correct}`);
    $("#wrong").text(`Wrong: ${wrong}`);
    $("#unsolved").text(`Unsolved: ${unsolved}`);
    $("#start_over").css("visibility", "visible");
}
//TODO: create question structure and timer
function nextQuestion() {
    $("#timer").text(`Time Remaining: ${30-time} Seconds`);
    $("#qst").text(quiz[quizNum].question);
    $("#op-1").text(quiz[quizNum].op_1);
    $("#op-2").text(quiz[quizNum].op_2);
    $("#op-3").text(quiz[quizNum].op_3);
    $("#op-4").text(quiz[quizNum].op_4);
    startTimer(30);
}
function next() {
    if (quizNum < quiz.length-1) {
        quizNum++;
        resetTimer();
        nextQuestion();
    } else {
        showResult();
        resetTimer();
    }
}
function showAnswer(isCorrect) {
    temp = "#" + quiz[quizNum].answer.substr(0, 2) + "-" + quiz[quizNum].answer.substr(3);
    if (isCorrect) {
        $(temp).css("background-color", "green");
    }else {
        $(temp).css("background-color", "red");
    }
    resetTimer();
    isShowAnswer = true;
    startTimer(3);
}
$(".option").mouseenter(function() {
    if (!isShowAnswer)
        $(this).css("background-color", "lightblue");
}).mouseleave(function() {
    if (!isShowAnswer)
        $(this).css("background-color", "transparent");
})

$(".option").on("click", function() {
    if (!isShowAnswer) {
        $(this).css("background-color", "transparent");
        if($(this).attr("data-value") === quiz[quizNum].answer) {
            correct++;
            showAnswer(true);
        } else {
            wrong++;
            showAnswer(false);
        }
    }   
})





});