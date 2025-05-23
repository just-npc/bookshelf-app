// Do your work here...
console.log("Hello, world!");

let books = [
  /* {
    id: number | string,
    title: string,
    author: string,
    year: number,
    isComplete: boolean
  } */
];

const SAVED_EVENT = "saved-book";
const STORAGE_KEY = "BOOKSHELF_APPS";

// variabel global scope untuk menyimpan id buku yg ingin diedit
let editId = null;

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

function generateBookObject(id, title, author, year, isComplete) {
  return {
    id,
    title,
    author,
    year,
    isComplete,
  };
}

function addBook() {
  const id = generateId();
  const title = document.getElementById("bookFormTitle").value;
  const author = document.getElementById("bookFormAuthor").value;
  const year = parseInt(document.getElementById("bookFormYear").value);
  const isComplete = document.getElementById("bookFormIsComplete").checked;

  const bookObject = generateBookObject(id, title, author, year, isComplete);
  books.push(bookObject);

  document.dispatchEvent(new Event(SAVED_EVENT));
  saveData();
}

// fungsi untuk buka modal dan value input terisi sesuai data yg ada
function openEditModal(bookId) {
  console.log("hello");
  document.getElementById("modal").style.display = "inline-block";
  console.log(bookId);

  const book = books.find((b) => b.id === bookId);

  if (!book) return alert("Data buku tidak ditemukan!");

  editId = bookId;
  // document.getElementById("editId").value = book.id;
  document.getElementById("bookFormTitleEdit").value = book.title;
  document.getElementById("bookFormAuthorEdit").value = book.author;
  document.getElementById("bookFormYearEdit").checked = book.year;
}

function editBook() {
  const newTitle = document.getElementById("bookFormTitleEdit").value;
  const newAuthor = document.getElementById("bookFormAuthorEdit").value;
  const newYear = document.getElementById("bookFormYearEdit").value;
  const newIsComplete = document.getElementById(
    "bookFormIsCompleteEdit"
  ).checked;

  const index = books.findIndex((book) => book.id === editId);
  if (index !== -1) {
    books[index].title = newTitle;
    books[index].author = newAuthor;
    books[index].year = newYear;
    books[index].isComplete = newIsComplete;

    document.getElementById("modal").style.display = "none";
    document.dispatchEvent(new Event(SAVED_EVENT));
    saveData();
  }

  editId = null;
}

// fungsi untuk mencari dan menampilkan buku
function searchBook() {
  const title = document.getElementById("searchBookTitle").value.toLowerCase();
  const bookTitle = document.querySelectorAll("#book-title");
  const searchInfo = document.querySelector(".search-info");

  let found = false;
  searchInfo.innerHTML = "";

  bookTitle.forEach((item) => {
    if (item.innerText.toLowerCase().includes(title)) {
      item.scrollIntoView({ behavior: "smooth", block: "center" });
      found = true;
    }
  });

  if (!found) {
    searchInfo.innerHTML = "Buku Tidak ditemukan!";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("bookForm");

  submitForm.addEventListener("submit", function (e) {
    e.preventDefault();
    addBook();
    submitForm.reset();
  });
});

// untuk modal edit form
document.addEventListener("DOMContentLoaded", function () {
  const submitFormEdit = document.getElementById("bookFormEdit");
  submitFormEdit.addEventListener("submit", function (e) {
    e.preventDefault();
    editBook();
  });
});

// untuk nyari buku
document.addEventListener("DOMContentLoaded", function () {
  const searchBookForm = document.getElementById("searchBook");
  searchBookForm.addEventListener("submit", function (e) {
    e.preventDefault();
    searchBook();
    searchBookForm.reset();
  });
});

document.addEventListener("DOMContentLoaded", function () {
  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);

  if (data !== null) {
    for (const book of data) {
      books.push(book);
    }
  }

  document.dispatchEvent(new Event(SAVED_EVENT));
}

document.addEventListener(SAVED_EVENT, function () {
  console.log(books);
  console.log(localStorage.getItem(STORAGE_KEY));
  const incompleteBookList = document.getElementById("incompleteBookList");
  const completeBookList = document.getElementById("completeBookList");

  incompleteBookList.innerHTML = "";
  completeBookList.innerHTML = "";

  for (const bookList of books) {
    const bookElement = makeBook(bookList);
    if (!bookList.isComplete) {
      incompleteBookList.append(bookElement);
    } else {
      completeBookList.append(bookElement);
    }
  }
});

function findBook(bookId) {
  for (const bookItem of books) {
    if (bookItem.id === bookId) {
      return bookItem;
    }
  }

  return null;
}

function addBookToCompleted(bookId) {
  const bookTarget = findBook(bookId);

  if (bookTarget == null) return;

  bookTarget.isComplete = true;
  document.dispatchEvent(new Event(SAVED_EVENT));
  saveData();
}

function addBookToNotCompleted(bookId) {
  const bookTarget = findBook(bookId);

  if (bookTarget == null) return;

  bookTarget.isComplete = false;
  document.dispatchEvent(new Event(SAVED_EVENT));
  saveData();
}

function deleteBook(e) {
  console.log(e);
  books.splice(e, 1);
  console.log(books);

  document.dispatchEvent(new Event(SAVED_EVENT));
  saveData();
}

function makeBook(bookObject) {
  // fungsinya jadi container
  const bookId = document.createElement("div");
  bookId.setAttribute("data-bookId", `${bookObject.id}`);
  bookId.setAttribute("data-testid", "bookItem");
  bookId.classList.add("book-item");

  // title
  const bookTitle = document.createElement("h3");
  bookTitle.setAttribute("data-testid", "bookItemTitle");
  bookTitle.setAttribute("id", "book-title");
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

  // isComplete btn
  const isCompleteBtn = document.createElement("button");
  isCompleteBtn.classList.add("complete-btn");
  isCompleteBtn.setAttribute("data-testid", "bookItemIsCompleteButton");

  // delete btn
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.setAttribute("data-testid", "bookItemDeleteButton");
  deleteBtn.innerText = "Hapus buku";
  deleteBtn.addEventListener("click", function (e) {
    deleteBook(e);
  });

  // edit btn
  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-btn");
  editBtn.setAttribute("data-testid", "bookItemEditButton");
  editBtn.innerText = "Edit buku";
  editBtn.addEventListener("click", function (e) {
    const bookItems = e.target.closest(".book-item");
    const bookId = parseInt(bookItems.dataset.bookid);

    openEditModal(bookId);
  });

  btnWrapper.append(isCompleteBtn, deleteBtn, editBtn);

  bookId.append(bookTitle, bookAuthor, bookYear, btnWrapper);

  if (bookObject.isComplete) {
    isCompleteBtn.addEventListener("click", function () {
      addBookToNotCompleted(bookObject.id);
    });
    isCompleteBtn.innerText = "Belum Selesai";
    isCompleteBtn.style.background = "#C4A1FF";
  } else {
    isCompleteBtn.addEventListener("click", function () {
      addBookToCompleted(bookObject.id);
    });
    isCompleteBtn.innerText = "Selesai dibaca";
  }

  // saveData();
  return bookId;
}
