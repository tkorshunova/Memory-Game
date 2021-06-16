
let gamePattern = [];
let userClickedPattern = [];

let buttonColours = ["green", "red", "yellow", "blue"];

let levelNumber = 1;
let start = true;

$(document).keydown(function() {
  if(start) {
  nextSequence();
  start = false;
}
})

function nextSequence() {
  userClickedPattern = [];
  $("h1").text("Level " + levelNumber);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];

  playSound(randomChosenColour);

  let selected = $("#" + randomChosenColour);

  selected.fadeOut(200);
  selected.fadeIn(200);

  gamePattern.push(randomChosenColour);
  levelNumber++

}

$("[type=button]").click( function() {
  let userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
})

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
     if (userClickedPattern.length === gamePattern.length){
       setTimeout(function () {
         nextSequence();
       }, 1000);
     }
  } else {
    $("h1").text("Game Over. Press Any Key to Start.");
    $("body").addClass("game-over");
    playSound("wrong")
    setTimeout(() => {$("body").removeClass("game-over")}, 100);

    startOver();
  }
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(() => {$("#" + currentColour).removeClass("pressed")}, 100);
}

function startOver() {
  levelNumber = 1;
  gamePattern = [];
  start = true;
}
