/*

 Author: lotiko 
 Date creation:  03/2021

    player class
*/
const turnValues = { wait: -1, play: 0, see: 1 };
class Player {
  constructor(id) {
    this.name = "";
    this.avatar = "";
    this.id = id;
    this.tokens = 0;
    this.turn = turnValues.wait;
  }
  setPlayer(name, avatar) {
    this.name = name;
    this.avatar = avatar;
  }
  isPlaying() {}
  keepDice() {}
  keepCombinaison() {}
}

export { Player };
