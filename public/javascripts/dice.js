/*

 Author: lotiko 
 Date creation:  03/2021

 Dices class
*/
import { draw, remove } from "./utils/diceCanvas.js";
const diceVals = [1, 2, 3, 4, 5, 6];
const powerByComboCombi = {
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
  122: -2,
};
const conboCombis = powerByComboCombi.keys();

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
  boardToAside(playerNb) {
    this.state = "to-p" + playerNb;
    remove(this);
    this.elementHtml = document.getElementById(`${this.id}-p${playerNb}`);
    draw(this);
  }
  asideToBoard() {
    this.state = "board";
    remove(this);
    this.elementHtml = document.getElementById(`${this.id}-board`);
    draw(this);
  }
}

class Dices421 {
  constructor(htmlId1, htmlId2, htmlId3) {
    this.d1 = new Dice(htmlId1);
    this.d2 = new Dice(htmlId2);
    this.d3 = new Dice(htmlId3);
    this.combi = "";
    this.powerCombi = 0;
    this.isComboCombi = false;
  }

  rollDices() {
    let diceHaveRoll = 0;
    let int = 0;
    for (const diceKey in this) {
      if (Object.hasOwnProperty.call(this, diceKey)) {
        const currentDice = this[diceKey];
        if (currentDice.state === "board") {
          remove(currentDice);
          diceHaveRoll++;
          setTimeout(() => {
            currentDice.setRandomDiceValue();
            draw(currentDice);
          }, int);
          int += 500;
        }
      }
    }
    return diceHaveRoll;
  }
  drawDices() {
    draw(this.d1);
    draw(this.d2);
    draw(this.d3);
  }
  setCombi() {
    this.combi = [this.d1.val, this.d2.val, this.d3.val].sort((a, b) => a - b).join("");
    if (conboCombis.includes(this.combi)) {
      this.powerCombi = powerByComboCombi[this.combi];
      this.isComboCombi = true;
    } else {
      this.powerCombi = 1;
      this.isComboCombi = false;
    }
  }
}

export { Dice, Dices421 };
