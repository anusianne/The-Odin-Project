const gameContainer = document.querySelector(".gameContainer");
const xSign = document.getElementById("xSign");
const oSign = document.getElementById("oSign");
const btn = document.getElementById("btn");
let player1 = "";
let player2 = "";
let currentPlayer = "";
let board = [];
const boardSize = 3;
let gameOver = false;
let gameStarted = false;
let isComputerTurn = false;

function choosePlayer(playerChoose) {
  if (playerChoose === xSign) {
    player1 = "X";
    player2 = "O";
  } else {
    player1 = "O";
    player2 = "X";
  }
  currentPlayer = player1;
  btn.style.display = "none";
  gameStarted = true;
  createBoard();
  if (player1 === "O") {
    isComputerTurn = true;
    setTimeout(computerMove, 500);
  }
}
xSign.addEventListener("click", () => choosePlayer(xSign));
oSign.addEventListener("click", () => choosePlayer(oSign));

function createBoard() {
  gameContainer.innerHTML = "";
  gameContainer.style.display = "grid";
  board = [];
  gameOver = false;
  isComputerTurn = false;
  const oldMessages = document.querySelectorAll(".win-message");
  oldMessages.forEach((msg) => msg.remove());
  const oldButtons = document.querySelectorAll(".play-again-button");
  oldButtons.forEach((btn) => btn.remove());

  for (let i = 0; i < boardSize; i++) {
    board.push([]);
    for (let j = 0; j < boardSize; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = i;
      cell.dataset.col = j;
      gameContainer.appendChild(cell);
      board[i][j] = "";
      cell.addEventListener("click", () => {
        if (gameStarted && !isComputerTurn) {
          handleClick(cell, i, j);
        } else if (!gameStarted) {
          console.log("Wybierz gracza (X lub O), aby rozpocząć grę.");
        } else {
          console.log("Poczekaj na ruch komputera.");
        }
      });
    }
  }
}

function handleClick(cell, row, col) {
  if (gameOver || isComputerTurn) {
    console.log("Gra zakończona lub poczekaj na swój ruch.");
    return;
  }
  if (board[row][col] !== "") {
    console.log("To pole jest już zajęte.");
    return;
  }

  board[row][col] = player1;
  cell.innerText = player1;
  cell.classList.add(player1.toLowerCase());

  if (checkWinner(player1)) {
    console.log(`Gracz ${player1} wygrał!`);
    showEndMessage(`Gratulacje! Wygrywasz!`);
    gameOver = true;
    return;
  }

  if (checkDraw()) {
    console.log("Remis!");
    showEndMessage(`Remis!`);
    gameOver = true;
    return;
  }

  currentPlayer = player2;
  console.log(`Następny ruch: ${currentPlayer} (Komputer)`);
  isComputerTurn = true;
  setTimeout(computerMove, 500);
}

function computerMove() {
  if (gameOver) return;

  const emptyCells = [];
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      if (board[i][j] === "") {
        emptyCells.push({ row: i, col: j });
      }
    }
  }

  if (emptyCells.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const chosenCell = emptyCells[randomIndex];
    const { row, col } = chosenCell;

    board[row][col] = player2;
    const cellElement = document.querySelector(
      `.cell[data-row="${row}"][data-col="${col}"]`
    );
    cellElement.innerText = player2;
    cellElement.classList.add(player2.toLowerCase());

    console.log(`Komputer (${player2}) wybrał pole (${row}, ${col})`);

    if (checkWinner(player2)) {
      console.log(`Komputer (${player2}) wygrał!`);
      showEndMessage(`Komputer (${player2}) wygrywa!`);
      gameOver = true;
      isComputerTurn = false;
      return;
    }

    if (checkDraw()) {
      console.log("Remis!");
      showEndMessage(`Remis!`);
      gameOver = true;
      isComputerTurn = false;
      return;
    }
  } else {
    console.log("Brak dostępnych ruchów dla komputera.");
  }

  currentPlayer = player1;
  isComputerTurn = false;
  console.log(`Następny ruch: ${currentPlayer} (Ty)`);
}

function checkDraw() {
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      if (board[i][j] === "") {
        return false;
      }
    }
  }
  return true;
}

function showEndMessage(message) {
  const oldMessage = document.querySelector(".win-message");
  if (oldMessage) {
    oldMessage.remove();
  }
  const oldButton = document.querySelector(".play-again-button");
  if (oldButton) {
    oldButton.remove();
  }

  const endMessage = document.createElement("div");
  endMessage.innerText = message;
  endMessage.classList.add("win-message");
  document.body.appendChild(endMessage);

  const playAgainButton = document.createElement("button");
  playAgainButton.innerText = "Zagraj ponownie";
  playAgainButton.classList.add("play-again-button");
  playAgainButton.onclick = () => {
    gameOver = false;
    gameStarted = false;
    currentPlayer = "";
    isComputerTurn = false;
    gameContainer.innerHTML = "";
    gameContainer.style.display = "none";
    btn.style.display = "block";
    endMessage.remove();
    playAgainButton.remove();
  };
  document.body.appendChild(playAgainButton);
}

function checkWinner(player) {
  for (let i = 0; i < boardSize; i++) {
    if (
      board[i][0] === player &&
      board[i][1] === player &&
      board[i][2] === player
    ) {
      return true;
    }
  }
  for (let j = 0; j < boardSize; j++) {
    if (
      board[0][j] === player &&
      board[1][j] === player &&
      board[2][j] === player
    ) {
      return true;
    }
  }
  if (
    board[0][0] === player &&
    board[1][1] === player &&
    board[2][2] === player
  ) {
    return true;
  }
  if (
    board[0][2] === player &&
    board[1][1] === player &&
    board[2][0] === player
  ) {
    return true;
  }
  return false;
}
