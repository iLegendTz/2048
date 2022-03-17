import { GRID_SIZE } from "./Grid.js";
import { boardElement, grid } from "./main.js";

export default class Tile {
  #tileElement;
  #x;
  #y;
  #value;

  constructor(tileElement, x, y, value) {
    this.#tileElement = tileElement;
    this.#x = x;
    this.#y = y;
    this.#value = value;

    tileElement.style.setProperty("--x", x);
    tileElement.style.setProperty("--y", y);
    tileElement.append(value);
  }

  static setPosition(keyCode, tiles) {
    const sameTile = (tile1, tile2) => {
      tile1.tileElement.innerHTML = tile1.value * 2;
      tile1.value = tile1.value * 2;
      tile2.tileElement.remove();
      tiles.splice(tiles.indexOf(tile2), 1);

      grid.score += tile1.value;
      document.getElementById("score").innerHTML = "Puntuacion: " + grid.score;
    };

    switch (keyCode) {
      case "ArrowUp":
        for (let i = 1; i < GRID_SIZE; i++) {
          tiles
            .filter((tile) => tile.yPosition === i)
            .map((tile) => {
              const find = tiles.find(
                (t) =>
                  t.xPosition === tile.xPosition &&
                  t.yPosition === tile.yPosition - 1
              );

              if (find == undefined && tile.yPosition > 0) {
                tile.yPosition = tile.yPosition - 1;
                tile.tileElement.style.setProperty("--y", tile.yPosition);
                Tile.setPosition(keyCode, tiles);
                return tiles;
              }

              if (find !== undefined) {
                if (find.value === tile.value) {
                  sameTile(find, tile);
                }
              }
            });
        }

        return tiles;

      case "ArrowDown":
        for (let i = GRID_SIZE - 2; i >= 0; i--) {
          tiles
            .filter((tile) => tile.yPosition === i)
            .map((tile) => {
              const find = tiles.find(
                (t) =>
                  t.xPosition === tile.xPosition &&
                  t.yPosition === tile.yPosition + 1
              );
              if (find == undefined && tile.yPosition < GRID_SIZE - 1) {
                tile.yPosition = tile.yPosition + 1;
                tile.tileElement.style.setProperty("--y", tile.yPosition);
                Tile.setPosition(keyCode, tiles);
                return tiles;
              }

              if (find !== undefined) {
                if (find.value === tile.value) {
                  sameTile(find, tile);
                }
              }
            });
        }

        return tiles;

      case "ArrowRight":
        for (let i = GRID_SIZE - 2; i >= 0; i--) {
          tiles
            .filter((tile) => tile.xPosition === i)
            .map((tile) => {
              const find = tiles.find(
                (t) =>
                  t.xPosition === tile.xPosition + 1 &&
                  t.yPosition === tile.yPosition
              );
              if (find == undefined && tile.xPosition < GRID_SIZE - 1) {
                tile.xPosition = tile.xPosition + 1;
                tile.tileElement.style.setProperty("--x", tile.xPosition);
                Tile.setPosition(keyCode, tiles);
                return tiles;
              }

              if (find !== undefined) {
                if (find.value === tile.value) {
                  sameTile(find, tile);
                }
              }
            });
        }

        return tiles;

      case "ArrowLeft":
        for (let i = 1; i < GRID_SIZE; i++) {
          tiles
            .filter((tile) => tile.xPosition === i)
            .map((tile) => {
              const find = tiles.find(
                (t) =>
                  t.xPosition === tile.xPosition - 1 &&
                  t.yPosition === tile.yPosition
              );

              if (find == undefined && tile.xPosition > 0) {
                tile.xPosition = tile.xPosition - 1;
                tile.tileElement.style.setProperty("--x", tile.xPosition);
                Tile.setPosition(keyCode, tiles);
                return tiles;
              }

              if (find !== undefined) {
                if (find.value === tile.value) {
                  sameTile(find, tile);
                }
              }
            });
        }

        return tiles;

      default:
        break;
    }
  }

  get tileElement() {
    return this.#tileElement;
  }

  set xPosition(x) {
    this.#x = x;
  }

  get xPosition() {
    return this.#x;
  }

  set yPosition(y) {
    this.#y = y;
  }

  get yPosition() {
    return this.#y;
  }

  set value(value) {
    this.#value = value;
  }

  get value() {
    return this.#value;
  }
}

export const createTileElement = (boardElement) => {
  const tile = document.createElement("div");
  tile.classList.add("tile");
  boardElement.append(tile);

  return tile;
};

export const createRandomTile = (tiles) => {
  let newX = Math.floor(Math.random() * GRID_SIZE);
  let newY = Math.floor(Math.random() * GRID_SIZE);
  let tileExists;

  do {
    tileExists = tiles.find(
      (t) => t.xPosition === newX && t.yPosition === newY
    );
    if (tileExists === undefined) {
      tiles.push(new Tile(createTileElement(boardElement), newX, newY, 2));
    } else {
      newX = Math.floor(Math.random() * GRID_SIZE);
      newY = Math.floor(Math.random() * GRID_SIZE);
    }
  } while (tileExists !== undefined);
};
