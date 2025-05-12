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

  const bookObject = generateBookObject(id, title, author, year, isCompleted);
  books.push(bookObject);

  document.dispatchEvent(new Event(SAVED_EVENT));
}

function editBook(bookId) {
  console.log("hello");
  document.getElementById("modal").style.display = "inline-block";
  console.log(bookId);

  //ambil data dari input modal
  const editTitle = document.getElementById("bookFormTitleEdit");
  const editAuthor = document.getElementById("bookFormAuthorEdit");
  const editYear = document.getElementById("bookFormYearEdit");

  const index = Number(books.findIndex((book) => book.id === bookId));
  console.log(index);
  if (index !== -1) {
    console.log("Index ditemukan:", index);
    console.log("Data sebelum diedit:", books[index]);
    console.log("miawww");
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
  submitFormEdit.addEventListener("submit", function () {
    e.preventDefault();
    editBook();
    submitForm.reset();
  });
});

document.addEventListener(SAVED_EVENT, function () {
  console.log(books);
  const incompleteBookList = document.getElementById("incompleteBookList");
  const completeBookList = document.getElementById("completeBookList");

  incompleteBookList.innerHTML = "";
  completeBookList.innerHTML = "";

  for (const bookList of books) {
    const bookElement = makeBook(bookList);
    if (!bookList.isCompleted) {
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

  bookTarget.isCompleted = true;
  document.dispatchEvent(new Event(SAVED_EVENT));
}

function addBookToNotCompleted(bookId) {
  const bookTarget = findBook(bookId);

  if (bookTarget == null) return;

  bookTarget.isCompleted = false;
  document.dispatchEvent(new Event(SAVED_EVENT));
}

function deleteBook(e) {
  console.log(e);
  books.splice(e, 1);
  console.log(books);

  document.dispatchEvent(new Event(SAVED_EVENT));
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
    const getBookId = e.target.closest('[data-testid="bookItem"]');
    const someBookId = parseInt(getBookId.dataset.bookid);
    editBook(someBookId);
  });

  btnWrapper.append(isCompletedBtn, deleteBtn, editBtn);

  bookId.append(bookTitle, bookAuthor, bookYear, btnWrapper);

  if (bookObject.isCompleted) {
    isCompletedBtn.addEventListener("click", function () {
      addBookToNotCompleted(bookObject.id);
    });
    isCompletedBtn.innerText = "Belum Selesai";
    isCompletedBtn.style.background = "#C4A1FF";
  } else {
    isCompletedBtn.addEventListener("click", function () {
      addBookToCompleted(bookObject.id);
    });
    isCompletedBtn.innerText = "Selesai dibaca";
  }

  return bookId;
}
