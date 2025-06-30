const fruits = ['🥭','🍒','🫐','🍌','🍇','🍊','🥝','🍐','🥭','🍒','🫐','🍌','🍇','🍊','🥝','🍐'];
const buttons = document.querySelectorAll(".cards");
let cardOne, cardTwo;
let clickCount = 0;
let locked = false;
let gameArray = [];
let totalPairs = 8 , currentPairs = 0;
let temp ='';

const startBtn = document.getElementById("start-btn");
const userInput = document.getElementById("pairs"); 

startBtn.addEventListener("click", function () {

    const gameInfo = document.querySelector(".game-info");
    const gameArea = document.querySelector("#container");
    gameInfo.classList.add("hide");
    gameArea.classList.remove("hide");


    let inputValues = userInput.value.trim();
    if (inputValues === "") {
        gameArray = shuffleCards(fruits); 
    } else {
        let items = inputValues.split(",").map(item => item.trim());
        if (items.length < 8) {
            alert("Please enter at least 8 unique items separated by commas.");
            return;
        }
        gameArray = shuffleCards([...items, ...items]);
    }


    buttons.forEach((button, index) => {
        button.textContent = "?";
        button.dataset.card = gameArray[index];
    });


    startTimer();
});

buttons.forEach((button) => {
    button.addEventListener("click", function (event,index) {
        if (locked || event.target.textContent !== "?") return;
        flip(event.target);
    });
});

function flip(target) {
    
    target.classList.add("flip");
    setTimeout(() => {
        target.textContent = target.dataset.card;
        playAudio('./Game Sounds/flip.mp3');
    }, 900);

    if (clickCount === 0) {
        cardOne = target;
        clickCount++;
    } else {
        cardTwo = target;
        clickCount--;
        locked = true;

        setTimeout(() => {
            handleMatch(cardOne, cardTwo);
            unflippedCards  = [...buttons].filter(button => button.textContent === "?");
            temp = "";
        }, 1000);
    }
}

function handleMatch(cardOne, cardTwo) {
    if (cardOne.textContent === cardTwo.textContent) {
        cardOne.classList.add("match");
        cardTwo.classList.add("match");
        cardOne.disabled = true;
        cardTwo.disabled = true;
        currentPairs += 1;
    } else {
        cardOne.classList.add("mismatch");
        cardTwo.classList.add("mismatch");
        playAudio("./Game Sounds/win2.mp3")

        setTimeout(() => {
            cardOne.classList.remove("flip");
            cardTwo.classList.remove("flip");
            cardOne.classList.remove("mismatch");
            cardTwo.classList.remove("mismatch");

            setTimeout(() => {
                cardOne.classList.add("reverseFlip");
                cardTwo.classList.add("reverseFlip");
            }, 500);

            setTimeout(() => {
                cardTwo.textContent = "?";
                cardOne.textContent = "?";
            }, 1100);

        }, 1000);
    }
    setTimeout(() => {
        locked = false;
    }, 1000);
}

function shuffleCards(cardsArray) {
    let cards = [...cardsArray];
    for (let i = cards.length - 1; i > 0; i--) {
        let random = Math.floor(Math.random() * (i + 1));
        let temp = cards[i];
        cards[i] = cards[random];
        cards[random] = temp;
    }
    return cards;
}

let keepGoing = true;
const timerScreen = document.getElementById("timerscreen");
let seconds = 200; 
let timerInterval;

function startTimer() {
    timerScreen.value = seconds;
    timerInterval = setInterval(() => {
        if (seconds > 0) {
            seconds--;
            timerScreen.value = seconds;
            handleWinOrLoss();
        } else {
            clearInterval(timerInterval);
        }
    }, 1001);
}

function handleWinOrLoss(){
    
        if (seconds === 0) {
            if (currentPairs === totalPairs){
                playAudio("./Game Sounds/win1.mp3");
                buttons.forEach(button => {
                    button.classList.add("win");
                });
                timerScreen.value = "You win";
                clearInterval(timerInterval);
                 setTimeout(()=>{
                    HandleEnd();},3000);

            } else {
                playAudio("./Game Sounds/low-time sound.mp3");
                buttons.forEach(button => {
                    button.classList.add("lose");
                });

                timerScreen.value = "You lose";
                clearInterval(timerInterval);
                 setTimeout(()=>{
                    HandleEnd();},3000)

            }
        } 

        else if ( seconds > 0){
            if(currentPairs === totalPairs ){
                buttons.forEach(button => {
                    button.classList.add("win");
                });
                timerScreen.value = "You win";
                clearInterval(timerInterval);
                 setTimeout(()=>{
                    playAudio("./Game Sounds/win1.mp3");
                    HandleEnd();},3000)

            }
        }

     
    }
    
    function HandleEnd() {
        const gameArea = document.querySelector("#container");
        gameArea.classList.add("hide");
    
      
        let endBtn = document.createElement("button");
        endBtn.classList.add("reset-game");
        endBtn.textContent = "Try Again?";
        document.body.appendChild(endBtn);
    
    
        endBtn.addEventListener("click", function () {
            
            seconds = 200; 
            currentPairs = 0; 
            timerScreen.value = seconds; 
            clearInterval(timerInterval);
            let gameArray2 = shuffleCards(gameArray);
          
            buttons.forEach((button, index) => {
                button.disabled = false;
                button.textContent = "?";
                button.classList.remove("win", "lose", "flip", "match", "mismatch", "reverseFlip");
                button.dataset.card = gameArray2[index];
            });
    
            endBtn.remove(); 
            gameArea.classList.remove("hide");
    
            startTimer();
            playAudio("/Game Sounds/bg-music.mp3");
        });
    }

    function playAudio(audioName){
        let audio = new Audio(audioName);
        audio.currentTime = 0;
        audio.play();
    }