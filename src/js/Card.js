export default class Card {
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
