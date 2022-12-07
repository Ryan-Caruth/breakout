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
let brickRowCount = 3
let brickColumnCount = 3;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 2;
let brickOffsetTop = 40;
let brickOffsetLeft = 3;
let score = 0;
let lives = 3;


let bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = {x: 0, y: 0, status: 1}
  }
}

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

const drawBricks = () => {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status === 1) {
        const brickX = c * (brickWidth * brickPadding) + brickOffsetLeft;
        const brickY = r * (brickHeight * brickPadding) + brickOffsetTop
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

const mouseMoveHandler = (e) => {
  const movementX = e.clientX - canvas.offsetLeft
  if (movementX > 0 && movementX < canvas.width) {
    paddleX = movementX - paddleWidth / 2;
  }
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

const collisionDetection = () => {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      const b = bricks[c][r];
      if (b.status === 1) {
        if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
          dy = -dy;
          b.status = 0;
          score++
          if (score === brickRowCount * brickColumnCount) {
            alert("You win!!")
            document.location.reload();
          }
        }
      }
    }
  }
}

const drawScore = () => {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText(`Score is: ${score}`, 8, 20)
}

const drawLives = () => {
    ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20)
}


const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCircle();
  drawRect();
  collisionDetection();
  drawBricks();
  drawScore();
  drawLives();
  if (y + dy < 0 + ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy
    } else {
      lives--;
      if (!lives) {
        alert("Game Over");
        document.location.reload();
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 3;
        dy = -3;
        paddleX = (canvas.width - paddleWidth) / 2
      }
    }
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
  setTimeout(() => {
    requestAnimationFrame(draw);
  }, 10)
};

document.addEventListener("mousemove", mouseMoveHandler)
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

draw();