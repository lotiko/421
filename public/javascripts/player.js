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
    this.turn = 0;
    this.combinaison = [];
    this.elements = {
      title: document.getElementById(`title${id}`),
      name: document.getElementById(`name${id}`),
      avatar: document.getElementById(`avatar${id}`),
      boxToken: document.getElementById(`box-token${id}`), /// voir si inutile
    };
  }
  play() {
    this.state = "play";
  }
  winToken(nbToken, arrTokensPlayer) {
    this.tokens += nbToken;
    let i = 0;
    console.log(nbToken);
    for (const token of arrTokensPlayer) {
      if (token.value === 1) {
        continue;
      } else {
        token.draw();
        i++;
      }
      if (i === nbToken) break;
    }
  }
  keepDice() {}
  keepCombinaison() {}
}

export { Player };
