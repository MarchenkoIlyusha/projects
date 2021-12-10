const canvas=document.getElementById("game")
const ctx = canvas.getContext("2d")
const ground = new Image();
ground.src = "img/field.png";

var audio = new Audio( "sound/eatingsound.mp3");
var audioend = new Audio( "sound/endsound.mp3");

let endSound = new Audio();
endSound.src = "sound/endsound.mp3"

let eatingSound = new Audio();
eatingSound.src = "sound/eatingsound.mp3"

const endGame = new Image();
endGame.src = "img/endgame.png"

const foodImg = new Image();
foodImg.src = "img/food.png"

const cat = new Image();
cat.src = "img/cat.png"

const body = new Image();
body.src = "img/body.png"

let box = 40;

let score = 0;

let food = {
  x: Math.floor ((Math.random() * 17 + 1)) * box,
  y: Math.floor ((Math.random() * 17 + 1)) * box,


};

let snake = [];
snake[0] = {
  x: 9 * box,
  y: 9 * box
};

document.addEventListener("keydown", direction);

let dir;
let steps = false;

function direction(event) {

  if (steps == true) {
    if (event.keyCode == 37 && dir != "right") {
      dir = "left";
      steps = false;
    } else if (event.keyCode == 38 && dir != "down") {
      dir = "up";
      steps = false;
    } else if (event.keyCode == 39 && dir != "left") {
      dir = "right";
      steps = false;
    } else if (event.keyCode == 40 && dir != "up") {
      dir = "down";
      steps = false;
    } else if (event.keyCode == 32)
      window.location.reload()
      steps = false
  }
}




function eatTail(head, arr) {
  for( let i = 0; i < arr.length; i++) {
  if(head.x == arr[i].x && head.y == arr[i].y )
    audioend.play(),
        ctx.drawImage(endGame, 7 * box, 7 * box),
  clearInterval(game),
    steps = true;

  }
}

function drawGame() {

  ctx.drawImage(ground, 0, 0);
  ctx.drawImage(foodImg, food.x, food.y)

  for(let i = 0; i < snake.length; i++) {
    ctx.drawImage(cat, snake[0].x, snake[0].y );
    steps = true;
   if (i != 0)
    ctx.drawImage(body, snake[i].x, snake[i].y )


  }

  ctx.fillStyle = "blue";
  ctx.font = "35px Arial";
  ctx.fillText(String(score), box * 3.5, box * 18.8)

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if(snakeX == food.x && snakeY == food.y) {
    score++;
    audio.play();
    food = {
      x: Math.floor ((Math.random() * 17 + 1)) * box,
      y: Math.floor ((Math.random() * 17 + 1)) * box,
    };
    food != snake

  } else {
    snake.pop();
  }

  if(dir == "left") {
    snakeX -= box;
  } else if(dir == "right") {
    snakeX += box;
  } else if(dir == "up") {
    snakeY -= box;
  } else if(dir == "down") {
    snakeY += box;
  }

  if(snakeX < 1) snakeX = 17 * box;
  if(snakeX > box * 17) snakeX = box * 1;
  if(snakeY < box) snakeY = box * 17;
  if(snakeY > box * 17) snakeY = box * 1;

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  eatTail(newHead, snake);

  snake.unshift(newHead);
}
let game = setInterval(drawGame, 95)

