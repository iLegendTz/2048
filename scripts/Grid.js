import Cell, { createCellsElements } from "./Cell.js";
import Tile, { createTileElement } from "./Tile.js";

export const GRID_SIZE = 4;
export const CELL_SIZE = 20;
export const CELL_GAP = 2;

const INITIAL_TILES_NUMBER = 2;

export default class Grid {
  #cells;
  #tiles;
  #score;

  constructor(boardElement) {
    this.#score = 0;
    boardElement.style.setProperty("--grid-size", GRID_SIZE);
    boardElement.style.setProperty("--cell-size", `${CELL_SIZE}vmin`);
    boardElement.style.setProperty("--cell-gap", `${CELL_GAP}vmin`);
    this.#cells = createCellsElements(boardElement).map(
      (cellElement, index) => {
        return new Cell(
          cellElement,
          index % GRID_SIZE,
          Math.floor(index / GRID_SIZE)
        );
      }
    );

    const getInitialTilesPosition = () => {
      const positions = [];

      let i = 0;
      while (i < INITIAL_TILES_NUMBER) {
        const x = Math.floor(Math.random() * GRID_SIZE);
        const y = Math.floor(Math.random() * GRID_SIZE);

        if (!positions.some((value) => value.x === x && value.y === y)) {
          positions.push({
            x: x,
            y: y,
          });
          i++;
        }
      }
      return positions;
    };

    const createInitialTiles = (positions) => {
      const tiles = [];
      positions.map((position, index) => {
        tiles.push(
          new Tile(
            createTileElement(boardElement),
            position.x,
            position.y,
            index === 0 ? 2 : 4
          )
        );
      });

      return tiles;
    };

    this.#tiles = createInitialTiles(getInitialTilesPosition());
  }

  set tiles(tiles) {
    this.#tiles = tiles;
  }

  get tiles() {
    return this.#tiles;
  }

  set score(score) {
    this.#score = score;
  }

  get score() {
    return this.#score;
  }

  static movementsAvaibleX = (tiles) => {
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

  static movementsAvaibleY = (tiles) => {
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
}
