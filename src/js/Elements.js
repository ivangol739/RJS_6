export default class Elements {
  constructor(board, card, form) {
    this.board = board.getBoard();
    this.card = card;
    this.form = form;
    this.body = document.getElementsByTagName("body")[0];
  }

  init() {
    this.addElements();
    this.body.insertAdjacentElement("afterbegin", this.container);
    this.container.appendChild(this.board);
  }

  addElements() {
    this.addContainer();
  }

  addContainer() {
    this.container = document.createElement("div");
    this.container.classList.add("container");
  }

  hideForm() {
    const wrappersForm = this.container.getElementsByClassName("wrapper-form");
    Array.from(wrappersForm).forEach((e) => {
      e.innerHTML = "";
    });
  }

  resetButtonsAdd() {
    const buttons = this.container.getElementsByClassName("button-add");
    Array.from(buttons).forEach((e) => {
      e.style.display = "block";
    });
  }

  resetView() {
    this.hideForm();
    this.resetButtonsAdd();
  }

  showForm(e) {
    this.resetView();

    e.style.display = "none";
    e.nextElementSibling.appendChild(this.form.getForm());
    this.board.querySelector(".form-message").focus();
  }

  addCard(e) {
    const message = e.closest(".form").querySelector(".form-message").value;

    if (!message.trim()) {
      this.board.querySelector(".form-message").focus();

      return;
    }

    e.closest(".column")
      .querySelector(".content")
      .appendChild(this.card.getCard(message));
    this.resetView();
  }

  addAllCards(name, array) {
    const column = this.board.querySelector(`[data-column=${name}]`);
    const content = column.querySelector(".content");

    array.forEach((e) => {
      content.appendChild(this.card.getCard(e));
    });
  }

  resetButtonsDelete() {
    const buttons = this.container.getElementsByClassName("button-card-delete");
    Array.from(buttons).forEach((e) => {
      e.removeAttribute("style");
    });

    const buttonsConfirm = this.container.getElementsByClassName(
      "button-card-deleteConfirm"
    );
    Array.from(buttonsConfirm).forEach((e) => {
      e.style.display = "none";
    });
  }

  showConfirmDelete(e) {
    this.resetButtonsDelete();

    e.style.display = "none";
    e.nextElementSibling.style.display = "block";
  }

  static deleteCard(e) {
    const content = e.closest(".content");
    content.removeChild(e.closest(".card"));
  }

  showHint(e, message) {
    const parent = this.form.querySelector(`.field-${e}`);
    const hint = parent.nextElementSibling;
    hint.textContent = message;
    hint.style.top = `${
      parent.closest(".label").getBoundingClientRect().top - 10
    }px`;
    hint.style.left = `${
      parent.getBoundingClientRect().right - hint.getBoundingClientRect().width
    }px`;
    hint.classList.add("hint-active");
  }

  resetHint() {
    const hints = this.form.querySelectorAll(".hint");
    hints.forEach((e) => {
      e.textContent = "";
      e.classList.remove("hint-active");
    });
  }
}
