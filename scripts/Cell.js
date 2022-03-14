import { GRID_SIZE } from "./Grid.js";

export default class Cell {
  #cellElement;
  #x;
  #y;

  constructor(cellElement, x, y) {
    this.#cellElement = cellElement;
    this.#x = x;
    this.#y = y;
  }
}

export const createCellsElements = (boardElement) => {
  const cells = [];

  for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cells.push(cell);
    boardElement.append(cell);
  }

  return cells;
};
