/*

 Author: lotiko 
 Date creation:  03/2021

    player class
*/
const turnValues = { wait: -1, play: 0, see: 1 };
class Player {
  constructor(id, name, avatarPath) {
    this.name = name;
    this.avatar = avatarPath;
    this.id = id;
    this.tokens = 0;
    this.turn = turnValues.wait;
    this.elements = {
      title: document.getElementById(`title${id}`),
      name: document.getElementById(`name${id}`),
      avatar: document.getElementById(`avatar${id}`),
      boxToken: document.getElementById(`box-token${id}`),
    };
  }
  setPlayer(name, avatar) {
    this.name = name;
    this.avatar = avatar;
  }
  // getDocumentElements() {
  //   return {
  //     id: this.id,
  //     title: document.getElementById(`title${this.id}`),
  //     name: document.getElementById(`name${this.id}`),
  //     avatar: document.getElementById(`avatar${this.id}`),
  //     boxToken: document.getElementById(`box-token${this.id}`),
  //   };
  // }
  isPlaying() {}
  keepDice() {}
  keepCombinaison() {}
}

export { Player };
