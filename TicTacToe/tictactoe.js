const gameContainer = document.querySelector(".gameContainer");
const boardSize = 3;
let board = [];

function createBoard() {
  gameContainer.innerHTML = "";
  board = [];

  for (let i = 0; i < boardSize; i++) {
    board.push([]);
    for (let j = 0; j < boardSize; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = i;
      cell.dataset.col = j;
      gameContainer.appendChild(cell);
      board[i][j] = "";
    }
  }
  console.log("Board state initialized:", board);
}
createBoard();
