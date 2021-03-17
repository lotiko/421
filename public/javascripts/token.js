import { remove } from "./utils/diceCanvas.js";
import { drawToken, removeToken } from "./utils/tokenCanvas.js";
class Token {
  constructor(id, element, draw) {
    this.id = id;
    this.element = element;
    if (draw) {
      this.value = 1;
      drawToken(element);
    } else {
      this.value = 0;
    }
  }
  draw() {
    this.value = 1;
    drawToken(this.element);
  }
  remove() {
    this.value = 0;
    remove(this.element);
  }
}
export { Token };
