import { Dices421 } from "./dice.js";
import { Player } from "./player.js";
import { Token } from "./token.js";
const gameRoundElement = document.getElementById("game-round");
const validateShot = document.getElementById("validate-shot");
const messageBox = document.getElementById("dialog-box");
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
    this.tokensBoardObj = arrTokensBoard;
    this.tokensP1Obj = arrTokensP1;
    this.tokensP2Obj = arrTokensP2;
    this.dices = new Dices421("d1-board", "d2-board", "d3-board");
    this.gameRound = "charge";
    //this.addEventOnDices = this.addEventOnDices.bind(window);
  }
  start(restart) {
    if (restart) {
      window.location.reload();
      return;
    } //// TODO add more elegant option for restart
    this.player1.insert();
    this.player2.insert();
    this.player1.state = "play";
    this.addEventOnDices();
  }
  setIsPlayingId() {
    if (this.player1.state === "play") this.isPlayingId = 1;
    else this.isPlayingId = 2;
  }
  getIsPlayingPlayer() {
    if (this.player1.state === "play") return this.player1;
    else return this.player2;
  }
  getIsWaitingPlayer() {
    if (this.player1.state === "play") return this.player2;
    else return this.player1;
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
    if (this.dices.rollDices(this.gameRound === "charge")) {
      if (this.gameRound === "charge") {
        setTimeout(() => this.chargeGameRound(), 1500); // timeout pour ne pas avoir les jetons distribuer avant la fin du lancer
      } else if (this.gameRound === "chargeAuto") {
        // no timeout for automatique gameround else conflict with timeout in rollDices methode of dices class
        this.chargeGameRound();
      } else {
        setTimeout(() => this.dechargeGameRound(), 1500);
      }
    } else {
      return;
    }
  }
  chargeGameRound() {
    this.setIsPlayingId();
    if (this.isPlayingId === 1) {
      this.player1.combi = this.dices.getCombi();
      this.changeIsPlaying();
      return;
    } else {
      this.player2.combi = this.dices.getCombi();
      let resultCompare = this.dices.compareCombi(this.player1.combi, this.player2.combi);
      let arrTokensPlayerloser = this[`tokensP${resultCompare.loser}Obj`];
      let nbToken = Math.floor(resultCompare.power);

      if (typeof arrTokensPlayerloser === "undefined") {
        //// TODO ici mettre logique message égalité
        console.log(arrTokensPlayerloser);
      } else {
        let loserPlayer = this[`player${resultCompare.loser}`];
        loserPlayer.giveToken(nbToken, arrTokensPlayerloser, this.tokensBoardObj);
        Token.tokenInPot -= nbToken;
      }
      this.changeIsPlaying();
      if (Token.tokenInPot <= 0) this.startDecharge(resultCompare.loser);
    }
    return;
  }
  autoCharge() {
    this.gameRound = "chargeAuto";
    while (Token.tokenInPot > 0) {
      this.roll();
    }
  }
  startDecharge(loser) {
    console.log("in decharge");
    this.gameRound = "decharge";
    this.dices.removeDices();
    this.removeCombiPlayers();
    if (loser === 2) {
      // le gagnant du dernier coup commence
      this.changeIsPlaying();
    }
    messageBox.textContent = `À ${this.getIsPlayingPlayer().name} de jouer`;
    /// TODO les messages de transition + anim transitions decharge
    validateShot.hidden = false;
    validateShot.onclick = () => {
      let currentCombi = this.dices.getCombi();
      console.log(currentCombi);
      if (currentCombi === "000" || this.getIsPlayingPlayer().turn === 0) {
        return;
      }
      this.getIsPlayingPlayer().combi = currentCombi;
      this.dechargeGameRound();
    };
    this.dechargeGameRound();
  }
  dechargeGameRound() {
    let currentPlayer = this.getIsPlayingPlayer();
    let waitingPlayer = this.getIsWaitingPlayer();
    console.log(currentPlayer.combi);
    if (currentPlayer.combi === "" && currentPlayer.turn !== 3) {
      return;
    } else {
      if (currentPlayer.turn !== 3) {
      }
    }

    // console.log(this[`player${this.getIsPlayingId()}`].turn);
    // if (this.isPlayingId)
  }
  removeCombiPlayers() {
    this.player1.combi = "";
    this.player2.combi = "";
  }
  // setCombiFirstTurn(player) {
  //   player.combi = this.dices.getCombi();
  // }
  changeIsPlaying(currentIdPlaying) {
    (this.player2.state === "play" && (this.player2.state = "wait")) ||
      (this.player2.state = "play");
    (this.player1.state === "play" && (this.player1.state = "wait")) ||
      (this.player1.state = "play");
  }
}

export { Game421 };
