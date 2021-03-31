/**
 *
 * @author: lotiko
 * @date:  03/2021
 *
 * @summary: all process of 421 game
 */
import { Game421 } from "../Game421.js";
//////// CONST and LET
const GAME_OBJ = new Game421();
// search in the DOM for useful html elements
const modal = document.getElementById("rules");
const btnRules = document.getElementById("btn-rules");
const spanRules = document.getElementsByClassName("close")[0];
const btnRestart = document.getElementById("restart");
const rollDicesBtn = document.getElementById("roll-dices");
const changePlayerBtn = document.getElementById("set-players");
const scoreBox = document.getElementById("score");

const autoCharge = document.getElementById("auto-charge");
window.sessionStorage.setItem("score1", "0");
window.sessionStorage.setItem("score2", "0");

// console.log(GAME_OBJ);
function beginGame() {
  GAME_OBJ.start();
  autoCharge.hidden = false;
  console.log(window.sessionStorage);
  let score1 = window.sessionStorage.getItem("score1");
  let score2 = window.sessionStorage.getItem("score2");
  scoreBox.textContent = `Score:
  ${GAME_OBJ.player1.name}: ${score1}
  ${GAME_OBJ.player2.name}: ${score2}`;
  document.getElementById("game-round").textContent = "Charge";
  document.getElementById("validate-shot").hidden = true;
  // ROLL DICES
  autoCharge.onclick = () => {
    GAME_OBJ.autoCharge();
    autoCharge.hidden = true;
  };
  rollDicesBtn.onclick = (ev) => {
    if (GAME_OBJ.noshot) return;
    GAME_OBJ.roll();
  };
  btnRestart.onclick = () => beginGame();
}
beginGame();
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

changePlayerBtn.onclick = () => {
  window.sessionStorage.removeItem("player1Info");
  window.sessionStorage.removeItem("player2Info");
  window.sessionStorage.setItem("score1", 0);
  window.sessionStorage.setItem("score2", 0);
  window.location = "index.html";
};
//////////////////////
/////////////////////
