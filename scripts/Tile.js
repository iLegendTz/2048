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

  setPosition(keyCode) {
    switch (keyCode) {
      case "ArrowUp":
        this.#y = this.#y - 1;
        this.#tileElement.style.setProperty("--y", this.#y);
        break;

      case "ArrowDown":
        this.#y = this.#y + 1;
        this.#tileElement.style.setProperty("--y", this.#y);
        break;

      case "ArrowRight":
        this.#x = this.#x + 1;
        this.#tileElement.style.setProperty("--x", this.#x);
        break;

      case "ArrowLeft":
        this.#x = this.#x - 1;
        this.#tileElement.style.setProperty("--x", this.#x);
        break;

      default:
        break;
    }
  }

  getXPosition() {
    return this.#x;
  }

  getYPosition() {
    return this.#y;
  }
}

export const createTileElement = (boardElement) => {
  const tile = document.createElement("div");
  tile.classList.add("tile");
  boardElement.append(tile);

  return tile;
};
