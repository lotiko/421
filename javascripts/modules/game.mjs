/**
 *
 * @author: lotiko
 * @date:  03/2021
 *
 * @summary: all process of 421 game
 */
import { Player } from "../player.js";
import { Dices421 } from "../dice.js";
//////// CONST and LET
let diceRollTurn = 1;
let restart = false;
// creates dice groups
const dices = new Dices421("d1-board", "d2-board", "d3-board");
// const dices = { d1: new Dice("d1-board"), d2: new Dice("d2-board"), d3: new Dice("d3-board") };
// const dicesPlayers = {
//   1: { d1: new Dice("d1-p1"), d2: new Dice("d2-p1"), d3: new Dice("d3-p1") },
//   2: { d1: new Dice("d1-p2"), d2: new Dice("d1-p2"), d3: new Dice("d1-p2") },
// };
// take players info in sessionStorage and create players
const player1Store = JSON.parse(window.sessionStorage.getItem("player1Info"));
const player2Store = JSON.parse(window.sessionStorage.getItem("player2Info"));
const arrPlayers = [
  new Player(1, player1Store.name, player1Store.avatarPath),
  new Player(2, player2Store.name, player2Store.avatarPath),
];
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

// search in the DOM for useful html elements
const modal = document.getElementById("rules");
const btnRules = document.getElementById("btn-rules");
const spanRules = document.getElementsByClassName("close")[0];
const btnRestart = document.getElementById("restart");
const rollDicesBtn = document.getElementById("roll-dices");
const messageBox = document.getElementById("dialog-box");

/////////// FUNCTION

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
  restart = true;
}
function roll() {
  dices.rollDices();
  isPlaying().turn++;
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

const powerByCombinaisons = {
  124: 8,
  111: 7,
  116: 6.5,
  666: 6,
  115: 5.5,
  555: 5,
  114: 4.5,
  444: 4,
  113: 3.5,
  333: 3,
  112: 2.6,
  222: 2.5,
  456: 2.4,
  345: 2.3,
  234: 2.2,
  123: 2.1,
  221: -2,
};
