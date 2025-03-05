const container = document.getElementById("container");
const boardBtn = document.getElementById("boardButton");
const resetBtn = document.getElementById("resetBtn");
function createGridBoard(size) {
  container.innerHTML = "";
  let squareSize = 400 / size;

  for (let i = 0; i < size * size; i++) {
    const gridElement = document.createElement("div");
    gridElement.classList.add("grid");
    gridElement.style.width = `${squareSize}px`;
    gridElement.style.height = `${squareSize}px`;
    container.appendChild(gridElement);
    gridElement.addEventListener("mouseover", () => {
      gridElement.style.backgroundColor = getRandomColor();
    });
  }
}
createGridBoard(16);

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
}
function resetColorBoard() {
  const div = container.children;
  for (let i = 0; i < div.length; i++) {
    div[i].style.backgroundColor = "white";
  }
}
boardBtn.addEventListener("click", () => {
  let numberofGrid = parseInt(
    prompt("Please enter your board size from 2 to 100: ")
  );
  if (numberofGrid > 100) {
    container.innerText = `The size of the board must have been smaller or equal to 100!`;
  } else if (numberofGrid < 2) {
    container.innerText = `The size of the board must have been bigger or equal to 2!`;
  } else if (isNaN(numberofGrid)) {
    container.innerText = `You must write a number from 2 to 100, not a string!`;
  } else {
    createGridBoard(numberofGrid);
  }
});
resetBtn.addEventListener("click", () => {
  resetColorBoard();
});
