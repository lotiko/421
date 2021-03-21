/**
 *
 * @author: lotiko
 * @date:  03/2021
 *
 * @summary: all process of 421 game
 */
import { Player } from "../player.js";
import { Game421 } from "../Game421.js";
//////// CONST and LET
let restart = false;
let gameRound = "charge";

const GAME_OBJ = new Game421();
// search in the DOM for useful html elements
const modal = document.getElementById("rules");
const btnRules = document.getElementById("btn-rules");
const spanRules = document.getElementsByClassName("close")[0];
const btnRestart = document.getElementById("restart");
const rollDicesBtn = document.getElementById("roll-dices");
const gameRoundElement = document.getElementById("game-round");
const autoCharge = document.getElementById("auto-charge");
const validateShot = document.getElementById("validate-shot");
const messageBox = document.getElementById("dialog-box");
console.log(GAME_OBJ);
function beginGame() {
  GAME_OBJ.start(restart);
  gameRoundElement.textContent = "Charge";
  validateShot.hidden = true;
  // ROLL DICES
  autoCharge.onclick = () => {
    GAME_OBJ.autoCharge();
    autoCharge.hidden = true;
  };
  rollDicesBtn.addEventListener("click", (ev) => GAME_OBJ.roll());
}
beginGame();
/*
/////////// FUNCTION
function play(playerId) {
  /// ici la vérification prend en compte la possibilité qu'il y ai plus de deux joueur
  for (const player of arrPlayers) {
    if (player.state === "play") {
      player.state = "wait";
    } else if (player.id === playerId) {
      player.state = "play";
    } else {
      continue;
    }
  }
}
function whoIsPlaying() {
  return arrPlayers.find((player) => player.state === "play");
}
function whoIsWaiting() {
  return arrPlayers.find((player) => player.state === "wait");
}*/

/*


function chargeGameRound() {
  let currentPlayer = whoIsPlaying();
  let endFirstRound = false;
  if (currentPlayer.id === 1) {
    dices.setCombi("p1");
    play(2);
    return;
  } else {
    dices.setCombi("p2");
    let resultCompare = dices.compareCombi();

    // let idWinner = resultCompare === "old" ? 1 : resultCompare === "new" ? 2 : false;
    console.log(resultCompare);
    if (resultCompare === 1) {
      let winner = whoIsWaiting();
      endFirstRound = winner.winToken(
        parseInt(dices.objCombi.p1.power),
        arrTokensPlayer1,
        arrTokensBoard
      ); /// parseInt ici car pour évaluer les force il y a des float
      //// TODO message combi
    } else if (resultCompare === 2) {
      endFirstRound = currentPlayer.winToken(
        parseInt(dices.objCombi.p2.power),
        arrTokensPlayer2,
        arrTokensBoard
      ); /// parseInt ici car pour évaluer les force il y a des float
      //// TODO message combi
    } else {
      //// TODO ici mettre logique message égalité
    }
    play(1);
    console.log(endFirstRound);
    if (endFirstRound) return startDecharge();
    return;
  }
}
function startDecharge() {
  console.log("in start decharge");
}
function dechargeGameRound() {
  console.log("in decharge");
}
function keepDiceByPlayer(ev, dice) {
  const playingPlayer = whoIsPlaying();
  dice.boardToAside(playingPlayer.id);
  dice.elementHtml.addEventListener("click", (ev) => diceToBoard(ev, dice), { once: true });
}
function diceToBoard(ev, dice) {
  dice.asideToBoard();
  dice.elementHtml.addEventListener("click", (ev) => keepDiceByPlayer(ev, dice), { once: true });
}

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
//////////////////////
/////////////////////
// RESTART
btnRestart.addEventListener("click", () => insertPlayers());
*/
///////// PROCESS
