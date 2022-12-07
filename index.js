const canvas = document.getElementById("my-canvas");
const ctx = canvas.getContext("2d");
let ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = canvas.width / 2;
let rightPressed = false;
let leftPressed = false;

const drawCircle = () => {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
};

const drawRect = () => {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

const keyDownHandler = (e) => {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = true
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = true
  }
}

const keyUpHandler = (e) => {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = false
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = false
  }
}

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCircle();
  drawRect();
  if (y + dy > canvas.height - ballRadius || y + dy < 0 + ballRadius) {
    dy = -dy;
  }
  if (x + dx > canvas.width - ballRadius || x + dx < 0 + ballRadius) {
    dx = -dx;
  }
  if (rightPressed) {
    paddleX = Math.min(paddleX + 7, canvas.width - paddleWidth);
  } else if (leftPressed) {
    paddleX = Math.max(paddleX - 7, 0)
  }
  x += dx;
  y += dy;
};

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);
setInterval(draw, 10);
