import Board from "./Board";
import Card from "./Card";
import Form from "./Form";
import Elements from "./Elements";
import ToDoBoard from "./ToDo";

const elements = new Elements(new Board(), new Card(), new Form());
const todo = new ToDoBoard(elements);
todo.init();
