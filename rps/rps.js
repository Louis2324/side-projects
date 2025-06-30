const choices = {
  rock: "🪨",
  paper: "📃",
  scissors: "✂️",
};

let userScore = 0;
let computerScore = 0;
const scoreDisplay = document.getElementById("scoreDisplay");
const userChoiceDisplay = document.getElementById("userChoice");
const compChoiceDisplay = document.getElementById("compChoice");

function getComputerChoice() {
  const choicesArray = Object.keys(choices);
  const randomIndex = Math.floor(Math.random() * choicesArray.length);
  return choicesArray[randomIndex];
}

function determineWinner(user, computer) {
  if (user === computer) return "draw";
  const winConditions = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
  };
  return winConditions[user] === computer ? "user" : "computer";
}

function updateScore(winner) {
  if (winner === "user") userScore++;
  if (winner === "computer") computerScore++;
  scoreDisplay.value = `${userScore} - ${computerScore}`;

  if (userScore === 5 || computerScore === 5) {
    const winner = userScore === 5 ? "Player" : "Computer";
    setTimeout(() => {
      alert(`${winner} wins the game!`);
      resetGame();
    }, 100);
  }
}

function resetGame() {
  userScore = 0;
  computerScore = 0;
  scoreDisplay.value = "0 - 0";
  userChoiceDisplay.textContent = "❔";
  compChoiceDisplay.textContent = "❔";
  userChoiceDisplay.classList.remove("winner-animation");
  compChoiceDisplay.classList.remove("winner-animation");
}

function playRound(userChoice) {
  const computerChoice = getComputerChoice();

  userChoiceDisplay.classList.remove("winner-animation", "draw-animation");
  compChoiceDisplay.classList.remove("winner-animation", "draw-animation");

  userChoiceDisplay.textContent = choices[userChoice];
  compChoiceDisplay.textContent = choices[computerChoice];

  const result = determineWinner(userChoice, computerChoice);

  setTimeout(() => {
    if (result === "draw") {
      userChoiceDisplay.classList.add("draw-animation");
      compChoiceDisplay.classList.add("draw-animation");
    } else if (result === "user") {
      userChoiceDisplay.classList.add("winner-animation");
    } else {
      compChoiceDisplay.classList.add("winner-animation");
    }
  }, 10);

  if (result !== "draw") {
    updateScore(result);
  }
}

document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", () => {
    playRound(button.id);
  });
});
