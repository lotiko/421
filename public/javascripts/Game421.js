import { Dices421 } from "./dice.js";
import { Player } from "./player.js";
import { Token } from "./token.js";
const log = [];
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
        dice.elementHtml.addEventListener(
          "click",
          (ev) => dice.boardToAside(ev, this.getIsPlayingPlayer().id),
          { once: true }
        );
      }
    }
  }
  roll() {
    console.log(this.getIsPlayingPlayer().turn);
    let withTimeout = this.gameRound === "chargeAuto" ? false : true;
    if (this.dices.rollDices(withTimeout)) {
      if (this.gameRound === "charge") {
        setTimeout(() => this.chargeGameRound(), 1500); // timeout pour ne pas avoir les jetons distribuer avant la fin du lancer
      } else if (this.gameRound === "chargeAuto") {
        // no timeout for automatique gameround else conflict with timeout in rollDices methode of dices class
        this.chargeGameRound();
      } else {
        this.getIsPlayingPlayer().turn++;
        setTimeout(() => this.dechargeGameRound(), 1500);
      }
    } else {
      return;
    }
    console.log(this.getIsPlayingPlayer().turn);
  }
  chargeGameRound() {
    if (this.getIsPlayingPlayer().id === 1) {
      this.player1.combi = this.dices.getCombi();
      this.changeIsPlaying();
      return;
    } else {
      this.player2.combi = this.dices.getCombi();
      let resultCompare = this.dices.compareCombi(this.player1.combi, this.player2.combi);
      let arrTokensPlayerloser = this[`tokensP${resultCompare.loser}Obj`];
      let nbToken = resultCompare.power;
      log.push([resultCompare, this.player1.combi, this.player2.combi]);
      // onjoute les tokens au player perdant
      resultCompare.loser === 1
        ? (this.player1.tokens += nbToken)
        : (this.player2.tokens += nbToken);
      if (typeof arrTokensPlayerloser === "undefined") {
        // console.log("first else + if", this.player1.combi);
        //// TODO ici mettre logique message égalité
      } else {
        let loserPlayer = this[`player${resultCompare.loser}`];
        if (Token.tokenInPot < nbToken) nbToken = Token.tokenInPot;
        loserPlayer.giveToken(nbToken, arrTokensPlayerloser, this.tokensBoardObj);
        Token.tokenInPot -= nbToken;
      }
      if (Token.tokenInPot <= 0) return this.startDecharge(resultCompare.loser);
      this.changeIsPlaying();
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
    this.gameRound = "decharge";
    this.dices.removeDices();
    this.addEventOnDices();
    this.removeCombiPlayers();
    if (loser === 2) {
      // le gagnant du dernier coup commence
      this.changeIsPlaying();
      console.log(
        "in start decharge first if donc loser = 2 => isplying doit étre le 1",
        this.getIsPlayingPlayer()
      );
    }
    messageBox.textContent = `À ${this.getIsPlayingPlayer().name} de jouer`;

    /// TODO les messages de transition + anim transitions decharge

    // activation du bouton garder le coup
    validateShot.hidden = false;
    validateShot.onclick = () => {
      let currentCombi = this.dices.getCombi();
      if (currentCombi === 0) {
        /// TODO voir ici si le ou est utile
        return;
      }
      this.getIsPlayingPlayer().combi = currentCombi;
      this.dechargeGameRound();
    };
  }

  dechargeGameRound() {
    let currentPlayer = this.getIsPlayingPlayer();
    let waitingPlayer = this.getIsWaitingPlayer();
    if (currentPlayer.combi === "") {
      // si le coup n'est pas garder mais que c'est le 3éme lancer on set la combi
      if (!(currentPlayer.turn === 3)) {
        return;
      } else {
        currentPlayer.combi = this.dices.getCombi();
        this.dices.removeDices();
        this.addEventOnDices();
        messageBox.textContent = `À ${
          this.getIsWaitingPlayer().name
        } de jouer\n Il doit faire mieux que ${currentPlayer.combi} en trois.`;
        currentPlayer.turn = 0;
        this.changeIsPlaying(currentPlayer.id);
        // this.dechargeGameRound();
        /// message changement de joueur
        return;
      }
    } else {
      // si un seul joueur a jouer dans le tour rien ne se passe sinon le process se lance
      if (waitingPlayer.combi === "") {
        messageBox.textContent = `À ${
          this.getIsWaitingPlayer().name
        } de jouer\n Il doit faire mieux que ${currentPlayer.combi} en trois.`;
        this.changeIsPlaying(currentPlayer.id);
        this.dices.removeDices();
        this.addEventOnDices();
        return;
      } else {
        let resultCompare = this.dices.compareCombi(this.player1.combi, this.player2.combi);
        let arrTokensPlayerloser = this[`tokensP${resultCompare.loser}Obj`];
        let arrTokensPlayerWinner = resultCompare.loser === 1 ? this.tokensP2Obj : this.tokensP1Obj;
        let nbToken = resultCompare.power;
        if (typeof arrTokensPlayerloser === "undefined") {
          //// TODO ici mettre logique message égalité
          console.log(arrTokensPlayerloser);
        } else {
          let loserPlayer = this[`player${resultCompare.loser}`];
          loserPlayer.giveToken(nbToken, arrTokensPlayerloser, arrTokensPlayerWinner);
          this.addRemovePlayerTokens(resultCompare.loser, nbToken);
          currentPlayer.turn = 0;
          waitingPlayer.turn = 0;
          this.changeIsPlaying(currentPlayer.id);
          this.dices.removeDices();
          this.removeCombiPlayers();
          this.addEventOnDices();
        }
        if (this.player1.tokens >= 21) {
          return this.gameOver(1);
        }
        if (this.player1.tokens <= 0) {
          return this.gameOver(2);
        }
      }
      return;
    }
  }
  gameOver(loser) {
    console.log("gameover");
  }
  addRemovePlayerTokens(loser, nbToken) {
    /// TODO voir ici avec le board
    if (loser === 1) {
      this.player1.tokens += nbToken;
      this.player2.tokens -= nbToken;
    } else {
      this.player1.tokens -= nbToken;
      this.player2.tokens += nbToken;
    }
  }
  removeCombiPlayers() {
    this.player1.combi = "";
    this.player2.combi = "";
  }
  changeIsPlaying(currentIdPlaying) {
    (this.player2.state === "play" && (this.player2.state = "wait")) ||
      (this.player2.state = "play");
    (this.player1.state === "play" && (this.player1.state = "wait")) ||
      (this.player1.state = "play");
  }
}

export { Game421 };
