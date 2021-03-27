/**
 *
 * @author: lotiko
 * @date:  03/2021
 *
 * @summary: all process of 421 game
 */
import { Game421 } from "../Game421.js";
//////// CONST and LET
let restart = false;
const GAME_OBJ = new Game421();
// search in the DOM for useful html elements
const modal = document.getElementById("rules");
const btnRules = document.getElementById("btn-rules");
const spanRules = document.getElementsByClassName("close")[0];
const btnRestart = document.getElementById("restart");
const rollDicesBtn = document.getElementById("roll-dices");
const changePlayerBtn = document.getElementById("set-players");

const autoCharge = document.getElementById("auto-charge");

// console.log(GAME_OBJ);
function beginGame() {
  GAME_OBJ.start(restart);

  document.getElementById("game-round").textContent = "Charge";
  document.getElementById("validate-shot").hidden = true;
  // ROLL DICES
  autoCharge.onclick = () => {
    GAME_OBJ.autoCharge();
    autoCharge.hidden = true;
  };
  rollDicesBtn.addEventListener("click", (ev) => {
    if (GAME_OBJ.noshot) return;
    GAME_OBJ.roll();
  });
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
  window.location = "index.html";
};
//////////////////////
/////////////////////
// RESTART
btnRestart.addEventListener("click", () => GAME_OBJ.start(true));
