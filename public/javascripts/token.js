import { drawToken, removeToken } from "./utils/tokenCanvas.js";
class Token {
  static tokenInPot = 21;
  constructor(id, element, draw) {
    this.id = id;
    this.element = element;
    if (draw) {
      this.value = 1;
      element.hidden = false;
      drawToken(element);
    } else {
      element.hidden = true;
      this.value = 0;
    }
  }
  drawIt() {
    this.value = 1;
    this.element.hidden = false;
    drawToken(this.element);
  }
  removeIt() {
    this.value = 0;
    removeToken(this.element);
    this.element.hidden = true;
  }
}
export { Token };
