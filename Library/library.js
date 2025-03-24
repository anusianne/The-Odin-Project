const button = document.getElementById("button");
const libraryContainer = document.getElementById("libraryContainer");
const myLibrary = [];
const showBtn = document.getElementById("show-dialog");
const dialog = document.getElementById("dialog");
const closeBtn = dialog.querySelector("#closeBtn");
const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const read = document.getElementById("read");
const dialogForm = document.getElementById("dialogForm");

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
  }
}

function deleteBook(bookCard, id) {
  bookCard.remove();
  const index = myLibrary.findIndex((book) => book.id === id);
  if (index !== -1) {
    myLibrary.splice(index, 1);
  }
}

function createBookCard(book) {
  const bookCard = document.createElement("div");
  bookCard.classList.add("bookCard");
  bookCard.innerHTML = `
    <h2>${book.title}</h2>
    <p>Autor: ${book.author}</p>
    <p>Strony: ${book.pages}</p>
    <p>${book.read ? "Read" : "Not Read"}</p>
    <button class="deleteBtn">Delete</button>
  `;

  const deleteBtn = bookCard.querySelector(".deleteBtn");
  deleteBtn.addEventListener("click", () => deleteBook(bookCard, book.id));

  return bookCard;
}

function addBookToLibrary() {
  const book = new Book(title.value, author.value, pages.value, read.checked);
  myLibrary.push(book);
  libraryContainer.appendChild(createBookCard(book));
}

const bookIntro = new Book("Harry Potter", "J.K. Rowling", 999, false);
myLibrary.push(bookIntro);
libraryContainer.appendChild(createBookCard(bookIntro));

dialogForm.addEventListener("submit", (event) => {
  event.preventDefault();
  dialog.close();
  addBookToLibrary();
});

showBtn.addEventListener("click", () => {
  dialogForm.reset();
  dialog.showModal();
});
