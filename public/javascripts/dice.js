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
    this.objCombi = {
      p1: {
        combi: "",
        power: 0,
      },
      p2: {
        combi: "",
        power: 0,
      },
    };
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
          currentDice.setRandomDiceValue();
          setTimeout(() => {
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
  setCombi(nbPlayer) {
    this.objCombi[nbPlayer].combi = [this.d1.val, this.d2.val, this.d3.val]
      .sort((a, b) => a - b)
      .join("");
    if (conboCombis.includes(this.objCombi[nbPlayer].combi)) {
      this.objCombi[nbPlayer].power = powerByComboCombi[this.objCombi[nbPlayer].combi];
    } else {
      this.objCombi[nbPlayer].power = 1;
    }
  }
  // getCombi() {
  //   return this.objCombi;
  // }
  compareCombi() {
    if (this.objCombi.p1.power > this.objCombi.p2.power) return 1;
    else if (this.objCombi.p1.power < this.objCombi.p2.power) return 2;
    else {
      if (this.objCombi.p1.power !== 1) return "draw";
      else {
        let basicPowerP1 = Number([...this.objCombi.p1.combi].reverse().join(""));
        let basicPowerP2 = Number([...this.objCombi.p2.combi].reverse().join(""));
        if (basicPowerP1 > basicPowerP2) return 1;
        else if (basicPowerP1 < basicPowerP2) return 2;
        else {
          return "draw";
        }
      }
    }
  }
}

export { Dice, Dices421 };
