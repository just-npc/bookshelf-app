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
