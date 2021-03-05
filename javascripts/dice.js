/*

 Author: lotiko 
 Date creation:  03/2021

 Dice class
*/

const diceVals = [1, 2, 3, 4, 5, 6];
class Dice {
  constructor() {
    this.val = 0;
    this.state = "jar";
  }
  setRandomDiceValue() {
    this.val = diceVals[Math.floor(Math.random() * diceVals.length)];
  }
  launched() {}
  onBoard() {}
  boardToAside() {}
  asideToBoard() {}
}

class Dices {
  constructor(nbDices) {
    this.dicesObj = {};
    let i = 0;
    while (i < nbDices) {
      this.dicesObj[i] = new Dice();
      i++;
    }
  }
}
export { Dice };
