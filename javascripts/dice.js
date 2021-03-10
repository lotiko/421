/*

 Author: lotiko 
 Date creation:  03/2021

 Dice class
*/

const diceVals = [1, 2, 3, 4, 5, 6];
class Dice {
  constructor(htmlId) {
    this.val = 1;
    this.state = "board";
    this.elementHtml = document.getElementById(htmlId);
  }
  setRandomDiceValue() {
    this.val = diceVals[Math.floor(Math.random() * diceVals.length)];
  }
  launched() {}
  onBoard() {}
  boardToAside() {
    this.state = "aside";
  }
  asideToBoard() {
    this.state = "board";
  }
}

export { Dice };
