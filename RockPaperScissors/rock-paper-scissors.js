const shapes = ["rock", "paper", "scissors"];
let humanScore = 0;
let computerScore = 0;

function getComputerChoice(shapes) {
  return shapes[Math.floor(Math.random() * shapes.length)];
}
// console.log(getComputerChoice(shapes));

function getHumanChoice() {
  const shapeChoice = prompt("Please enter your shape:");
  console.log("You choose, " + shapeChoice + "!");
}

// console.log(getHumanChoice());
