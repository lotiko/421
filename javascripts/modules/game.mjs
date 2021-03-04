/**
 *
 * @author: lotiko
 * @date:  03/2021
 *
 * @summary: all process of 421 game
 */
import { Player } from "../player.js";
//////// CONST and LET
// take players info in sessionStorage and create players
const player1Store = JSON.parse(window.sessionStorage.getItem("player1Info"));
const player2Store = JSON.parse(window.sessionStorage.getItem("player2Info"));
const playersObj = {
  1: new Player(1, player1Store.name, player1Store.avatarPath),
  2: new Player(2, player2Store.name, player2Store.avatarPath),
};
const playersElements = {
  player1: playersObj[1].getDocumentElements(),
  player2: playersObj[2].getDocumentElements(),
};
const messageBox = document.getElementById("dialog-box");

/////////// FUNCTION

function insertPlayers() {
  for (const playerEl in playersElements) {
    if (Object.hasOwnProperty.call(playersElements, playerEl)) {
      const element = playersElements[playerEl];
      let currentPlayer = playersObj[element.id];
      element.title.textContent = currentPlayer.name;
      element.name.textContent = currentPlayer.name;
      element.avatar.setAttribute("src", currentPlayer.avatar);
    }
  }
}
///////// PROCESS
insertPlayers();
console.log(playersObj, playersElements);
