const buttons = document.querySelectorAll(".cellBtns");
const turnScreen = document.getElementById("turn-indicator");
const startBtn = document.getElementById("startBtn");
const main = document.querySelector("main");
const gameInfo = document.getElementById("game-info");
const gooBtn = document.querySelector("#game-mode button");
turnScreen.textContent = "Player 1's turn";

let round = 0;
let character = " ";
let character2 = " ";
let withPerson = false;
let player1 = document.getElementById("letter");
let player2 = document.getElementById("letter2");

player1.addEventListener("input", () => {
  character = player1.value;
});
player2.addEventListener("input", () => {
  character2 = player2.value;
});

const withPlayer = document.getElementById("p2");
const withComp = document.getElementById("ai");

withPlayer.addEventListener("change", () => {
  withPerson = true;
});
withComp.addEventListener("change", () => {
  withPerson = false;
});

const winningCombinations = [
  [buttons[0], buttons[3], buttons[6]],
  [buttons[1], buttons[4], buttons[7]],
  [buttons[2], buttons[5], buttons[8]],
  [buttons[0], buttons[4], buttons[8]],
  [buttons[2], buttons[4], buttons[6]],
  [buttons[0], buttons[1], buttons[2]],
  [buttons[3], buttons[4], buttons[5]],
  [buttons[6], buttons[7], buttons[8]],
];

function checkWinner(player, string) {
  for (let combination of winningCombinations) {
    if (
      combination[0].textContent === player &&
      combination[1].textContent === player &&
      combination[2].textContent === player
    ) {
      combination.forEach((button) => button.classList.add("win"));
      buttons.forEach((button) => (button.disabled = true));
      updateInner(string);
      handleGameEnd();
      return true;
    }
  }
  return false;
}

function turnIndicator() {
  if (
    !checkWinner(character, "Player 1") &&
    !checkWinner(character2, "Player 2")
  ) {
    if (round % 2 === 0) {
      turnScreen.textContent = "Player 1's turn";
    } else {
      turnScreen.textContent = "Player 2's turn";
    }
  } else if (checkWinner(character, "Player 1")) {
    turnScreen.classList.add("win");
  } else if (checkWinner(character2, "Player 2")) {
    turnScreen.classList.add("win");
  }
}

function randomChoice() {
  const buttons2 = [...buttons];
  const emptyBtns = buttons2.filter((button) => button.textContent === "");
  if (emptyBtns.length === 0) return;
  const random = emptyBtns[Math.floor(Math.random() * emptyBtns.length)];
  random.textContent = character2;
  random.disabled = true;
  checkWinner(character2, "AI");
  round += 1;
  turnIndicator();
  if (
    round === 9 &&
    !checkWinner(character, "Player1") &&
    !checkWinner(character2, "Player 2")
  ) {
    handleDraw();
  }
}

function handleDraw() {
  buttons.forEach((button) => button.classList.add("nowin"));
  turnScreen.textContent = "It's a draw!";
  turnScreen.classList.add("nowin");
  handleGameEnd();
}

startBtn.addEventListener("click", function () {
  if (player1.value.length === 0 || player2.value.length === 0) {
    character = "X";
    character2 = "O";
  } else if (player1.value === player2.value) {
    alert("Pick different letters please");
    return;
  }

  startBtn.style.display = "none";
  main.classList.toggle("hidden");
  gameInfo.style.display = "none";
  turnScreen.classList.remove("win", "nowin");
  turnIndicator();
});

function updateInner(string) {
  turnScreen.textContent = `${string} wins!`;
  turnScreen.classList.add("win");
}

gooBtn.addEventListener("click", function (event) {
  event.preventDefault();
  document.querySelector("#game-mode ").classList.add("hidden");
  gameInfo.classList.remove("hidden");
});

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    if (round % 2 === 0) {
      button.textContent = character;
      button.disabled = true;
      checkWinner(character, "Player 1");
      round += 1;
      turnIndicator();

      if (!withPerson && !checkWinner(character, "Player 1")) {
        setTimeout(() => {
          randomChoice();
        }, 1200);
      }
    } else if (withPerson) {
      button.textContent = character2;
      button.disabled = true;
      checkWinner(character2, "Player 2");
      round += 1;
      turnIndicator();
    }

    if (
      round === 9 &&
      !checkWinner(character, "Player 1") &&
      !checkWinner(character2, "Player 2")
    ) {
      handleDraw();
    }
  });
});

function resetGame() {
  round = 0;
  turnScreen.textContent = "Player 1's turn";
  turnScreen.classList.remove("win", "nowin");

  buttons.forEach((button) => {
    button.textContent = "";
    button.disabled = false;
    button.classList.remove("win", "nowin");
  });

  main.classList.remove("hidden");
  resetBtn.style.display = "none";
}

function handleGameEnd() {
  setTimeout(() => {
    main.classList.add("hidden");
    resetBtn.classList.remove("hidden");
    resetBtn.style.display = "block";
  }, 3000);
}

const resetBtn = document.getElementById("resetBtn");
resetBtn.addEventListener("click", function () {
  resetGame();
});

const toggle = document.getElementById("toggleMode");
const body = document.body;
const icon = document.querySelector("header button i");

toggle.addEventListener("click", () => {
  if (!body.classList.contains("light")) {
    body.classList.add("light");
    icon.classList.remove("bx-sun");
    icon.classList.add("bxs-moon");
    console.log(icon.classList);
  } else if (body.classList.contains("light")) {
    body.classList.remove("light");
    icon.classList.remove("bxs-moon");
    icon.classList.add("bx-sun");
  }
});
