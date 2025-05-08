// Do your work here...
console.log("Hello, world!");

let books = [
  /* {
    id: number | string,
    title: string,
    author: string,
    year: number,
    isCompleted: boolean
  } */
];

const SAVED_EVENT = "saved-book";
const STORAGE_KEY = "BOOKSHELF_APPS";

// fungsi untuk memeriksa apakah browser support local storage
function isStorageExist() {
  if (typeof Storage === undefined) {
    alert("browser kamu tidak mendukung local storage");
    return false;
  }

  return true;
}

// fungsi untuk menyimpan ke local storage
function saveData() {
  if (isStorageExist()) {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}

function generateId() {
  return Number(new Date());
}

function generateBookObject(id, title, author, year, isCompleted) {
  return {
    id,
    title,
    author,
    year,
    isCompleted,
  };
}

function addBook() {
  const id = generateId();
  const title = document.getElementById("bookFormTitle").value;
  const author = document.getElementById("bookFormAuthor").value;
  const year = document.getElementById("bookFormYear").value;
  const isCompleted = document.getElementById("bookFormIsComplete").checked;
  // const isCompletedCheck = isCompleted.checked;

  const bookObject = generateBookObject(id, title, author, year, isCompleted);
  books.push(bookObject);

  document.dispatchEvent(new Event(SAVED_EVENT));
}

document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("bookForm");
  submitForm.addEventListener("submit", function (e) {
    e.preventDefault();
    addBook();
    submitForm.reset();
  });
});

document.addEventListener(SAVED_EVENT, function () {
  console.log(books);
  const incompleteBookList = document.getElementById("incompleteBookList");
  incompleteBookList.innerHTML = "";

  for (const bookList of books) {
    const bookElement = makeBook(bookList);
    incompleteBookList.append(bookElement);
  }
});

function makeBook(bookObject) {
  // fungsinya jadi container
  const bookId = document.createElement("div");
  bookId.setAttribute("data-bookId", `${bookObject.id}`);
  bookId.setAttribute("data-testid", "bookItem");
  bookId.classList.add("book-item");

  // title
  const bookTitle = document.createElement("h3");
  bookTitle.setAttribute("data-testid", "bookItemTitle");
  bookTitle.innerText = bookObject.title;

  // author
  const bookAuthor = document.createElement("p");
  bookAuthor.setAttribute("data-testid", "bookItemAuthor");
  bookAuthor.innerText = bookObject.author;

  // year
  const bookYear = document.createElement("p");
  bookYear.setAttribute("data-testid", "bookItemYear");
  bookYear.innerText = bookObject.year;

  // button wrapper
  const btnWrapper = document.createElement("div");

  // isCompleted btn
  const isCompletedBtn = document.createElement("button");
  isCompletedBtn.classList.add("complete-btn");
  isCompletedBtn.setAttribute("data-testid", "bookItemIsCompleteButton");
  isCompletedBtn.innerText = "Selesai dibaca";

  // delete btn
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.setAttribute("data-testid", "bookItemDeleteButton");
  deleteBtn.innerText = "Hapus buku";

  // edit btn
  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-btn");
  editBtn.setAttribute("data-testid", "bookItemEditButton");
  editBtn.innerText = "Edit buku";

  btnWrapper.append(isCompletedBtn, deleteBtn, editBtn);

  bookId.append(bookTitle, bookAuthor, bookYear, btnWrapper);

  return bookId;
}
