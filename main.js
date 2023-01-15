/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/Board.js
class Board {
  constructor() {
    this.board = null;
  }
  addBoard() {
    this.board = document.createElement("div");
    this.board.classList.add("board");
    this.getMarkup();
  }
  getMarkup() {
    this.board.innerHTML = `
    <div class="column column-todo" data-column='todo'>
      <h2 class="title">todo</h2>
      <div class="content"></div>
      <button class="button button-add">Add another card</button>
      <div class="wrapper-form"></div>
    </div>
    <div class="column column-in-progress" data-column='inProgress'>
      <h2 class="title">in progress</h2>
      <div class="content"></div>
      <button class="button button-add">Add another card</button>
      <div class="wrapper-form"></div>
    </div>
    <div class="column column-done" data-column='done'>
      <h2 class="title">done</h2>
      <div class="content"></div>
      <button class="button button-add">Add another card</button>
      <div class="wrapper-form"></div>
    </div>
    `;
  }
  getBoard() {
    this.addBoard();
    return this.board;
  }
}
;// CONCATENATED MODULE: ./src/js/Card.js
class Card {
  addCard(message) {
    this.card = document.createElement("div");
    this.card.classList.add("card");
    this.getMarkup(message);
  }
  getMarkup(message) {
    this.card.innerHTML = `
    <div class="card-content">${message}</div>
    <button class='button button-card-delete'>x</button>
    <button class='button button-card-deleteConfirm'>Delete ?</button>
    `;
  }
  getCard(message) {
    this.addCard(message);
    return this.card;
  }
}
;// CONCATENATED MODULE: ./src/js/Form.js
class Form {
  init() {
    this.addElements();
  }
  addElements() {
    this.addForm();
  }
  addForm() {
    this.form = document.createElement("form");
    this.form.classList.add("form");
    this.addFormMarkup();
  }
  addFormMarkup() {
    this.form.innerHTML = `
    <textarea class="form-message" rows='4' placeholder='Write a task...' contenteditable></textarea>
    <div class="form-controls">
      <button class="button button-form button-form-add">Add another card</button>
      <button class="button button-form button-form-cancel">x</button>
    </div>
    `;
  }
  getForm() {
    this.init();
    return this.form;
  }
}
;// CONCATENATED MODULE: ./src/js/Elements.js
class Elements {
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
    Array.from(wrappersForm).forEach(e => {
      e.innerHTML = "";
    });
  }
  resetButtonsAdd() {
    const buttons = this.container.getElementsByClassName("button-add");
    Array.from(buttons).forEach(e => {
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
    e.closest(".column").querySelector(".content").appendChild(this.card.getCard(message));
    this.resetView();
  }
  addAllCards(name, array) {
    const column = this.board.querySelector(`[data-column=${name}]`);
    const content = column.querySelector(".content");
    array.forEach(e => {
      content.appendChild(this.card.getCard(e));
    });
  }
  resetButtonsDelete() {
    const buttons = this.container.getElementsByClassName("button-card-delete");
    Array.from(buttons).forEach(e => {
      e.removeAttribute("style");
    });
    const buttonsConfirm = this.container.getElementsByClassName("button-card-deleteConfirm");
    Array.from(buttonsConfirm).forEach(e => {
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
    hint.style.top = `${parent.closest(".label").getBoundingClientRect().top - 10}px`;
    hint.style.left = `${parent.getBoundingClientRect().right - hint.getBoundingClientRect().width}px`;
    hint.classList.add("hint-active");
  }
  resetHint() {
    const hints = this.form.querySelectorAll(".hint");
    hints.forEach(e => {
      e.textContent = "";
      e.classList.remove("hint-active");
    });
  }
}
;// CONCATENATED MODULE: ./src/js/ToDo.js
class ToDoBoard {
  constructor(elements) {
    this.elements = elements;
    this.storage = localStorage;
    this.allCards = {};
    this.funcMouseOver = this.mouseOver.bind(this);
  }
  init() {
    this.resetEl();
    this.elements.init();
    this.loadCards();
    this.addListeners();
  }
  addListeners() {
    this.elements.container.addEventListener("click", this.clickLogic.bind(this));
    this.elements.board.addEventListener("mousedown", this.mouseDown.bind(this));
    this.elements.board.addEventListener("mousemove", this.mouseMove.bind(this));
    this.elements.board.addEventListener("mouseleave", this.mouseLeave.bind(this));
    this.elements.board.addEventListener("mouseup", this.mouseUp.bind(this));
    this.addContentsListener();
  }
  addContentsListener() {
    const cards = this.elements.board.querySelectorAll(".content");
    cards.forEach(e => {
      e.addEventListener("mouseover", this.funcMouseOver);
    });
  }
  resetEl() {
    this.dragEl = null;
    this.testEl = null;
    this.ghostEl = null;
    this.elements.board.removeAttribute("style");
  }
  clickLogic(e) {
    e.preventDefault();
    this.elements.resetButtonsDelete();
    if (e.target.classList.contains("button-add")) {
      this.elements.showForm(e.target);
    }
    if (e.target.classList.contains("button-form-add")) {
      this.elements.addCard(e.target);
    }
    if (e.target.classList.contains("button-form-cancel")) {
      this.elements.resetView();
    }
    if (e.target.classList.contains("button-card-delete")) {
      this.elements.showConfirmDelete(e.target);
    }
    if (e.target.classList.contains("button-card-deleteConfirm")) {
      this.elements.constructor.deleteCard(e.target);
    }
    this.saveCards();
  }
  mouseDown(e) {
    if (!e.target.closest(".card")) {
      return;
    }
    if (e.target.classList.contains("button-card-delete")) {
      return;
    }
    if (e.target.classList.contains("button-card-deleteConfirm")) {
      return;
    }
    e.preventDefault();
    this.dragEl = e.target.closest(".card");
    this.testEl = this.dragEl.cloneNode(true);
    this.testEl.classList.add("test");
    this.ghostEl = this.dragEl.cloneNode(true);
    this.ghostEl.classList.add("dragged");
    const {
      top,
      left
    } = this.dragEl.getBoundingClientRect();
    this.topDiff = e.pageY - top;
    this.leftDiff = e.pageX - left;
    this.elements.container.appendChild(this.ghostEl);
    this.ghostEl.style.left = `${left}px`;
    this.ghostEl.style.top = `${top}px`;
    this.ghostEl.style.width = `${this.dragEl.offsetWidth}px`;
    this.saveDragElPosition();
    this.ghostEl.style.cursor = "grabbing";
  }
  saveDragElPosition() {
    this.parent = this.dragEl.closest(".content");
    this.sibling = this.dragEl.nextElementSibling;
  }
  mouseMove(e) {
    if (!this.dragEl) {
      return;
    }
    e.preventDefault();
    this.elements.board.style.cursor = "grabbing";
    this.ghostEl.style.left = `${e.pageX - this.leftDiff}px`;
    this.ghostEl.style.top = `${e.pageY - this.topDiff}px`;
  }
  mouseUp(e) {
    if (!this.dragEl) {
      return;
    }
    if (!this.elements.board.querySelector(".test")) {
      this.elements.container.removeChild(this.ghostEl);
      this.resetEl();
      return;
    }
    if (e.target.closest(".content")) {
      this.testEl.classList.remove("test");
      this.parent.removeChild(this.dragEl);
      this.saveCards();
    } else {
      this.testEl.closest(".content").removeChild(this.testEl);
      this.parent.insertBefore(this.dragEl, this.sibling);
    }
    this.elements.container.removeChild(this.ghostEl);
    this.resetEl();
  }
  mouseLeave() {
    if (!this.dragEl) {
      return;
    }
    this.testEl.closest(".content").removeChild(this.testEl);
    this.elements.container.removeChild(this.ghostEl);
    this.parent.insertBefore(this.dragEl, this.sibling);
    this.resetEl();
  }
  mouseOver(e) {
    if (!this.ghostEl) {
      return;
    }
    if (!e.target.closest(".content").hasChildNodes()) {
      e.target.closest(".content").appendChild(this.testEl);
    }
    const closestEl = e.target.closest(".card");
    if (!closestEl) {
      return;
    }
    const {
      top
    } = closestEl.getBoundingClientRect();
    if (e.pageY > window.scrollY + top + closestEl.offsetHeight / 2) {
      e.target.closest(".content").insertBefore(this.testEl, closestEl.nextElementSibling);
    } else {
      e.target.closest(".content").insertBefore(this.testEl, closestEl);
    }
  }
  clearStorage() {
    this.storage.removeItem("boardToDo");
  }
  saveCards() {
    const columns = this.elements.board.getElementsByClassName("column");
    Array.from(columns).forEach(e => {
      this.allCards[e.dataset.column] = [];
    });
    const cardsContent = this.elements.board.getElementsByClassName("card-content");
    Array.from(cardsContent).forEach(e => {
      const column = e.closest(".column");
      this.allCards[column.dataset.column].push(e.textContent);
    });
    if (this.storage.getItem("boardToDo")) {
      this.clearStorage();
    }
    this.storage.setItem("boardToDo", JSON.stringify(this.allCards));
  }
  loadCards() {
    if (!this.storage.getItem("boardToDo")) {
      return;
    }
    this.allCards = JSON.parse(this.storage.getItem("boardToDo"));
    for (const [key, value] of Object.entries(this.allCards)) {
      this.elements.addAllCards(key, value);
    }
  }
}
;// CONCATENATED MODULE: ./src/js/app.js





const app_elements = new Elements(new Board(), new Card(), new Form());
const todo = new ToDoBoard(app_elements);
todo.init();
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;