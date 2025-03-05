const container = document.getElementById("container");

function createGridBoard() {
  for (let i = 0; i <= 15; i++) {
    for (let j = 0; j <= 15; j++) {
      const gridElement = document.createElement("div");
      gridElement.classList.add("grid");
      container.appendChild(gridElement);
      gridElement.addEventListener("mouseover", () => {
        gridElement.classList.add("changedColor");
      });
    }
  }
}

createGridBoard();
