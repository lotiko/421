import { drawToken, removeToken } from "./utils/tokenCanvas.js";
class Token {
  constructor(id, element, draw) {
    this.id = id;
    this.element = element;
    if (draw) {
      drawToken(element);
    }
  }
}
export { Token };
