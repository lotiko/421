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
  drawIt() {
    this.value = 1;
    drawToken(this.element);
  }
  removeIt() {
    this.value = 0;
    removeToken(this.element);
  }
}
export { Token };
