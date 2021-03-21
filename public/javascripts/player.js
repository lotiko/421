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
    this.combi = "";
    this.elements = {
      title: document.getElementById(`title${id}`),
      name: document.getElementById(`name${id}`),
      avatar: document.getElementById(`avatar${id}`),
      boxToken: document.getElementById(`box-token${id}`), /// voir si inutile
    };
  }
  insert() {
    this.elements.title.textContent = this.name;
    this.elements.name.textContent = this.name;
    this.elements.avatar.setAttribute("src", this.avatar);
  }
  keepDice(ev, dice) {
    const playingPlayer = whoIsPlaying();
    dice.boardToAside(playingPlayer.id);
    dice.elementHtml.addEventListener("click", (ev) => diceToBoard(ev, dice), { once: true });
  }
  play() {
    this.state = "play";
  }
  giveToken(nbToken, arrTokensPlayer, arrTokenWhereKeep) {
    let i = 0;
    for (const tokenIn of arrTokensPlayer) {
      // insert token chez le gagnant
      if (tokenIn.value === 1) {
        continue;
      } else {
        tokenIn.drawIt();
        i++;
      }
      if (i === nbToken) break;
    }
    i = 0;
    for (const tokenOut of arrTokenWhereKeep) {
      // remove token du pot ou de l'adversaire
      if (tokenOut.value === 0) {
        continue;
      } else {
        tokenOut.removeIt();
        i++;
      }
      if (i === nbToken) break;
    }
  }
  keepCombinaison() {}
}

export { Player };
