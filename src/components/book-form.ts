export class Bookform extends HTMLElement {
  _style: HTMLStyleElement;

  constructor() {
    super();
    this._style = document.createElement("style");
  }

  updateStyle() {
    this._style.textContent = `
      .card {
        border: 3px solid black;
        padding: 2rem;
        width: 300px;
        translate: -6px -6px;
        box-shadow: 10px 10px 0 black;
        overflow: hidden;
        transition: all 0.3s ease;
        margin: 10% auto;
      }

      .card input, .card button {
        display: block;
        width: 100%;
        margin: 0.5rem 0;
        padding: 0.5rem;
        border: 2px solid black;
        font-size: 1rem;
      }

      .card button {
        translate: -6px -6px;
        overflow: hidden;
        transition: all 0.3s ease;
        cursor: pointer;
        font-size: 1.2rem;
      }

      .card button:hover,
      .card:hover {
        translate: -6px;
      }

      // form {
      //   justify-content: center;
      //   align-items: center;
      //   display: flex;
      //   gap: 10px;
      //   font-size: 1rem;
      // }
    `;
  }

  connectedCallback() {
    this.render();

    const submitForm = this.querySelector("#bookForm") as HTMLFormElement;

    submitForm?.addEventListener("submit", function (e) {
      e.preventDefault();

      const id = Number(new Date());
      const title = (this.querySelector("#bookFormTitle") as HTMLInputElement)
        .value;
      const author = (this.querySelector("#bookFormAuthor") as HTMLInputElement)
        .value;
      const bookYear = (this.querySelector("#bookFormYear") as HTMLInputElement)
        .value;
      const year: number = Number(bookYear);
      const isComplete = (
        this.querySelector("#bookFormIsComplete") as HTMLInputElement
      ).checked;

      const books: BookType = {
        id: id,
        title: title,
        author: author,
        year: year,
        isComplete: isComplete,
      };

      console.log(books);

      console.log("bisa cok");
      submitForm.reset();
    });
  }

  render() {
    this.updateStyle();

    this.innerHTML = `
      ${this._style.outerHTML}

      <section class="card">
        <h2>Tambah Buku Baru</h2>
        <form id="bookForm" data-testid="bookForm">
          <div>
            <label for="bookFormTitle">Judul</label>
            <input id="bookFormTitle" type="text" required data-testid="bookFormTitleInput" />
          </div>
          <div>
            <label for="bookFormAuthor">Penulis</label>
            <input id="bookFormAuthor" type="text" required data-testid="bookFormAuthorInput" />
          </div>
          <div>
            <label for="bookFormYear">Tahun</label>
            <input id="bookFormYear" type="number" required data-testid="bookFormYearInput" />
          </div>
          <div>
            <label for="bookFormIsComplete">Selesai dibaca</label>
            <input id="bookFormIsComplete" type="checkbox" data-testid="bookFormIsCompleteCheckbox" />
          </div>
          <button class="submit-btn" id="bookFormSubmit" type="submit" data-testid="bookFormSubmitButton">
          Masukkan Buku ke rak
          <!-- <span>Belum selesai dibaca</span> -->
          </button>
        </form>
      </section>
    `;
  }
}

customElements.define("book-form", Bookform);
