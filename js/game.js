$(document).ready(function() {
  var canvas = $("#canvas")[0];
  var contex = canvas.getContext("2d");
  var width = $("#canvas").width();
  var height = $("#canvas").height();
  var cellWidth = 10;
  var defaultDirection;
  var food;
  var score;
  var snakeArray;

  function init() {
    defaultDirection = "right";
    createSnake();
    createFood();
    score = 0;
    if(typeof gameLoop != "undefined") clearInterval(gameLoop);
    gameLoop = setInterval(paint, 60);
  }
  init();
});