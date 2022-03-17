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
      if (!movementsAvaibleX(grid.tiles) && !movementsAvaibleY(grid.tiles)) {
        alert("loose");
      }
    }
  }
});

const movementsAvaibleX = (tiles) => {
  for (let i = 1; i < GRID_SIZE; i++) {
    const tilesAux = tiles.filter((tile) => tile.xPosition === i);
    for (let j = 0; j < tilesAux.length; j++) {
      const findX = tiles.find(
        (t) =>
          t.xPosition === tilesAux[j].xPosition - 1 &&
          t.yPosition === tilesAux[j].yPosition
      );
      if (findX.value === tilesAux[j].value) {
        return true;
      }
    }
  }
  return false;
};

const movementsAvaibleY = (tiles) => {
  for (let i = 1; i < GRID_SIZE; i++) {
    const tilesAux = tiles.filter((tile) => tile.yPosition === i);
    for (let j = 0; j < tilesAux.length; j++) {
      const findY = tiles.find(
        (t) =>
          t.xPosition === tilesAux[j].xPosition &&
          t.yPosition === tilesAux[j].yPosition - 1
      );
      if (findY.value === tilesAux[j].value) {
        return true;
      }
    }
  }
  return false;
};
