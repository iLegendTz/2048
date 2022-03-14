import Grid from "./Grid.js";

let boardElement = document.getElementById("board");

let grid = new Grid(boardElement);

document.addEventListener("keyup", (e) => {
  grid.getTiles().map((tile) => tile.setPosition(e.key));
});
