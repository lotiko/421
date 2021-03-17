/**
 *
 * @author: lotiko
 * @date:  03/2021
 *
 * @summary: all process of 421 game
 */
import { Player } from "../player.js";
import { Dices421 } from "../dice.js";
import { Token } from "../token.js";
//////// CONST and LET
let restart = false;
let gameRound = "charge";
const arrCompareCombi = [];
// creates dice groups
const dices = new Dices421("d1-board", "d2-board", "d3-board");
// take players info in sessionStorage and create players
const player1Store = JSON.parse(window.sessionStorage.getItem("player1Info"));
const player2Store = JSON.parse(window.sessionStorage.getItem("player2Info"));
const arrPlayers = [
  new Player(1, player1Store.name, player1Store.avatarPath),
  new Player(2, player2Store.name, player2Store.avatarPath),
];
// take tokens canvas (board, player1, player2) and create object for each, draw token in board
const arrTokensBoard = document.querySelectorAll(".token-board").forEach(insertTokenBoard);
const arrTokensPlayer1 = document.querySelectorAll(".token-p1").forEach(insertTokenPlayer);
const arrTokensPlayer2 = document.querySelectorAll(".token-p2").forEach(insertTokenPlayer);
function insertTokenBoard(element) {
  return new Token(element.id, element, true);
}
function insertTokenPlayer(element) {
  return new Token(element.id, element, false);
}
// search in the DOM for useful html elements
const modal = document.getElementById("rules");
const btnRules = document.getElementById("btn-rules");
const spanRules = document.getElementsByClassName("close")[0];
const btnRestart = document.getElementById("restart");
const rollDicesBtn = document.getElementById("roll-dices");
const gameRound = document.getElementById("game-round");
const validateShot = document.getElementById("validate-shot");
const messageBox = document.getElementById("dialog-box");
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
function isPlaying() {
  return arrPlayers.find((player) => player.state === "play");
}
function insertPlayers() {
  if (restart) window.location.reload(); //// TODO add more elegant option for restart
  for (const player of arrPlayers) {
    player.elements.title.textContent = player.name;
    player.elements.name.textContent = player.name;
    player.elements.avatar.setAttribute("src", player.avatar);
    if (player.id === 1) {
      play(1);
    }
  }
  gameRound.textContent = "Charge";
  validateShot.hidden = true;
  restart = true;
}
function roll() {
  let diceToRoll = dices.rollDices();
  if (diceToRoll === 0) return;
  if (gameRound === "charge") {
    chargeGameRound();
  } else {
    if (diceToRoll > 0) isPlaying().turn++;
  }
}

function chargeGameRound() {
  let currentPlayer = isPlaying();

  if (currentPlayer.id === 1) {
    arrCompareCombi.push();
  }
}
function keepDiceByPlayer(ev, dice) {
  const playingPlayer = isPlaying();
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
// ROLL DICES
rollDicesBtn.addEventListener("click", roll);
/////////////////////
// RESTART
btnRestart.addEventListener("click", () => insertPlayers());

///////// PROCESS
insertPlayers();
window.addEventListener("load", () => {
  for (const keyDice in dices) {
    if (Object.hasOwnProperty.call(dices, keyDice)) {
      const dice = dices[keyDice];
      dice.elementHtml.addEventListener("click", (ev) => keepDiceByPlayer(ev, dice), {
        once: true,
      });
    }
  }
});
