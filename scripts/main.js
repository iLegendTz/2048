import Grid, { GRID_SIZE } from "./Grid.js";
import Tile, { createRandomTile } from "./Tile.js";

export const boardElement = document.getElementById("board");
const scoreElement = document.getElementById("score");

export let grid = new Grid(boardElement);

const newGame = () => {
  while (boardElement.firstChild) {
    boardElement.removeChild(boardElement.lastChild);
  }

  grid = new Grid(boardElement);
  scoreElement.innerHTML = "Puntuacion: " + grid.score;
};

document
  .getElementById("btn-new-game")
  .addEventListener("click", () => newGame());

document.addEventListener("keyup", (e) => {
  if (
    e.code === "ArrowUp" ||
    e.code === "ArrowLeft" ||
    e.code === "ArrowRight" ||
    e.code === "ArrowDown"
  ) {
    grid.tiles = Tile.setPosition(e.key, grid.tiles);
    if (grid.tiles.length < GRID_SIZE * GRID_SIZE) {
      createRandomTile(grid.tiles);
    } else if (grid.tiles.length === GRID_SIZE * GRID_SIZE) {
      if (
        !Grid.movementsAvaibleX(grid.tiles) &&
        !Grid.movementsAvaibleY(grid.tiles)
      ) {
        alert("loose");
      }
    }
  }
});
