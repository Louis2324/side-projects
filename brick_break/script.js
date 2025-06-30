let board;
let width = 500;
let height = 500;
let context;

let player;
let playerVelocityX = 25;

let ball;
let ballVelocityX = 0;
let ballVelocityY = 1;

let blockArray = [];
let blockWidth = 50;
let blockHeight = 10;
let blockColumns = 8;
let blockRows = 3;
let blockMaxRows = 10;
let blockCount = 0;
let blockX = 15;
let blockY = 45;
const blockColors = [
"#e94560", "#2ecc71", "#3498db", "#9b59b6", "#f1c40f", "#1abc9c", "#e67e22", 
"#48dbfb", "#ff6b6b", "#ff9f43", "#00d2d3", "#f368e0", "#54a0ff", "#ff9ff3", 
"#00b894", "#feca57", "#5f27cd", "#ff4757", "#a4b0be", "#ffffff",
];

let scoreScreen = document.getElementById("score-screen");
let score = 0;
let lifeScreen = document.getElementById("life-screen");
let lives = ['💙', '💙', '💙'];
let gameStatsScreen = document.getElementById("game-stats");

let gameOver = false ,gameWon = false;
let highscore, wins, matches;

const endScreen = document.getElementById("end-screen");
const endMessage = document.querySelector("#end-screen p");
const resetBtn = document.getElementById("reset-game");


class Platform {
    constructor(x, y, width, height) {
        this.position = { x, y };
        this.height = height;
        this.width = width;
    }

    draw(context, color = "#3498db") { 
        context.fillStyle = color;
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

window.onload = function () {
    loadGameData();
    board = document.getElementById("board");
    lifeScreen.value = lives;
    board.height = height;
    board.width = width;
    context = board.getContext("2d");
    player = new Platform(board.width / 2 - 60, board.height - 20, 80, 10);
    ball = new Platform(board.width / 2 - 5, board.height / 2 - 5, 10, 10);
    createBlocks();
    requestAnimationFrame(update);
    document.addEventListener("keydown", movePlayer);
};

function update() {
    updateGameStats();
    saveGameData();
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);
    player.draw(context);
    ball.draw(context, "#e74c3c");
    moveBall(ball);
    
    for(let i = 0; i < blockArray.length; i++) {
        let block = blockArray[i];
        context.fillStyle = block.color;
        if(!block.break) {
            context.fillRect(block.x, block.y, block.width, block.height);
        }
    }
}

function movePlayer(e) {
    if (e.code === "ArrowLeft") {
        let nextPosition = player.position.x - playerVelocityX;
        if (!offScreen(nextPosition)) {
            player.position.x = nextPosition;
        }
    } else if (e.code === "ArrowRight") {
        let nextPosition = player.position.x + playerVelocityX;
        if (!offScreen(nextPosition)) {
            player.position.x = nextPosition;
        }
    }
}

function offScreen(nextX) {
    return nextX < 0 || nextX + player.width > width;
}

function moveBall(ball) {
    ball.position.y += ballVelocityY;
    ball.position.x += ballVelocityX;
    bounceBall();
}

function bounceBall() {
    if (ball.position.x <= 0 || ball.position.x + ball.width >= width) {
        ballVelocityX *= -1;
        playSound("./sounds/wallbounce.mp3");
    }
    if (ball.position.y <= 0) {
        ballVelocityY *= -1;
    }
    if (ball.position.y + ball.height >= height) {
        resetBall();
    }
    
    if (
        ball.position.y + ball.height >= player.position.y && 
        ball.position.x + ball.width >= player.position.x &&    
        ball.position.x <= player.position.x + player.width    
    ) {
        ballVelocityY *= -1;
        let hitPoint = (ball.position.x + ball.width / 2) - (player.position.x + player.width / 2);
        ballVelocityX = hitPoint * 0.3;
        playSound("./sounds/boing-101318.mp3");
    }

    for (let i = 0; i < blockArray.length; i++) {
        let block = blockArray[i];
        if (!block.break) {
            if (
                ball.position.x < block.x + block.width &&
                ball.position.x + ball.width > block.x &&
                ball.position.y < block.y + block.height &&
                ball.position.y + ball.height > block.y
            ) {
                context.fillStyle = block.color;
                ballVelocityX = 4;
                ballVelocityY = -2;
                ballVelocityY *= -1;
                score += 100;
                scoreScreen.value = `${score} 🌟`;
                block.break = true;
                blockArray.forEach(b=> b.color = blockColors[Math.floor(Math.random()*blockColors.length)]);
                playSound("./sounds/brick-break.mp3");
                blockCount--;
              
                if(blockCount === 0){
                    endGame("win");
                    return;
                }
                break;
            }
        }
    }
}

function resetBall() {
    if(lives.length > 0){
        ball.position.x = width / 2 - 5;
        ball.position.y = height / 2 - 5;
        setRandomBallDirection();
        lives.pop();
        lifeScreen.value = lives;
    }
    if(lives.length === 0){
        endGame("lose");
        return;
    }
}

function setRandomBallDirection() {
    let randomDirection = -1 * Math.floor(Math.random() * 5);
    ballVelocityX = Math.floor((Math.random() * 2 ) + randomDirection);
}

function createBlocks(){
    blockArray = [];
    for(let c = 0; c < blockColumns; c++){
        for(let r = 0; r < blockRows; r++){
            let block = {
                x: blockX + c * blockWidth + c * 10,
                y: blockY + r * blockHeight + r * 10,
                width: blockWidth,
                height: blockHeight,
                break: false,
                color: blockColors[Math.floor(Math.random()*blockColors.length)]
            };
            blockArray.push(block);
        }
    }
    blockCount = blockArray.length;
}

function endGame(state) {
    gameOver = true;
    if (state == "win") {
        endMessage.textContent = "You win 😁";
        playSound("./sounds/win.mp3");
        update = function () { };
        gameWon = true;
        updateGameStats();
        updateScreenStats();
    }
    if (state == "lose") {
        endMessage.textContent = "You lose 😭";
        playSound("./sounds/retro-laser-1-236669.mp3");
        update = function () { };
        gameWon = false;
        updateGameStats();
        updateScreenStats();
    }
    endScreen.classList.remove('hidden');
    board.classList.add("hidden");
    return;
}

resetBtn.addEventListener("click", function() {
    window.location.reload();
});

function playSound(path) {
    let sound = new Audio(path);
    sound.currentTime = 0;
    sound.play();
}

function saveGameData() {
    const gameData = {
        highscore: highscore,
        wins: wins,
        matches: matches
    };
    localStorage.setItem("gameData", JSON.stringify(gameData));
}

function loadGameData() {
    const savedData = localStorage.getItem("gameData");
    if(savedData) {
        const gameData = JSON.parse(savedData);
        highscore = gameData.highscore || 0;
        matches = gameData.matches || 0;
        wins = gameData.wins || 0;
    } else {
        highscore = 0;
        wins = 0;
        matches = 0;
    }
}

function updateGameStats() {
    if (gameOver) {
        matches += 1;  
        gameOver = false;  
    }
    if (score > highscore) {
        highscore = score;
    }
    if (gameWon) wins += 1;
    saveGameData();
}

function updateScreenStats() {
    loadGameData();
    const savedData = localStorage.getItem("gameData");
    if (savedData) {
        let gameData = JSON.parse(savedData);
 
        let highscoreElem = document.createElement("li");
        highscoreElem.textContent = `Your highscore is ${gameData.highscore}`;
        gameStatsScreen.appendChild(highscoreElem);
 
        let matchesElem = document.createElement("li");
        matchesElem.textContent = `Matches played: ${gameData.matches}`;
        gameStatsScreen.appendChild(matchesElem);
 
        let winsElem = document.createElement("li");
        winsElem.textContent = `Wins: ${gameData.wins}`;
        gameStatsScreen.appendChild(winsElem);
 
        let winRateElem = document.createElement("li");
        let winRateValue = gameData.matches > 0 ? (gameData.wins / gameData.matches) : 0;
        winRateElem.textContent = `Win rate: ${(winRateValue * 100).toFixed(2)}%`;
        gameStatsScreen.appendChild(winRateElem);
    }
}
