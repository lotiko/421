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
    this.winningGame = 0;
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
    let direction = "";
    if (arrTokenWhereKeep[0].element.classList.contains("token-board")) {
      console.log("rien");
    } else {
      if (arrTokenWhereKeep[0].element.classList.contains("token-p1")) {
        direction = "right";
      } else {
        direction = "left";
      }
    }
    console.log(arrTokenWhereKeep);
    console.log(direction);
    for (const tokenOut of arrTokenWhereKeep) {
      // remove token du pot ou de l'adversaire en fonction du paramétre de la function
      if (tokenOut.value === 0) {
        continue;
      } else {
        tokenOut.element.classList.add(`tokento${direction}`);
        setTimeout(() => {
          tokenOut.removeIt();
          tokenOut.element.classList.remove(`tokento${direction}`);
        }, 1000);
        i++;
      }
      if (i === nbToken) break;
    }
    i = 0;
    setTimeout(() => {
      for (const tokenIn of arrTokensPlayer) {
        // insert token chez le perdant
        if (tokenIn.value === 1) {
          continue;
        } else {
          tokenIn.drawIt();
          i++;
        }
        if (i === nbToken) break;
      }
    }, 1000);
  }
  keepCombinaison() {}
}

export { Player };
