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

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
}
function addBookToLibrary() {
  const book = new Book(title.value, author.value, pages.value, read.checked);
  myLibrary.push(book);
  const bookCard = document.createElement("div");
  bookCard.classList.add("bookCard");
  libraryContainer.appendChild(bookCard);
  bookCard.innerHTML = `<h2>${book.title}</h2><p>${book.author}</p><p>${
    book.pages
  }</p><p>${book.read ? "Read" : "Not Read"}</p>
  `;
}

showBtn.addEventListener("click", () => {
  dialogForm.reset();
  dialog.showModal();
  document.body.style.opacity = "30%";
});

dialogForm.addEventListener("submit", (event) => {
  event.preventDefault();
  dialog.close();
  document.body.style.opacity = "100%";

  addBookToLibrary();
});
