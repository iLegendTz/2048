import Cell, { createCellsElements } from "./Cell.js";
import Tile, { createTileElement } from "./Tile.js";

export const GRID_SIZE = 4;
export const CELL_SIZE = 20;
export const CELL_GAP = 2;

const INITIAL_TILES_NUMBER = 2;

export default class Grid {
  #cells;
  #tiles;

  constructor(boardElement) {
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

  getTiles() {
    return this.#tiles;
  }
}
