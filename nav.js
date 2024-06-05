customElements.define('notes-navbar', class extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const navbar = document.createElement('div');
    navbar.classList.add('notes-navbar');
    navbar.style.backgroundColor = '#ccc';
    navbar.style.borderRadius = '5px';
    navbar.style.padding = '10px';
    navbar.style.display = 'flex';
    navbar.style.justifyContent = 'center';

    const title = document.createElement('h1');
    title.textContent = 'NotesApp';
    title.style.color = 'black';
    title.style.margin = '0';

    navbar.appendChild(title);

    this.shadow.appendChild(navbar);
  }
});
