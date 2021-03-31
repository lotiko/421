import { Dices421 } from "./dice.js";
import { Player } from "./player.js";
import { Token } from "./token.js";
const messageCombi = {
  124: "421",
  111: "Mac 1",
  116: "Mac 6",
  666: "Brelan de 6",
  115: "Mac 5",
  555: "Brelan de 5",
  114: "Mac 4",
  444: "Brelan de 4",
  113: "Mac 3",
  333: "Brelan de trois",
  112: "Mac 2",
  222: "Brelan de 2",
  456: "Suite aux 6",
  345: "Suite aux 5",
  234: "Suite aux 4",
  123: "Suite aux 3",
};
const btnRestart = document.getElementById("restart");
const rollDicesBtn = document.getElementById("roll-dices");
const scoreBox = document.getElementById("score");
const autoCharge = document.getElementById("auto-charge");
let arrTokensP2 = [];
let arrTokensP1 = [];
let arrTokensBoard = [];
const gameRoundElement = document.getElementById("game-round");
const validateShot = document.getElementById("validate-shot");
let isValidateEvent = false;
const messageBox = document.getElementById("dialog-box");
let pot = document.getElementById("pot");
pot = document.getElementById("gameboard").removeChild(pot);

let combiDices;
function resetCombiDices() {
  const dicesCombi1 = new Dices421("d1-p1", "d2-p1", "d3-p1");
  dicesCombi1.setState("combi");
  const dicesCombi2 = new Dices421("d1-p2", "d2-p2", "d3-p2");
  dicesCombi2.setState("combi");
  combiDices = {
    1: dicesCombi1,
    2: dicesCombi2,
  };
}
// take players info in sessionStorage and create players
const player1Store = JSON.parse(window.sessionStorage.getItem("player1Info"));
const player2Store = JSON.parse(window.sessionStorage.getItem("player2Info"));
// take tokens canvas (board, player1, player2) and create object for each, draw token in board

const rollDicesScene = document.querySelectorAll("scene");
const cubes = document.querySelectorAll(".cube");
const originX = "50";
const originY = "50";
function hiddecube() {
  cubes.forEach((el) => {
    el.classList.add("is-spinning");
    el.hidden = true;
  });
}
hiddecube();
// cube.classList.add( 'is-backface-hidden');
rollDicesScene.forEach((el) => {
  console.log("unihgquiuqb");
  el.style.perspectiveOrigin = originX + "% " + originY + "%";
  el.style.perspective = "800px";
});
function insertTokenBoard(element) {
  arrTokensBoard.push(new Token(element.id, element, true));
}

function insertTokenPlayer(element, idPlayer) {
  element.hidden = idPlayer === 1 && arrTokensP1.push(new Token(element.id, element, false));
  idPlayer === 2 && arrTokensP2.push(new Token(element.id, element, false));
}
class Game421 {
  constructor() {
    this.player1 = new Player(1, player1Store.name, player1Store.avatarPath);
    this.player2 = new Player(2, player2Store.name, player2Store.avatarPath);
    this.tokensBoardObj;
    this.tokensP1Obj;
    this.tokensP2Obj;
    this.dices = new Dices421("d1-board", "d2-board", "d3-board");
    this.gameRound = "charge";
    this.powerTurn = 3;
    this.noshot = false;
    // this.checkNenette = this.checkNenette.bind(this);
  }
  start(restart) {
    if (restart) {
      this.dices.removeDices();
      Token.tokenInPot = 21;
      this.player1.reset();
      this.player2.reset();
      autoCharge.hidden = false;
      this.gameRound = "charge";
    }
    resetCombiDices();
    this.player1.insert();
    this.player2.insert();
    this.player1.state = "play";
    document.getElementById("player1").classList.add("playing");
    document.getElementById("player2").classList.remove("playing");
    pot = document
      .getElementById("gameboard")
      .insertBefore(pot, document.getElementById("dice-box-board"));
    arrTokensP2 = [];
    arrTokensP1 = [];
    arrTokensBoard = [];
    document.querySelectorAll(".token-board").forEach(insertTokenBoard);
    document.querySelectorAll(".token-p1").forEach((el) => insertTokenPlayer(el, 1));
    document.querySelectorAll(".token-p2").forEach((el) => insertTokenPlayer(el, 2));
    this.tokensBoardObj = arrTokensBoard;
    this.tokensP1Obj = arrTokensP1;
    this.tokensP2Obj = arrTokensP2;
    let score1 = window.sessionStorage.getItem("score1");
    let score2 = window.sessionStorage.getItem("score2");
    scoreBox.textContent = `Score:
  ${this.player1.name}: ${score1}
  ${this.player2.name}: ${score2}`;
    document.getElementById("game-round").textContent = "Charge";
    document.getElementById("validate-shot").hidden = true;
    // ROLL DICES
    autoCharge.onclick = () => {
      this.gameRound = "chargeAuto";
      while (Token.tokenInPot > 0) {
        this.roll();
      }
      autoCharge.hidden = true;
    };
    rollDicesBtn.onclick = (ev) => {
      if (this.noshot) return;
      this.roll();
    };
    btnRestart.onclick = () => this.start(true);
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
        dice.elementHtml.onclick = (ev) => dice.boardToAside(ev, this.getIsPlayingPlayer().id);
      }
    }
  }
  roll() {
    if (this.gameRound === "end") {
      return;
    }
    if (this.noshot /*&& this.gameRound !== "chargeAuto"*/) return;
    this.noshot = true;
    setTimeout(() => this.checkNenette(), 1600);
    /// cas spécial nenette 2 jetons en plus direct
    let withTimeout = this.gameRound === "chargeAuto" ? false : true;
    let resultDice = this.dices.rollDices(withTimeout);
    if (resultDice) {
      if (this.gameRound === "charge") {
        setTimeout(() => {
          this.chargeGameRound();
        }, 1500); // timeout pour ne pas avoir les jetons distribuer avant la fin du lancer
      } else if (this.gameRound === "chargeAuto") {
        // no timeout for automatique gameround else conflict with timeout in rollDices methode of dices class
        this.chargeGameRound();

        this.noshot = false;
      } else {
        let currentPlayer = this.getIsPlayingPlayer();
        currentPlayer.turn++;
        if (currentPlayer.turn === this.powerTurn) {
          setTimeout(() => {
            this.dechargeGameRound();
            this.noshot = false;
          }, 3500);
        } else {
          if (currentPlayer.turn === this.powerTurn - 1) {
            gameRoundElement.textContent = `Derniére chance pour ${currentPlayer.name}`;
          } else {
            gameRoundElement.textContent = `À ${currentPlayer.name} jet restant ${
              this.powerTurn - currentPlayer.turn
            }`;
          }
          setTimeout(() => (this.noshot = false), 3200);
          return;
        }
      }
    } else {
      this.noshot = false;
      return;
    }
  }
  chargeGameRound() {
    const currentPlayer = this.getIsPlayingPlayer();
    const waitingPlayer = this.getIsWaitingPlayer();
    const isChargeAuto = this.gameRound === "chargeAuto";
    const currentCombiDices = combiDices[currentPlayer.id];
    // this[`player${currentPlayer.id}`].combi = this.dices.getCombi();
    currentPlayer.combi = this.dices.getCombi();
    if (waitingPlayer.combi === "") {
      let dicesValCombi = String(currentPlayer.combi).split("");
      currentCombiDices.d1.val = Number(dicesValCombi[0]);
      currentCombiDices.d2.val = Number(dicesValCombi[1]);
      currentCombiDices.d3.val = Number(dicesValCombi[2]);
      if (isChargeAuto) {
        this.dices.removeDices();
        this.changeIsPlaying();
        this.noshot = false;
      } else {
        setTimeout((combiDices = currentCombiDices) => {
          this.dices.removeDices();
          combiDices.drawCombi();
          this.changeIsPlaying();
          this.noshot = false;
        }, 1500);
      }
      return;
    } else {
      let resultCompare = this.dices.compareCombi(currentPlayer.combi, waitingPlayer.combi);
      let arrTokensPlayerloser = this[`tokensP${resultCompare.loser}Obj`];
      let nbToken = resultCompare.power;
      if (resultCompare.loser === 0) {
        this.changeIsPlaying();
        messageBox.textContent = `Égalité à ${waitingPlayer.name} de jouer`;
      } else {
        resultCompare.loser === currentPlayer.id
          ? (currentPlayer.tokens += nbToken)
          : (waitingPlayer.tokens += nbToken);
        resultCompare.loser === currentPlayer.id && this.changeIsPlaying();
        const loserPlayer = this[`player${resultCompare.loser}`];
        if (Token.tokenInPot < nbToken) nbToken = Token.tokenInPot;
        loserPlayer.giveToken(nbToken, arrTokensPlayerloser, this.tokensBoardObj);
        Token.tokenInPot -= nbToken;
        if (Token.tokenInPot === 0) return this.startDecharge(resultCompare.loser);
        const endProcess = (idLoser = resultCompare.loser) => {
          this.dices.removeDices();
          combiDices[waitingPlayer.id].removeDicesCombi(`p${waitingPlayer.id}`);
          this.noshot = false;
          currentPlayer.id === idLoser && this.changeIsPlaying();
          currentPlayer.resetCombi();
          waitingPlayer.resetCombi();
        };
        if (isChargeAuto) {
          endProcess();
        } else {
          setTimeout(process, 1500);
        }
        return;
      }
    }
  }

  startDecharge(loser) {
    hiddecube();
    pot = document.getElementById("gameboard").removeChild(pot);
    combiDices[1].removeDicesCombi("p1");
    this.gameRound = "decharge";
    this.dices.removeDices();
    this.addEventOnDices();
    this.removeCombiPlayers();
    if (loser === 2) {
      // le gagnant du dernier coup commence
      this.changeIsPlaying();
    }
    let currentPlayer = this.getIsPlayingPlayer();
    gameRoundElement.textContent = "Decharge!"; //// voir pour anim
    messageBox.textContent = `À ${currentPlayer.name} de jouer`;

    /// TODO les messages de transition + anim transitions decharge

    // activation du bouton garder le coup
    validateShot.hidden = false;
    validateShot.onclick = () => {
      let currentCombi = this.dices.getCombi();
      if (currentCombi === 0) {
        return;
      }
      this.getIsPlayingPlayer().combi = currentCombi;
      this.dices.removeDices();
      isValidateEvent = true;
      this.dechargeGameRound();
    };
    this.noshot = false;
  }

  dechargeGameRound(
    currentPlayer = this.getIsPlayingPlayer(),
    waitingPlayer = this.getIsWaitingPlayer()
  ) {
    // par default on ne reset pas les combi des joueur et on change le joueur qui joue
    let withResetCombi = false;
    let withChangeIsPlaying = currentPlayer.id;
    if (currentPlayer.combi === "") {
      // si le coup est le dernier possible pour le joueur (combi non set)
      // alors on set sa combi et on relance le process avec la combi du joueur courant sauvegarder pour comparer
      currentPlayer.combi = this.dices.getCombi();
      this.dices.removeDices();
      this.dechargeGameRound();
      return;
    } else {
      if (isValidateEvent) {
        isValidateEvent = false;
        validateShot.onclick = () => {
          let currentCombi = this.dices.getCombi();
          if (currentCombi === 0) {
            return;
          }
          this.getIsPlayingPlayer().combi = currentCombi;
          this.dices.removeDices();
          isValidateEvent = true;
          this.dechargeGameRound();
        };
      }
      // si un seul joueur a jouer dans le tour on crée un message et affiche sa combi dans son camps via dechargeAttack()
      // sinon le process de comparaison se lance
      if (waitingPlayer.combi === "") {
        // console.log(combiDices[currentPlayer.id]);
        // combiDices[currentPlayer.id].drawCombi();
        console.log(combiDices[currentPlayer.id], "draw", currentPlayer);
        let dicesValCombi = String(currentPlayer.combi).split("");
        combiDices[currentPlayer.id].d1.val = Number(dicesValCombi[0]);
        combiDices[currentPlayer.id].d2.val = Number(dicesValCombi[1]);
        combiDices[currentPlayer.id].d3.val = Number(dicesValCombi[2]);
        combiDices[currentPlayer.id].drawCombi();

        this.dechargeAttack(currentPlayer, waitingPlayer);
      } else {
        // on compare les combinaisons
        let resultCompare = this.dices.compareCombi(this.player1.combi, this.player2.combi);
        let arrTokensPlayerloser =
          resultCompare.loser === 0 ? 0 : this[`tokensP${resultCompare.loser}Obj`];
        let arrTokensPlayerWinner = resultCompare.loser === 1 ? this.tokensP2Obj : this.tokensP1Obj;
        let nbToken = resultCompare.power;
        if (arrTokensPlayerloser === 0) {
          // si égalité juste remettre le turn des player a zéro
          //// TODO ici mettre logique message égalité
          this.changeIsPlaying();
          combiDices[waitingPlayer.id].removeDicesCombi(`p${waitingPlayer.id}`);
          console.log(arrTokensPlayerloser);
        } else {
          // sinon le gagnant donne les jetons en function de la force de sa combinaison a l'autre
          let loserPlayer = this[`player${resultCompare.loser}`];
          loserPlayer.giveToken(nbToken, arrTokensPlayerloser, arrTokensPlayerWinner);
          this.addRemovePlayerTokens(resultCompare.loser, nbToken);
          // le gagnant joue en premier le tour d'aprés
          if (loserPlayer.id !== currentPlayer.id) {
            withChangeIsPlaying = false;
            this.messageWhoPlay(currentPlayer, waitingPlayer, nbToken);
          } else {
            this.messageWhoPlay(waitingPlayer, currentPlayer, nbToken);
          }
          // on verifie si il y a un gagnant et appel gameEnd avec le bon paramétre
          let removePlayerId = `p${waitingPlayer.id}`;
          if (this.player1.tokens >= 21) {
            combiDices[waitingPlayer.id].removeDicesCombi(removePlayerId);
            return this.gameEnd(this.player2);
          }
          if (this.player1.tokens <= 0) {
            combiDices[waitingPlayer.id].removeDicesCombi(removePlayerId);
            return this.gameEnd(this.player1);
          }
          combiDices[waitingPlayer.id].removeDicesCombi(removePlayerId);
        }
        // aprés échange de jetons ou égalité
        // le powerTurn est remis a 3
        // les nb de tour des joueur également
        // et on reset les combi
        currentPlayer.turn = 0;
        waitingPlayer.turn = 0;
        this.powerTurn = 3;
        withResetCombi = true;
        gameRoundElement.textContent = `À ${waitingPlayer.name} de Jouer`;
        this.noshot = false;
      }
    }
    // prépare le prochain tour avec remise a zéro des combinaisons ou non
    // avec changement de joeur qui joue ou non, et les dés sont remis dans le board
    this.resetTurn(withResetCombi, withChangeIsPlaying);
    return;
  }
  messageWhoPlay(winner, loser, nbToken) {
    messageBox.textContent = `${winner.name} gagne et donne ${nbToken} jetons à ${loser.name}.
            ${winner.name} rejoue.`;
  }
  dechargeAttack(currentPlayer, waitingPlayer) {
    this.powerTurn = currentPlayer.turn;
    messageBox.textContent = `Il doit faire mieux que ${
      messageCombi[currentPlayer.combi] ?? currentPlayer.combi
    } en ${this.powerTurn}.`;
    currentPlayer.turn = 0;
    gameRoundElement.textContent = `À ${waitingPlayer.name} de jouer!!!`;
  }
  resetTurn(withCombiPlayer, withChangeIsPlaying) {
    withCombiPlayer && this.removeCombiPlayers();
    withChangeIsPlaying && this.changeIsPlaying();
    this.dices.removeDices();
    this.addEventOnDices();
  }
  gameEnd(winnerPlayer) {
    gameRoundElement.textContent = `${winnerPlayer.name} gagne la partie!!!. \u{1F3C6} `;
    messageBox.textContent = "";
    this.gameRound = "end";
    let scoreOld = Number(window.sessionStorage.getItem(`score${winnerPlayer.id}`));
    console.log(scoreOld, window.sessionStorage.getItem(`score${winnerPlayer.id}`));
    window.sessionStorage.removeItem(`score${winnerPlayer.id}`);
    window.sessionStorage.setItem(`score${winnerPlayer.id}`, scoreOld + 1);
    console.log(scoreOld, window.sessionStorage.getItem(`score${winnerPlayer.id}`));
  }
  addRemovePlayerTokens(loser, nbToken, board = false) {
    /// TODO voir ici avec le board
    if (board) {
      if (loser === 1) {
        this.player1.tokens += nbToken;
      } else {
        this.player2.tokens += nbToken;
      }
    } else {
      if (loser === 1) {
        this.player1.tokens += nbToken;
        this.player2.tokens -= nbToken;
      } else {
        this.player1.tokens -= nbToken;
        this.player2.tokens += nbToken;
      }
    }
  }
  removeCombiPlayers() {
    this.player1.combi = "";
    this.player2.combi = "";
  }
  changeIsPlaying() {
    if (this.player2.state === "play") {
      this.player2.state = "wait";
      this.player1.state = "play";
      document.getElementById("player1").classList.add("playing");
      document.getElementById("player2").classList.remove("playing");
    } else {
      this.player2.state = "play";
      this.player1.state = "wait";
      document.getElementById("player2").classList.add("playing");
      document.getElementById("player1").classList.remove("playing");
    }
  }
  checkNenette() {
    console.log(this.player1.tokens, this.player2.tokens, "start nenette");
    if (this.dices.getCombi() === 221) {
      let loserPlayer = this.getIsPlayingPlayer();
      let arrTokensPlayerloser = this[`tokensP${loserPlayer.id}Obj`];
      let arrTokensPlayerWinner;
      let nbToken = 2;
      if (this.gameRound === "charge") {
        setTimeout(() => {
          arrTokensPlayerWinner = this.tokensBoardObj;
          console.log(this.tokensBoardObj);
          loserPlayer.giveToken(nbToken, arrTokensPlayerloser, arrTokensBoard);
          this.addRemovePlayerTokens(loserPlayer.id, nbToken, true);
          Token.tokenInPot -= nbToken;
          if (Token.tokenInPot <= 0) return this.startDecharge(loserPlayer.id);
        }, 1500);
      } else if (this.gameRound === "chargeAuto") {
        arrTokensPlayerWinner = this.tokensBoardObj;
        console.log(this.tokensBoardObj);
        loserPlayer.giveToken(nbToken, arrTokensPlayerloser, arrTokensPlayerWinner);
        this.addRemovePlayerTokens(loserPlayer.id, nbToken, true);
        Token.tokenInPot -= nbToken;
        if (Token.tokenInPot <= 0) return this.startDecharge(loserPlayer.id);
      } else {
        setTimeout(() => {
          arrTokensPlayerWinner = loserPlayer.id === 1 ? this.tokensP2Obj : this.tokensP1Obj;
          loserPlayer.giveToken(nbToken, arrTokensPlayerloser, arrTokensPlayerWinner);
          this.addRemovePlayerTokens(loserPlayer.id, nbToken);
          // on verifie si il y a un gagnant et appel gameEnd avec le bon paramétre
          let winnerPlayer = this.getIsWaitingPlayer();
          let removePlayerId = `p${winnerPlayer.id}`;
          if (this.player1.tokens >= 21) {
            combiDices[winnerPlayer.id].removeDicesCombi(removePlayerId);
            this.gameEnd(this.player2);
          }
          if (this.player1.tokens <= 0) {
            combiDices[winnerPlayer.id].removeDicesCombi(removePlayerId);
            this.gameEnd(this.player1);
          }
          console.log(this.player1.tokens, this.player2.tokens, "end nenette");
        }, 1500);

        return true;
      }
    }
    // console.log(this.player1.tokens, this.player2.tokens, "end no nenette");

    return false;
  }
}

export { Game421 };
