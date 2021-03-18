import { Dices421 } from "./dice.js";
import { Player } from "./player.js";
import { Token } from "./token.js";

// take players info in sessionStorage and create players
const player1Store = JSON.parse(window.sessionStorage.getItem("player1Info"));
const player2Store = JSON.parse(window.sessionStorage.getItem("player2Info"));
// take tokens canvas (board, player1, player2) and create object for each, draw token in board
const arrTokensBoard = [];
document.querySelectorAll(".token-board").forEach(insertTokenBoard);
const arrTokensP1 = [];
document.querySelectorAll(".token-p1").forEach((el) => insertTokenPlayer(el, 1));
const arrTokensP2 = [];
document.querySelectorAll(".token-p2").forEach((el) => insertTokenPlayer(el, 2));
function insertTokenBoard(element) {
  arrTokensBoard.push(new Token(element.id, element, true));
}
function insertTokenPlayer(element, idPlayer) {
  idPlayer === 1 && arrTokensP1.push(new Token(element.id, element, false));
  idPlayer === 2 && arrTokensP2.push(new Token(element.id, element, false));
}
class Game421 {
  constructor() {
    this.player1 = new Player(1, player1Store.name, player1Store.avatarPath);
    this.player2 = new Player(2, player2Store.name, player2Store.avatarPath);
    this.isPlayingId = 1;
    this.tokensBoardEl = arrTokensBoard;
    this.tokensP1El = arrTokensP1;
    this.tokensP2El = arrTokensP2;
    this.dices = new Dices421("d1-board", "d2-board", "d3-board");
    this.gameRound = "charge";
    //this.addEventOnDices = this.addEventOnDices.bind(window);
  }
  start(restart) {
    if (restart) window.location.reload(); //// TODO add more elegant option for restart
    this.player1.insert();
    this.player2.insert();
    this.player1.state = "play";
    this.addEventOnDices();
  }
  getIsPlayingId() {
    if (this.player1.state === "play") this.isPlayingId = 1;
    else this.isPlayingId = 2;
  }
  addEventOnDices() {
    for (const keyDice in this.dices) {
      if (Object.hasOwnProperty.call(this.dices, keyDice)) {
        const dice = this.dices[keyDice];
        // console.log(dice, window);
        // /if (dice.state === "board") {
        dice.elementHtml.addEventListener(
          "click",
          (ev) => dice.boardToAside(ev, this.isPlayingId),
          { once: true }
        );
        // /}
        // else {
        //   //// voir si utile ou non
        //   dice.elementHtml.addEventListener(
        //     "click",
        //     (ev) => dice.asideToBoard(ev, this.isPlayingId),
        //     { once: true }
        //   );
        // }
      }
    }
  }
  roll() {
    if (this.dices.rollDices()) {
      if (this.gameRound === "charge") {
        //chargeGameRound();
      } else {
        //dechargeGameRound();
      }
    } else {
      return;
    }
  }
}

export { Game421 };
