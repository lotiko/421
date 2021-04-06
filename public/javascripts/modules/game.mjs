/**
 *
 * @author: lotiko
 * @date:  03/2021
 *
 * @summary: starting point of 421 game
 */
import { Game421 } from "../Game421.js";
//////// CONST and LET
const GAME_OBJ = new Game421();
// search in the DOM for useful html elements
const modal = document.getElementById("rules");
const btnRules = document.getElementById("btn-rules");
const spanRules = document.getElementsByClassName("close")[0];
const changePlayerBtn = document.getElementById("set-players");
window.sessionStorage.setItem("score1", "0");
window.sessionStorage.setItem("score2", "0");

// console.log(GAME_OBJ);
function beginGame() {
  GAME_OBJ.start();
}
window.onload = () => beginGame();
///////// EVENTS//////////////////////////////////////
///////// MODAL RULES
// When the user clicks on the button, open the modal
btnRules.onclick = function () {
  modal.style.display = "block";
};
// When the user clicks on <span> (x), close the modal
spanRules.onclick = function () {
  modal.style.display = "none";
};
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};
//// CHANGE PLAYER
changePlayerBtn.onclick = () => {
  window.sessionStorage.removeItem("player1Info");
  window.sessionStorage.removeItem("player2Info");
  window.sessionStorage.setItem("score1", 0);
  window.sessionStorage.setItem("score2", 0);
  window.location = "index.html";
};
//////////////////////
/////////////////////
