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

  function createSnake() {
    var length = 5;
    snakeArray = [];
    for (var i = length - 1; i >= 0; i--) {
      snakeArray.push({x:i, y:0});
    }
  }

  function createFood() {
    food = {
      x: Math.round(Math.random()*(width-cellWidth)/cellWidth),
      y: Math.round(Math.random()*(height-cellWidth)/cellWidth),
    };
  }

  function design() {
    contex.fillStyle = "white";
    contex.fillRect(0, 0, width, height);
    contex.strokeStyle = "black";
    contex.strokeRect(0, 0, width, height);
    var directionX = snakeArray[0].x;
    var directionY = snakeArray[0].y;
    if(defaultDirection == "right") directionX++;
    else if(defaultDirection == "left") directionX--;
    else if(defaultDirection == "up") directionY--;
    else if(defaultDirection == "down") directionY++;

    if(directionX == -1 || directionX == width/cellWidth || directionY == -1 || directionY == height/cellWidth || checkCollision(directionX, directionY, snakeArray)) {
      init();
      return;
    }

    if(directionX == food.x && directionY == food.y) {
      var tail = {x: directionX, y: directionY};
      score++;
      createFood();
    } else {
      var tail = snakeArray.pop();
      tail.x = directionX; tail.y = directionY;
    }
    snakeArray.unshift(tail);
    for(var i = 0; i < snakeArray.length; i++) {
      var cell = snakeArray[i];
      paint_cell(cell.x, cell.y);
    }


  }

});