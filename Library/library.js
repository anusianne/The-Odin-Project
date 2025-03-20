const button = document.getElementById("button");

const myLibrary = [];

function Book(name, author) {
  this.name = name;
  this.author = author;
  this.id = crypto.randomUUID();
}
function addBookToLibrary() {
  const book1 = new Book("Harry Potter", "J.K. Rowling", 1);
  myLibrary.push(book1);
  console.log(myLibrary);
}

button.addEventListener("click", addBookToLibrary);
