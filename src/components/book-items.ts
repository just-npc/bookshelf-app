export class BookItem extends HTMLElement {
  _style: HTMLStyleElement;
  _books: BookType;

  constructor() {
    super();

    this._books = {
      id: 1029298394090,
      title: "NEED_TITLE",
      author: "NEED_AUTHOR",
      year: 2025,
      isComplete: false,
    };
    this._style = document.createElement("style");
  }

  setBooks(value: BookType) {
    this._books["id"] = value.id;
    this._books["title"] = value.title;
    this._books["author"] = value.author;
    this._books["year"] = value.year;
    this._books["isComplete"] = value.isComplete;

    this.render();
  }

  updateStyle() {
    this._style.textContent = `
        input, button {
            display: block;
            width: 100%;
            margin: 0.5rem 0;
            padding: 0.5rem;
            border: 2px solid black;
            font-size: 1rem;
        }
    `;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.updateStyle();

    this.innerHTML = `
      ${this._style.outerHTML}

      <div id="${
        this._books["isComplete"] == true
          ? "completeBookList"
          : "incompleteBookList"
      }" data-testid="${
      this._books["isComplete"] == true
        ? "completeBookList"
        : "incompleteBookList"
    }">
        <!-- 
            Ini adalah struktur HTML untuk masing-masing buku.
            Pastikan susunan elemen beserta atribut data-testid menyesuaikan seperti contoh ini.
          -->
        <div class="book-item" data-bookid="${
          this._books["id"]
        }" data-testid="bookItem">
          <h3 data-testid="bookItemTitle">${this._books["title"]}</h3>
          <p data-testid="bookItemAuthor">Penulis: ${this._books["author"]}</p>
          <p data-testid="bookItemYear">Tahun: ${this._books["year"]}</p>
          <div>
            <button class="complete-btn" data-testid="bookItemIsCompleteButton">${
              this._books["isComplete"] == true
                ? "Belum selesai dibaca"
                : "Selesai dibaca"
            }</button>
            <button class="delete-btn" data-testid="bookItemDeleteButton">Hapus Buku</button>
            <button class="edit-btn" data-testid="bookItemEditButton">Edit Buku</button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("book-item", BookItem);
