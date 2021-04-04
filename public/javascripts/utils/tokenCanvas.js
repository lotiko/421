/**
 *
 * @author: lotiko
 * @date:  04/2021
 *
 * @summary: token canvas utils
 */

///////// CANVAS UTILS
const dotColor = "#ffff";
const dots = [];
const size = 20;
//define dot locations
function removeToken(tokenEl) {
  tokenEl.width = tokenEl.width; // hack to clean canvas
}
function drawToken(token) {
  if (token.getContext) {
    const ctx = token.getContext("2d");
    token.width = token.width; // hack to clean canvas
    ctx.beginPath();
    // ctx.arc(x, y, radius, startAngle, endAngle)
    ctx.arc(10, 10, 6, 0, Math.PI * 2);
    ctx.lineWidth = 3;
    ctx.strokeStyle = "black"; // !
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(10, 10, 4, 0, Math.PI * 2);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "brown"; // !
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(10, 10, 3, 0, Math.PI * 2);
    ctx.fillStyle = "black"; // !
    ctx.fill();
    ctx.closePath();
  }
}
export { drawToken, removeToken };
