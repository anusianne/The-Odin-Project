const gameContainer = document.querySelector(".gameContainer");
const xSign = document.getElementById("xSign");
const oSign = document.getElementById("oSign");
const btn = document.getElementById("btn");
let player1 = "";
let player2 = "";
let currentPlayer = player1;
let board = [];
const boardSize = 3;
let gameOver = false;
let gameStarted = false;

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
}
xSign.addEventListener("click", () => choosePlayer(xSign));
oSign.addEventListener("click", () => choosePlayer(oSign));

function createBoard() {
  gameContainer.innerHTML = "";
  gameContainer.style.display = "grid";
  board = [];
  gameOver = false;
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
        if (gameStarted) {
          handleClick(cell, i, j);
        } else {
          console.log("Wybierz gracza (X lub O), aby rozpocząć grę.");
        }
      });
    }
  }
}

function handleClick(cell, row, col) {
  if (gameOver) {
    console.log("Gra zakończona. Nie można wykonać ruchu.");
    return;
  }
  if (board[row][col] !== "") {
    console.log("To pole jest już zajęte.");
    return;
  }
  board[row][col] = currentPlayer;
  cell.innerText = currentPlayer;
  if (checkWinner(currentPlayer)) {
    console.log(`Gracz ${currentPlayer} wygrał!`);
    gameOver = true;
    const winMessage = document.createElement("div");
    winMessage.innerText = `Gratulacje! Gracz ${currentPlayer} wygrywa!`;
    winMessage.classList.add("win-message");
    document.body.appendChild(winMessage);
    return;
  }

  let isDraw = true;
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      if (board[i][j] === "") {
        isDraw = false;
        break;
      }
    }
    if (!isDraw) break;
  }

  if (isDraw) {
    console.log("Remis!");
    gameOver = true;
    const drawMessage = document.createElement("div");
    drawMessage.innerText = `Remis!`;
    drawMessage.classList.add("win-message");
    document.body.appendChild(drawMessage);
    return;
  }

  currentPlayer = currentPlayer === player1 ? player2 : player1;
  console.log(`Następny ruch: ${currentPlayer}`);
}

function checkWinner(player) {
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] === player &&
      board[i][1] === player &&
      board[i][2] === player
    ) {
      return true;
    }
  }
  for (let j = 0; j < 3; j++) {
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
