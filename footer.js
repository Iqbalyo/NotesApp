customElements.define('notes-fo', class extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const navbar = document.createElement('div');
    navbar.classList.add('notes-fo');
    navbar.style.backgroundColor = '#ddd';
    navbar.style.borderRadius = '5px';
    navbar.style.padding = '10px';
    navbar.style.display = 'flex';
    navbar.style.marginTop = '10px';
    navbar.style.justifyContent = 'center';

    const title = document.createElement('h1');
    title.textContent = 'Dicoding Project';
    title.style.color = 'black';
    title.style.margin = '0';

    navbar.appendChild(title);

    this.shadow.appendChild(navbar);
  }
});
