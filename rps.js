const rock = document.querySelector(".rock");

const paper = document.querySelector(".paper");

const scissors = document.querySelector(".scissors");

const reset = document.querySelector(".reset");

const autoPlay = document.querySelector(".auto-play");

const resultElement = document.querySelector(".result");

const movesElement = document.querySelector(".moves");

const scoreElement = document.querySelector(".score");

const bodyElement = document.querySelector("body");

const confirmMessage = document.querySelector(".confirm-message");

let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();

/*

if (!score) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0,
  };
}

*/

let isAutoPlaying = false;

let intervalId;

function autoPlayGame() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickRandomMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    autoPlay.innerHTML = "Stop Play";
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    autoPlay.innerHTML = "Auto Play";
  }
}

function playGame(playerMove) {
  const computerMove = pickRandomMove();

  let result = "";

  if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie.";
    } else if (computerMove === "paper") {
      result = "You lost.";
    } else if (computerMove === "scissors") {
      result = "You won.";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You won.";
    } else if (computerMove === "paper") {
      result = "Tie.";
    } else if (computerMove === "scissors") {
      result = "You lost.";
    }
  } else if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You lost.";
    } else if (computerMove === "paper") {
      result = "You won.";
    } else if (computerMove === "scissors") {
      result = "Tie.";
    }
  }

  if (result === "You won.") {
    score.wins++;
  } else if (result === "You lost.") {
    score.losses++;
  } else if (result === "Tie.") {
    score.ties++;
  }

  localStorage.setItem("score", JSON.stringify(score));

  movesElement.innerHTML = `You <img src="images/${playerMove}-emoji.png"> 
  <img src="images/${computerMove}-emoji.png"> Computer`;

  resultElement.innerHTML = result;

  updateScoreElement();
}

function showResetConfirmation() {
  const message = `Are you sure you want to reset the score? <button class="btn--yes">Yes</button> <button class="btn--no">No</button>`;

  confirmMessage.innerHTML = message;

  document.querySelector(".btn--yes").addEventListener("click", () => {
    resetScore();
    hideResetConfirmation();
  });

  document.querySelector(".btn--no").addEventListener("click", () => {
    hideResetConfirmation();
  });
}

function hideResetConfirmation() {
  confirmMessage.innerHTML = "";
}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem("score");
  updateScoreElement();
}

function updateScoreElement() {
  scoreElement.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickRandomMove() {
  let computerMove = "";

  const randomNumber = Math.random();

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }

  return computerMove;
}

rock.addEventListener("click", () => {
  playGame("rock");
  hideResetConfirmation();
});

paper.addEventListener("click", () => {
  playGame("paper");
  hideResetConfirmation();
});

scissors.addEventListener("click", () => {
  playGame("scissors");
  hideResetConfirmation();
});

reset.addEventListener("click", () => {
  showResetConfirmation();
});

autoPlay.addEventListener("click", () => {
  autoPlayGame();
  hideResetConfirmation();
});

bodyElement.addEventListener("keydown", (event) => {
  if (event.key === "a") {
    autoPlayGame();
  } else if (event.key === "Backspace") {
    showResetConfirmation();
  } else if (event.key === "r") {
    playGame("rock");
  } else if (event.key === "p") {
    playGame("paper");
  } else if (event.key === "s") {
    playGame("scissors");
  }
});
