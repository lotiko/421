/*

 Author: lotiko 
 Date creation:  03/2021

    player class
*/

class Player {
  constructor(id, name, avatarPath) {
    this.name = name;
    this.avatar = avatarPath;
    this.id = id;
    this.tokens = 0;
    this.state = "wait";
    this.elements = {
      title: document.getElementById(`title${id}`),
      name: document.getElementById(`name${id}`),
      avatar: document.getElementById(`avatar${id}`),
      boxToken: document.getElementById(`box-token${id}`),
    };
  }
  isPlaying() {
    this.state = "play";
  }
  keepDice() {}
  keepCombinaison() {}
}

export { Player };
