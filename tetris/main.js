import { GameObject } from './gameObjects.js';

const blockSize = 20,cols = 15,rows = 30;
const theme = new Audio("./gameSounds/tetris-theme-korobeiniki-rearranged-arr-for-strings-185592.mp3");
theme.loop = true;
theme.load()
theme.volume = 1;
let highscore = Number(localStorage.getItem('highscore')) || 0;


const TETROMINO_SHAPES = {
  I: [[1,1,1,1]],
  O: [[1,1],[1,1]],
  T: [[0,1,0],[1,1,1]],
  S: [[0,1,1],[1,1,0]],
  Z: [[1,1,0],[0,1,1]],
  J: [[1,0,0],[1,1,1]],
  L: [[0,0,1],[1,1,1]],
  B: [[0,0,0],[0,0,1]],
  C: [[1,1,1],[1,0,1]],
  F: [[1,1,1],[1,1,1]],
  LI:[[1,1,1,1,1,1]]
};

const TETROMINO_COLORS = {
  I:  "#5BC0EB",  
  O:  "#FDE74C",  
  T:  "#9D4EDD",  
  S:  "#00D26A",  
  Z:  "#F59F64",  
  J:  "#4F86F7",  
  L:  "#FFA630",  
  B:  "#CBAACB",  
  C:  "#FFB400",  
  F:  "#37474F",  
  LI: "#673AB7"   
};


let canvas, context,nextPieceCanvas, nextPieceContext,piece, grid,score = 0, nextPieceType = null,paused=false;

window.onload = () => {
  
  document.getElementById("pauseButton").addEventListener("click",togglePause);
  canvas = document.getElementById("gameCanvas");
  context = canvas.getContext("2d");
  nextPieceCanvas = document.getElementById("nextPieceCanvas");
  nextPieceContext = nextPieceCanvas.getContext("2d");
  canvas.width = cols * blockSize;
  canvas.height = rows * blockSize;
  grid = Array.from({ length: rows }, () => Array(cols).fill(false));
  nextPieceType = randomPieceType();
  spawnPiece();
  draw();

  document.addEventListener("keydown", (e) => {
    if(paused) return ;
    switch (e.key) {
      case "ArrowLeft":  piece.moveLeft(); break;
      case "ArrowRight": piece.moveRight(); break;
      case "ArrowDown":
        if (!piece.moveDown()) handlePieceLock();
        break;
      case "ArrowUp":    piece.rotate(); break;
    }
    draw();
  });

  setInterval(() => {
    if(paused) return;
    if (!piece.moveDown()) handlePieceLock();
    draw();
  }, 500);
};

function randomPieceType() {
  const types = Object.keys(TETROMINO_SHAPES);
  return types[Math.floor(Math.random() * types.length)];
}

function spawnPiece() {
  const currentType = nextPieceType; 
  piece = new GameObject(canvas, blockSize, context, currentType, grid, cols, rows);
  nextPieceType = randomPieceType(); 
  drawNextPiece();
  if (hasCollisionAtSpawn()) {
    alert("Game Over!");
    gameOver();
    resetGame();
  }
}

function handlePieceLock() {
  piece.lock();
  const fullRows = getFullRows();
  if (fullRows.length > 0) {
    clearRows(fullRows);
    updateScore(fullRows.length);
  }
  spawnPiece();
}

function getFullRows() {
  const fullRows = [];
  for (let row = 0; row < grid.length; row++) {
    if (grid[row].every(cell => cell)) {
      fullRows.push(row);
    }
  }
  return fullRows;
}

function clearRows(rowsToClear) {
  for (const rowIndex of rowsToClear) {
    grid.splice(rowIndex, 1);
    grid.unshift(new Array(cols).fill(false));
  }
}

function updateScore(linesCleared) {
  score += linesCleared * 100;
  document.getElementById("score").innerText = score;
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col]) {
        context.fillStyle = 'white';
        context.fillRect(col * blockSize, row * blockSize, blockSize, blockSize);
        context.strokeStyle = 'black';
        context.strokeRect(col * blockSize, row * blockSize, blockSize, blockSize);
      }
    }
  }

  piece.draw();
}

function hasCollisionAtSpawn() {
  return piece._collision(piece.matrix, piece.position.col, piece.position.row);
}

function resetGame() {
  grid = Array.from({ length: rows }, () => Array(cols).fill(false));
  score = 0;
  document.getElementById("score").innerText = score;
  nextPieceType = randomPieceType(); // Fresh start
  spawnPiece();
}

function drawNextPiece() {
  nextPieceContext.clearRect(0, 0, nextPieceCanvas.width, nextPieceCanvas.height);

  const matrix = TETROMINO_SHAPES[nextPieceType];
  const color = TETROMINO_COLORS[nextPieceType];

  const previewBlockSize = 20;
  const offsetX = (nextPieceCanvas.width - matrix[0].length * previewBlockSize) / 2;
  const offsetY = (nextPieceCanvas.height - matrix.length * previewBlockSize) / 2;

  nextPieceContext.fillStyle = color;
  nextPieceContext.strokeStyle = "black";

  matrix.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell) {
        const x = offsetX + colIndex * previewBlockSize;
        const y = offsetY + rowIndex * previewBlockSize;
        nextPieceContext.fillRect(x, y, previewBlockSize, previewBlockSize);
        nextPieceContext.strokeRect(x, y, previewBlockSize, previewBlockSize);
      }
    });
  });
}


function togglePause() {
  const pauseButton = document.getElementById("pauseButton");
  const pausedBanner = document.getElementById("pauseBanner");
  paused = !paused;
  if (paused) {
    pausedBanner.classList.remove("hidden");
    
    const highscoreDisplay = document.getElementById('highscoreDisplay');
    if (highscoreDisplay) {
      highscoreDisplay.innerText = `HIGH SCORE: ${highscore}`;
    }
  }
  else if(!paused){
    pausedBanner.classList.add("hidden");
  }
  pauseButton.innerText = paused ? "RESUME" : "PAUSE";
}

window.addEventListener("click",()=>{
  theme.play().catch(e=>console.log(e));
})

function gameOver() {
  if (score > highscore) {
    highscore = score;
    localStorage.setItem('highscore', highscore);
  }
}
