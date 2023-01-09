export default class Form {
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
