const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let center = {};
let angle = 0;

function setUpCanvas(context) {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  context.fillStyle = "#2c4724";
  context.fillRect(0, 0, canvas.width, canvas.height);
  center.x = canvas.width / 2;
  center.y = canvas.height / 2;
}

window.addEventListener("resize", () => {
  setUpCanvas(ctx);
});

setUpCanvas(ctx);

function drawNucleus(context) {
  context.beginPath();
  context.arc(center.x, center.y, 20, 0, Math.PI * 2);
  context.fillStyle = "#FFE600";
  context.shadowColor = "#FFE600";
  context.shadowBlur = 15;
  context.fill();
  context.shadowBlur = 0;
  context.closePath();
}

function drawElectron(context, radius, angleOffset) {
  const x = center.x + radius * Math.cos(angle + angleOffset);
  const y = center.y + radius * Math.sin(angle + angleOffset);
  context.beginPath();
  context.arc(x, y, 5, 0, Math.PI * 2);
  context.fillStyle = "#FFE600";
  context.shadowColor = "#FFE600";
  context.shadowBlur = 10;
  context.fill();
  context.shadowBlur = 0;
  context.closePath();
}

function animate() {
  ctx.fillStyle = "#2c4724";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawNucleus(ctx);
  ctx.beginPath();
  ctx.arc(center.x, center.y, 100, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(255,255,255,0.1)";
  ctx.stroke();
  ctx.closePath();
  drawElectron(ctx, 100, 0);
  drawElectron(ctx, 100, Math.PI);
  angle += 0.02;
  requestAnimationFrame(animate);
}

animate();
