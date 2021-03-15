/*

 Author: lotiko 
 Date creation:  03/2021

 Dices class
*/
import { draw, remove } from "./utils/diceCanvas.js";
const diceVals = [1, 2, 3, 4, 5, 6];
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
  }

  rollDices() {
    for (const diceKey in this) {
      if (Object.hasOwnProperty.call(this, diceKey)) {
        const currentDice = this[diceKey];
        if (currentDice.state === "board") {
          currentDice.setRandomDiceValue();
          draw(currentDice);
        }
      }
    }
  }
  drawDices() {
    draw(this.d1);
    draw(this.d2);
    draw(this.d3);
  }
}

export { Dice, Dices421 };
