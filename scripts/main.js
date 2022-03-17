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
    grid.setTiles(Tile.setPosition(e.key, grid.getTiles()));
    if (grid.getTiles().length < GRID_SIZE * GRID_SIZE) {
      createRandomTile(grid.getTiles());
    } else if (grid.getTiles().length === GRID_SIZE * GRID_SIZE) {
      if (
        !movementsAvaibleX(grid.getTiles()) &&
        !movementsAvaibleY(grid.getTiles())
      ) {
        alert("loose");
      }
    }
  }
});

const movementsAvaibleX = (tiles) => {
  for (let i = 1; i < GRID_SIZE; i++) {
    const tilesAux = tiles.filter((tile) => tile.getXPosition() === i);
    for (let j = 0; j < tilesAux.length; j++) {
      const findX = tiles.find(
        (t) =>
          t.getXPosition() === tilesAux[j].getXPosition() - 1 &&
          t.getYPosition() === tilesAux[j].getYPosition()
      );
      if (findX.getValue() === tilesAux[j].getValue()) {
        return true;
      }
    }
  }
  return false;
};

const movementsAvaibleY = (tiles) => {
  for (let i = 1; i < GRID_SIZE; i++) {
    const tilesAux = tiles.filter((tile) => tile.getYPosition() === i);
    for (let j = 0; j < tilesAux.length; j++) {
      const findY = tiles.find(
        (t) =>
          t.getXPosition() === tilesAux[j].getXPosition() &&
          t.getYPosition() === tilesAux[j].getYPosition() - 1
      );
      if (findY.getValue() === tilesAux[j].getValue()) {
        return true;
      }
    }
  }
  return false;
};
