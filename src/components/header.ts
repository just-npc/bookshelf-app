export class CustomHeader extends HTMLElement {
  _style: HTMLStyleElement;
  constructor() {
    super();
    this._style = document.createElement("style");
  }

  updateStyle() {
    this._style.textContent = `
        custom-header {
            padding: 1rem;
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

        <header>
            <h1>Bookshelf App with Webpack and Typescript</h1>
        </header>
    `;
  }
}

customElements.define("custom-header", CustomHeader);
