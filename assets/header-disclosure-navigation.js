class HeaderDisclosureNavigation extends HTMLElement {
  /** @type {HTMLDetailsElement[]} */
  #details = [];

  connectedCallback() {
    this.#details = [...this.querySelectorAll('details')];
    this.#details.forEach((details) => details.addEventListener('toggle', this.#handleToggle));
    document.addEventListener('click', this.#handleDocumentClick);
    document.addEventListener('keydown', this.#handleKeydown);
  }

  disconnectedCallback() {
    this.#details.forEach((details) => details.removeEventListener('toggle', this.#handleToggle));
    document.removeEventListener('click', this.#handleDocumentClick);
    document.removeEventListener('keydown', this.#handleKeydown);
  }

  /** @param {Event} event */
  #handleToggle = (event) => {
    const current = event.currentTarget;
    if (!(current instanceof HTMLDetailsElement) || !current.open) return;

    this.#details.forEach((details) => {
      if (details !== current) details.open = false;
    });
  };

  /** @param {MouseEvent} event */
  #handleDocumentClick = (event) => {
    if (event.target instanceof Node && this.contains(event.target)) return;
    this.#closeAll();
  };

  /** @param {KeyboardEvent} event */
  #handleKeydown = (event) => {
    if (event.key !== 'Escape') return;

    const openDetails = this.#details.find((details) => details.open);
    if (!openDetails) return;

    openDetails.open = false;
    openDetails.querySelector('summary')?.focus();
  };

  #closeAll() {
    this.#details.forEach((details) => {
      details.open = false;
    });
  }
}

if (!customElements.get('header-disclosure-navigation')) {
  customElements.define('header-disclosure-navigation', HeaderDisclosureNavigation);
}
