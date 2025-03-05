const container = document.getElementById("container");

function createGridBoard() {
  for (let i = 0; i <= 15; i++) {
    for (let j = 0; j <= 15; j++) {
      const gridElement = document.createElement("div");
      gridElement.classList.add("grid");
      container.appendChild(gridElement);
      gridElement.addEventListener("mouseover", () => {
        gridElement.style.backgroundColor = getRandomColor();
      });
    }
  }
}

createGridBoard();

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
}
