const shapes = ["rock", "paper", "scissors"];
let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
  return shapes[Math.floor(Math.random() * shapes.length)];
}

function getHumanChoice() {
  let choice = prompt("Please enter rock, paper, or scissors:").toLowerCase();
  while (!shapes.includes(choice)) {
    choice = prompt(
      "Invalid choice! Please enter rock, paper, or scissors:"
    ).toLowerCase();
  }
  return choice;
}

function playRound(humanChoice, computerChoice) {
  console.log(`You chose: ${humanChoice}`);
  console.log(`Computer chose: ${computerChoice}`);

  if (humanChoice === computerChoice) {
    console.log("Tie!");
    return "Tie";
  } else if (
    (humanChoice === "rock" && computerChoice === "scissors") ||
    (humanChoice === "scissors" && computerChoice === "paper") ||
    (humanChoice === "paper" && computerChoice === "rock")
  ) {
    humanScore++;
    console.log("You won this round!");
    return "You win this round!";
  } else {
    computerScore++;
    console.log("Computer won this round!");
    return "Computer won this round!";
  }
}

function playGame() {
  console.log("Starting a new game: Best of 5 rounds!");

  for (let i = 0; i < 5; i++) {
    const humanChoice = getHumanChoice();
    const computerChoice = getComputerChoice();
    playRound(humanChoice, computerChoice);
    console.log(`Round ${i + 1} of 5`);
    console.log(`Score - You: ${humanScore}, Computer: ${computerScore}`);
  }

  console.log("Game over!");
  if (humanScore > computerScore) {
    console.log("🎉 Congratulations! You won the game!");
  } else if (humanScore < computerScore) {
    console.log("😢 Computer wins the game! Better luck next time.");
  } else {
    console.log("🤝 It's a tie game!");
  }
}

playGame();
