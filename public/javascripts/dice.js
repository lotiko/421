/*

 Author: lotiko 
 Date creation:  03/2021

 Dices class
*/
import { draw, remove } from "./utils/diceCanvas.js";

const diceVals = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];
// const diceVals = [2, 1];
const powerByComboCombi = {
  124: 10,
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
};
const massageCombi = {
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
const conboCombis = Object.keys(powerByComboCombi);
const dicesSound = {
  shot: new Audio("../audio/gobelet.mp3"),
  roll3: new Audio("../audio/roll3Dice.mp3"),
  roll2: new Audio("../audio/roll2dices.mp3"),
  roll1: new Audio("../audio/roll1Dice.mp3"),
};
/**
 * Objet to create dice in the game
 *
 * @class Dice
 */

class Dice {
  /**
   *Creates an instance of Dice.
   * @param {string} htmlId
   * @memberof Dice
   */
  constructor(htmlId) {
    this.id = htmlId.split("-")[0];
    this.val = 0;
    this.state = "board";
    this.elementHtml = document.getElementById(htmlId);
  }
  /**
   * Set a random value for the current dice
   *
   * @memberof Dice
   */
  setRandomDiceValue() {
    this.val = diceVals[Math.floor(Math.random() * diceVals.length)];
  }

  /**
   * Move a dice from gameboard to player-dice-box
   *
   * @param {object} ev
   * @param {string} playerId
   * @memberof Dice
   */
  boardToAside(ev, playerId) {
    if (ev.target.val === 0) {
      ev.target.onclick = (newEv) => this.boardToAside(newEv, playerId);
    }
    let direction = playerId === 1 ? "left" : "right";
    let diceId = ev.target.id.split("-")[0];
    this.elementHtml.classList.add(`dice-${diceId}-${direction}`);
    setTimeout(() => {
      this.state = "to-p" + playerId;
      remove(this.elementHtml);
      this.elementHtml.classList.remove(`dice-${diceId}-${direction}`);
      this.elementHtml = document.getElementById(`${this.id}-p${playerId}`);
      draw(this.elementHtml, this.val);
      this.elementHtml.onclick = (ev) => this.asideToBoard(ev, playerId);
    }, 500);
  }

  /**
   * Move a dice from  player-dice-box to gameboard
   * @param {object} ev
   * @param {string} playerId
   */
  asideToBoard(ev, playerId) {
    if (ev.target.val === 0) {
      ev.target.onclick = (newEv) => this.asideToBoard(newEv, playerId);
    }
    this.state = "board";
    remove(this.elementHtml);
    this.elementHtml = document.getElementById(`${this.id}-board`);
    draw(this.elementHtml, this.val);
    this.elementHtml.onclick = (ev) => this.boardToAside(ev, playerId);
  }
  /**
   *  draw dice with diceCanvas.js function in current element with current value
   *
   * @memberof Dice
   */
  drawDice() {
    draw(this.elementHtml, this.val);
  }
}
/**
 * Object of three dices object
 *
 * @class Dices421
 */
class Dices421 {
  /**
   *Creates an instance of Dices421.
   * @param {string} htmlId1
   * @param {string} htmlId2
   * @param {string} htmlId3
   * @memberof Dices421
   */
  constructor(htmlId1, htmlId2, htmlId3) {
    this.d1 = new Dice(htmlId1);
    this.d2 = new Dice(htmlId2);
    this.d3 = new Dice(htmlId3);
  }
  /**
   * Process for roll dice event with or not timeout
   *
   * @param {boolean} timeout
   * @returns {boolean}
   * @memberof Dices421
   */
  async rollDices(timeout) {
    let diceHaveRoll = false;
    let int = 0;
    let arrDicesToRoll = [];

    for (const diceKey in this) {
      // console.log(this);
      if (Object.hasOwnProperty.call(this, diceKey)) {
        const currentDice = this[diceKey];
        // console.log(currentDice);
        if (currentDice.state === "board") {
          this.removeDice(currentDice.id);
          diceHaveRoll = true;
          let cube = document.getElementById(`cube-${currentDice.id}`);
          cube.hidden = false;
          currentDice.setRandomDiceValue();
          arrDicesToRoll.push(currentDice);
          // console.log(currentDice.state);
        } else {
          continue;
        }
      }
      if (timeout && arrDicesToRoll.length > 0) {
        try {
          await dicesSound.shot.play();
          dicesSound.shot.onended = () => {
            dicesSound[`roll${arrDicesToRoll.length}`].play();
            arrDicesToRoll.forEach((el) => {
              setTimeout(() => {
                draw(el.elementHtml, el.val);
                let cube = document.getElementById(`cube-${el.id}`);
                cube.hidden = true;
              }, int);
              int += 450;
            });
          };
        } catch (error) {
          arrDicesToRoll.forEach((el) => {
            setTimeout(() => {
              draw(el.elementHtml, el.val);
              let cube = document.getElementById(`cube-${el.id}`);
              cube.hidden = true;
            }, int);
            int += 450;
          });
        }
      } else {
        arrDicesToRoll.forEach((el) => draw(el.elementHtml, el.val));
      }
    }
    // callbackNenette();
    return diceHaveRoll;
  }
  /**
   * remove one dice of the view and reset value
   * method for gameboard dices
   *
   * @param {*} id
   * @memberof Dices421
   */
  removeDice(id) {
    remove(this[id].elementHtml);
    this[id].val = 0;
    this[id].state = "board";
    this[id].elementHtml = document.getElementById(`${id}-board`);
  }
  /**
   * call removeDice for all dice in object
   * method for gameboard dices
   *
   * @memberof Dices421
   */
  removeDices() {
    this.removeDice("d1");
    this.removeDice("d2");
    this.removeDice("d3");
  }

  /**
   * remove one dice of the view and reset value
   * method for playerCombi dices
   *
   * @param {string} id
   * @param {string} playerHtmlId
   * @memberof Dices421
   */
  removeDiceCombi(id, playerHtmlId) {
    remove(this[id].elementHtml);
    this[id].val = 0;
    this[id].state = "combi";
    this[id].elementHtml = document.getElementById(`${id}-${playerHtmlId}`);
  }
  /**
   * call removeDice for all dice in object
   * method for playerCombi dices
   *
   * @param {string} player
   * @memberof Dices421
   */
  removeDicesCombi(player) {
    this.removeDiceCombi("d1", player);
    this.removeDiceCombi("d2", player);
    this.removeDiceCombi("d3", player);
  }
  /**
   * set state of all dices with parameter
   *
   * @param {string} state
   * @memberof Dices421
   */
  setState(state) {
    this.d1.state = state;
    this.d2.state = state;
    this.d3.state = state;
  }
  /**
   * call drawDice of Dice class for each Dices421
   *
   * @memberof Dices421
   */
  drawCombi() {
    this.d1.drawDice();
    this.d2.drawDice();
    this.d3.drawDice();
  }
  /**
   * return the power of combinaison in parameter
   *
   * @param {number} combi
   * @returns {number}
   * @memberof Dices421
   */
  getPowerCombi(combi) {
    if (conboCombis.includes(combi)) {
      return powerByComboCombi[combi];
    }
    return 1;
  }
  /**
   * Return basic combi all digits in descending order
   *
   * @param {number} combi
   * @returns {number}
   * @memberof Dices421
   */
  getPowerCombiBasic(combi) {
    return Number([...combi].reverse().join(""));
  }
  /**
   * Return combi all digits in descending order if basic combi else ascending order for
   * comboCombis
   *
   * @returns
   * @memberof Dices421
   */
  getCombi() {
    let combi = [this.d1.val, this.d2.val, this.d3.val].sort((a, b) => a - b).join("");
    if (conboCombis.includes(combi)) {
      return combi;
    }
    return this.getPowerCombiBasic(combi);
  }
  /**
   * compare 2 combianison of 2 player and return object
   * with winner loser and power of winning combinaison
   *
   * @param {object} playPlayer
   * @param {object} waitPlayer
   * @returns {object}
   * @memberof Dices421
   */
  compareCombi(playPlayer, waitPlayer) {
    let powerCombi1 = this.getPowerCombi(playPlayer.combi);
    let powerCombi2 = this.getPowerCombi(waitPlayer.combi);
    //// voir ici logique nenette
    if (powerCombi1 > powerCombi2)
      return { winner: playPlayer.id, loser: waitPlayer.id, power: Math.floor(powerCombi1) };
    // on arrondi pour enlever les décimals
    else if (powerCombi1 < powerCombi2)
      return { winner: waitPlayer.id, loser: playPlayer.id, power: Math.floor(powerCombi2) };
    else {
      if (powerCombi1 !== 1) return { loser: 0, power: 0 };
      else {
        if (playPlayer.combi > waitPlayer.combi)
          return { winner: playPlayer.id, loser: waitPlayer.id, power: 1 };
        else if (playPlayer.combi < waitPlayer.combi)
          return { winner: waitPlayer.id, loser: playPlayer.id, power: 1 };
        else {
          return { loser: 0, power: 0 };
        }
      }
    }
  }
}

export { Dice, Dices421 };
