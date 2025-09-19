import { BookItem } from "./book-items";

export class IncompleteBookList extends HTMLElement {
  _booklist: BookType[];
  _style: HTMLStyleElement;

  constructor() {
    super();
    this._booklist = [];
    this._style = document.createElement("style");
  }

  setBookList(value: BookType) {
    this._booklist = [...this._booklist, value];

    this.render();
  }

  updateStyle() {
    this._style.textContent = `
      //  :host {
      // display: block;
      // margin: auto;
      // max-width: 400px;
    // }

    .book-list-wrapper {
      border: 3px solid black;
      width: 300px;
      padding: 1.5rem;
      margin: 10% auto;
      translate: -6px -6px;
      box-shadow: 10px 10px 0 black;
      background: #ffc0cb;
      overflow: hidden;
      transition: all 0.3s ease;
    }

    .book-list-wrapper:hover {
      transform: translate(-6px, -6px);
    }

    book-item {
      display: block;
      margin-bottom: 1rem;
    }
    `;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.updateStyle();

    console.log("cek data:", this._booklist);

    if (this._booklist.length == 0) {
      this.innerHTML = "";
      return;
    }

    const wrapper = document.createElement("div");
    wrapper.classList.add("book-list-wrapper");

    const bookIsCompleteTitle = document.createElement("h2");
    bookIsCompleteTitle.innerText = `Belum Selesai Dibaca`;

    const booksItemElement = this._booklist.map((item) => {
      const books = document.createElement("book-item") as BookItem;
      books.setBooks(item);
      return books;
    });

    this.innerHTML = "";
    wrapper.append(bookIsCompleteTitle, ...booksItemElement);
    this.append(this._style, wrapper);
  }
}

customElements.define("incomplete-booklist", IncompleteBookList);
