import Form from '../Form';
import Card from '../Card';
import Board from '../Board';
import Elements from '../Elements';
import ToDoBoard from '../ToDo';

const card = new Card();
const board = new Board();
const form = new Form();
const elements = new Elements(board, card, form);
const toDoBoard = new ToDoBoard(elements);
toDoBoard.init();

test('t', () => {
  const boardEl = toDoBoard.elements.board;
  expect(boardEl.classList.contains('board')).toBe(true);
});