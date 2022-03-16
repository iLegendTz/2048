import { GRID_SIZE } from "./Grid.js";
import { boardElement } from "./main.js";

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
    switch (keyCode) {
      case "ArrowUp":
        for (let i = 1; i < GRID_SIZE; i++) {
          tiles
            .filter((tile) => tile.getYPosition() === i)
            .map((tile) => {
              const find = tiles.find(
                (t) =>
                  t.getXPosition() === tile.getXPosition() &&
                  t.getYPosition() === tile.getYPosition() - 1
              );

              if (find == undefined && tile.getYPosition() > 0) {
                tile.setYPosition(tile.getYPosition() - 1);
                tile
                  .getTileElement()
                  .style.setProperty("--y", tile.getYPosition());
                Tile.setPosition(keyCode, tiles);
                return tiles;
              }

              if (find !== undefined) {
                if (find.getValue() === tile.getValue()) {
                  find.getTileElement().innerHTML = find.getValue() * 2;
                  find.setValue(find.getValue() * 2);
                  tile.getTileElement().remove();
                  tiles.splice(tiles.indexOf(tile), 1);
                }
              }
            });
        }

        return tiles;

      case "ArrowDown":
        for (let i = GRID_SIZE - 2; i >= 0; i--) {
          tiles
            .filter((tile) => tile.getYPosition() === i)
            .map((tile) => {
              const find = tiles.find(
                (t) =>
                  t.getXPosition() === tile.getXPosition() &&
                  t.getYPosition() === tile.getYPosition() + 1
              );
              if (find == undefined && tile.getYPosition() < GRID_SIZE - 1) {
                tile.setYPosition(tile.getYPosition() + 1);
                tile
                  .getTileElement()
                  .style.setProperty("--y", tile.getYPosition());
                Tile.setPosition(keyCode, tiles);
                return tiles;
              }

              if (find !== undefined) {
                if (find.getValue() === tile.getValue()) {
                  find.getTileElement().innerHTML = find.getValue() * 2;
                  find.setValue(find.getValue() * 2);
                  tile.getTileElement().remove();
                  tiles.splice(tiles.indexOf(tile), 1);
                }
              }
            });
        }

        return tiles;

      case "ArrowRight":
        for (let i = GRID_SIZE - 2; i >= 0; i--) {
          tiles
            .filter((tile) => tile.getXPosition() === i)
            .map((tile) => {
              const find = tiles.find(
                (t) =>
                  t.getXPosition() === tile.getXPosition() + 1 &&
                  t.getYPosition() === tile.getYPosition()
              );
              if (find == undefined && tile.getXPosition() < GRID_SIZE - 1) {
                tile.setXPosition(tile.getXPosition() + 1);
                tile
                  .getTileElement()
                  .style.setProperty("--x", tile.getXPosition());
                Tile.setPosition(keyCode, tiles);
                return tiles;
              }

              if (find !== undefined) {
                if (find.getValue() === tile.getValue()) {
                  find.getTileElement().innerHTML = find.getValue() * 2;
                  find.setValue(find.getValue() * 2);
                  tile.getTileElement().remove();
                  tiles.splice(tiles.indexOf(tile), 1);
                }
              }
            });
        }

        return tiles;

      case "ArrowLeft":
        for (let i = 1; i < GRID_SIZE; i++) {
          tiles
            .filter((tile) => tile.getXPosition() === i)
            .map((tile) => {
              const find = tiles.find(
                (t) =>
                  t.getXPosition() === tile.getXPosition() - 1 &&
                  t.getYPosition() === tile.getYPosition()
              );

              if (find == undefined && tile.getXPosition() > 0) {
                tile.setXPosition(tile.getXPosition() - 1);
                tile
                  .getTileElement()
                  .style.setProperty("--x", tile.getXPosition());
                Tile.setPosition(keyCode, tiles);
                return tiles;
              }

              if (find !== undefined) {
                if (find.getValue() === tile.getValue()) {
                  find.getTileElement().innerHTML = find.getValue() * 2;
                  find.setValue(find.getValue() * 2);
                  tile.getTileElement().remove();
                  tiles.splice(tiles.indexOf(tile), 1);
                }
              }
            });
        }

        return tiles;

      default:
        break;
    }
  }

  getTileElement() {
    return this.#tileElement;
  }

  setXPosition(x) {
    this.#x = x;
  }

  getXPosition() {
    return this.#x;
  }

  setYPosition(y) {
    this.#y = y;
  }

  getYPosition() {
    return this.#y;
  }

  setValue(value) {
    this.#value = value;
  }

  getValue() {
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
      (t) => t.getXPosition() === newX && t.getYPosition() === newY
    );
    if (tileExists === undefined) {
      tiles.push(new Tile(createTileElement(boardElement), newX, newY, 2));
    } else {
      newX = Math.floor(Math.random() * GRID_SIZE);
      newY = Math.floor(Math.random() * GRID_SIZE);
    }
  } while (tileExists !== undefined);
};
