const canvas = document.getElementById("my-canvas");
const ctx = canvas.getContext("2d");
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;

const drawCircle = () => {
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
};

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCircle();
  x += dx;
  y += dy;
};

setInterval(draw, 10);