/*

 Author: lotiko 
 Date creation:  03/2021

    player class
*/

/**
 * Object that's represent a player in game
 *
 * @class Player
 */
class Player {
  /**
   *Creates an instance of Player.
   * @param {number} id
   * @param {string} name
   * @param {string} avatarPath
   * @memberof Player
   */
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
      boxToken: document.getElementById(`box-token${id}`),
    };
  }
  /**
   * reset a player with default value
   *
   * @memberof Player
   */
  reset() {
    this.tokens = 0;
    this.state = "wait";
    this.turn = 0;
    this.combi = "";
    this.elements = {
      title: document.getElementById(`title${this.id}`),
      name: document.getElementById(`name${this.id}`),
      avatar: document.getElementById(`avatar${this.id}`),
      boxToken: document.getElementById(`box-token${this.id}`),
    };
  }
  /**
   * reset combi of player
   *
   * @memberof Player
   */
  resetCombi() {
    this.combi = "";
  }
  /**
   * insert a player in the view (title, name and avatar)
   *
   * @memberof Player
   */
  insert() {
    this.elements.title.textContent = this.name;
    this.elements.name.textContent = this.name;
    this.elements.avatar.setAttribute("src", this.avatar);
  }
  /**
   * set player to state play
   *
   * @memberof Player
   */
  play() {
    this.state = "play";
  }
  /**
   * set player to state wait
   *
   * @memberof Player
   */
  wait() {
    this.state = "wait";
  }
  /**
   * Process of token exchange with number of token and elements toInsert and element to keep them
   *
   * @param {number} nbToken
   * @param {object[]} arrTokensPlayer
   * @param {object[]} arrTokenWhereKeep
   * @memberof Player
   */
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
    // console.log(arrTokenWhereKeep);
    // console.log(direction);
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
}

export { Player };
