/*

 Author: lotiko 
 Date creation:  03/2021

 Dices class
*/
import { draw, remove } from "./utils/diceCanvas.js";
const diceVals = [1, 2, 3, 4, 5, 6];
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
  122: -2,
};
const conboCombis = Object.keys(powerByComboCombi);

class Dice {
  constructor(htmlId) {
    this.id = htmlId.split("-")[0];
    this.val = 0;
    this.state = "board";
    this.elementHtml = document.getElementById(htmlId);
  }
  setRandomDiceValue() {
    this.val = diceVals[Math.floor(Math.random() * diceVals.length)];
  }
  boardToAside(ev, playerId) {
    this.state = "to-p" + playerId;
    remove(this.elementHtml);
    this.elementHtml = document.getElementById(`${this.id}-p${playerId}`);
    draw(this.elementHtml, this.val);
    this.elementHtml.addEventListener("click", (ev) => this.asideToBoard(ev, playerId));
  }
  asideToBoard(ev, playerId) {
    this.state = "board";
    remove(this.elementHtml);
    this.elementHtml = document.getElementById(`${this.id}-board`);
    draw(this.elementHtml, this.val);
    this.elementHtml.addEventListener("click", (ev) => this.boardToAside(ev, playerId));
  }
}

class Dices421 {
  constructor(htmlId1, htmlId2, htmlId3) {
    this.d1 = new Dice(htmlId1);
    this.d2 = new Dice(htmlId2);
    this.d3 = new Dice(htmlId3);
  }

  rollDices(timeout) {
    let diceHaveRoll = false;
    let int = 0;
    for (const diceKey in this) {
      // console.log(this);
      if (Object.hasOwnProperty.call(this, diceKey)) {
        const currentDice = this[diceKey];
        console.log(currentDice);
        if (currentDice.state === "board") {
          remove(currentDice);
          diceHaveRoll = true;
          currentDice.setRandomDiceValue();
          console.log(currentDice.state);
          if (timeout) {
            setTimeout(() => {
              draw(currentDice.elementHtml, currentDice.val);
            }, int);
            int += 500;
          } else {
            draw(currentDice.elementHtml, currentDice.val);
          }
        } else {
          continue;
        }
      }
    }
    return diceHaveRoll;
  }
  removeDices() {
    remove(this.d1.elementHtml);
    this.d1.val = 0;
    this.d1.state = "board";
    this.d1.elementHtml = document.getElementById("d1-board");
    remove(this.d2.elementHtml);
    this.d2.val = 0;
    this.d2.state = "board";
    this.d2.elementHtml = document.getElementById("d2-board");
    remove(this.d3.elementHtml);
    this.d3.val = 0;
    this.d3.state = "board";
    this.d3.elementHtml = document.getElementById("d3-board");
  }
  getPowerCombi(combi) {
    if (conboCombis.includes(combi)) {
      return powerByComboCombi[combi];
    }
    return 1;
  }
  getPowerCombiBasic(combi) {
    return Number([...combi].reverse().join(""));
  }
  getCombi() {
    let combi = [this.d1.val, this.d2.val, this.d3.val].sort((a, b) => a - b).join("");
    if (conboCombis.includes(combi)) {
      return combi;
    }
    return this.getPowerCombiBasic(combi);
  }
  compareCombi(combi1, combi2) {
    let powerCombi1 = this.getPowerCombi(combi1);
    let powerCombi2 = this.getPowerCombi(combi2);
    //// voir ici logique nenette
    if (powerCombi1 > powerCombi2) return { loser: 2, power: Math.floor(powerCombi1) };
    // on arrondi pour enlever les décimals
    else if (powerCombi1 < powerCombi2) return { loser: 1, power: Math.floor(powerCombi2) };
    else {
      if (powerCombi1 !== 1) return { loser: 0, power: 0 };
      else {
        if (combi1 > combi2) return { loser: 2, power: 1 };
        else if (combi1 < combi2) return { loser: 1, power: 1 };
        else {
          return { loser: 0, power: 0 };
        }
      }
    }
  }
}

export { Dice, Dices421 };
