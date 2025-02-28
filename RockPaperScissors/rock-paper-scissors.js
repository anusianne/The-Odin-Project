const shapes = ["rock", "paper", "scissors"];
const paperBtn = document.getElementById("paperBtn");
const rockBtn = document.getElementById("rockBtn");
const scissorsBtn = document.getElementById("scissorsBtn");
const playerShapes = [paperBtn, rockBtn, scissorsBtn];
const gameContainer = document.getElementById("game-container");

let humanScore = 0;
let computerScore = 0;

const resultsDiv = document.createElement("div");
gameContainer.appendChild(resultsDiv);

function getComputerChoice() {
  return shapes[Math.floor(Math.random() * shapes.length)];
}
function playRound(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) {
    resultsDiv.innerText = "Tie";
  } else if (
    (humanChoice === "rock" && computerChoice === "scissors") ||
    (humanChoice === "scissors" && computerChoice === "paper") ||
    (humanChoice === "paper" && computerChoice === "rock")
  ) {
    humanScore++;
    resultsDiv.innerText = "You win this round!";
  } else {
    computerScore++;
    resultsDiv.innerText = "Computer won this round!";
  }
  console.log(`AI score: ${computerScore} Human score: ${humanScore}`);
  checkWinner();
}
function checkWinner() {
  if (humanScore === 5 || computerScore === 5) {
    alert("Game over!");
    document.location.reload();
  }
}
paperBtn.addEventListener("click", () => {
  const computerChoice = getComputerChoice();
  const humanChoice = "paper";
  playRound(humanChoice, computerChoice);
});
rockBtn.addEventListener("click", () => {
  const computerChoice = getComputerChoice();
  const humanChoice = "rock";
  playRound(humanChoice, computerChoice);
});
scissorsBtn.addEventListener("click", () => {
  const computerChoice = getComputerChoice();
  const humanChoice = "scissors";
  playRound(humanChoice, computerChoice);
});
