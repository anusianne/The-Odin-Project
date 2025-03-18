const button = document.getElementById("button");

const myLibrary = [];

function Book(name, author, id) {
  this.name = "John";
  this.author = "Doe";
  this.id = id;
}
function addBookToLibrary() {
  console.log("added");
}

button.addEventListener("click", addBookToLibrary);
