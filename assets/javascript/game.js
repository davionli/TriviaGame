//TODO: questions, options, correct answer in array
var quiz = [{question: "1+1=?", op_1: "1", op_2: "2", op_3: "3", op_4: "4", answer: "op_2"},
    {question: "1*1=?", op_1: "1", op_2: "2", op_3: "3", op_4: "4", answer: "op_1"},
    {question: "1-1=?", op_1: "1", op_2: "2", op_3: "3", op_4: "0", answer: "op_4"},
    {question: "1/1=?", op_1: "1", op_2: "2", op_3: "3", op_4: "4", answer: "op_1"}];
$(document).ready(function() {
    var quizNum = 0;
    var intervalId;
    var time = 0;
    var timeForEach = 30;
    var isTimerRunning = false;
//TODO: make the timer


//TODO: click START button
$("#start").on("click", function() {
    startTimer();
    nextQuestion();
});
//TODO: timer start countdown
function startTimer() {
    if (!isTimerRunning){
        intervalId = setInterval(countdown, 1000);
        isTimerRunning = true;
    }
}
function resetTimer() {
    isTimerRunning = false;
    time = 0;
    clearInterval(intervalId);
}
function countdown() {
    time++
    $("#timer").text(`Time Remaining: ${timeForEach-time} Seconds`);
}
//TODO: create question structure and timer
function nextQuestion() {
    $("#timer").text(`Time Remaining: ${timeForEach-time} Seconds`);
    $("#qst").text(quiz[quizNum].question);
    $("#op-1").text(quiz[quizNum].op_1);
    $("#op-2").text(quiz[quizNum].op_2);
    $("#op-3").text(quiz[quizNum].op_3);
    $("#op-4").text(quiz[quizNum].op_4);
    startTimer();
}
function next() {
    if (quizNum < quiz.length-1) {
        quizNum++;
        resetTimer();
        nextQuestion();
    } else {
        alert("done");
        resetTimer();
    }
}
$(".option").mouseenter(function() {
    $(this).css("background-color", "red");
}).mouseleave(function() {
    $(this).css("background-color", "white");
})

$(".option").on("click", function() {
    if($(this).attr("data-value") === quiz[quizNum].answer) {
        alert("right");
        next();
    } else {
        alert("wrong");
        next();
    }
})




});