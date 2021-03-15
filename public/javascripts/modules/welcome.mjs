/**
 *
 * @author: lotiko
 * @date:  03/2021
 *
 * @summary: all process for the welcome page
 */

import { Player } from "../player.js";

//////// CONST  and LET for process
const text = document.getElementById("text");
const playerText = document.getElementById("player-text");
const validButton = document.getElementById("start");
const startBtn = document.getElementById("start");
const name = document.getElementById("name");
const avatar_player = document.getElementById("avatar-player");
const avatars = document.getElementsByClassName("avatar-item");
const players = { player1: new Player(1), player2: new Player(2) };
const storage = window.sessionStorage;
let i = 0;

///////////// FUNCTION
/**
 *  check if values to set player is correct then store in sessionstorage
 * @param {string} name
 * @param {string} avatar
 * @param {number} nbPlayer
 */
function checkValidePlayer(name, avatar, nbPlayer) {
  if (name === "" || name.length > 8) {
    alert("Le nom du joueur doit contenir entre 1 et 8 lettres");
    return false;
  }
  if (avatar.children.length === 0) {
    alert("Veuilez choisir un avatar en cliquant sur un des differants choix");
    return false;
  }
  let player = { name: name, avatarPath: avatar.firstChild.getAttribute("src") };
  storage.setItem(`player${nbPlayer}Info`, JSON.stringify(player));
  return true;
}
/**
 * change the view from choose player 1 to choose player 2
 *
 */
function changeViewSetPlayer() {
  let sliceOldText = text.firstChild.textContent.trim().slice(0, -1);
  text.textContent = sliceOldText + "2";
  sliceOldText = playerText.firstChild.textContent.slice(0, -1);
  playerText.firstChild.textContent = sliceOldText + "2";
  validButton.textContent = "start";
}
/**
 * insert in the player box the avatar that the user has clicked on
 * @param {object} ev
 */
function insertInAvatarPlayer(ev) {
  console.log(this);
  let avatar = ev.srcElement.cloneNode();
  if (avatar_player.children.length > 0) {
    avatar_player.removeChild(avatar_player.firstChild);
  }
  avatar_player.append(avatar);
}

///////////////////// EVENTS

// Add  inserInAvatarPlayer() by click event on all avatar-item
i = 0;
while (i < 8) {
  avatars[i].addEventListener("click", insertInAvatarPlayer);
  i++;
}

// #start on click check currentPlayer value and launch good process
startBtn.addEventListener("click", function (event) {
  if (startBtn.textContent === "Valider joueur 1") {
    if (checkValidePlayer(name.value, avatar_player, 1)) {
      changeViewSetPlayer();
      avatar_player.removeChild(avatar_player.firstChild);
      name.value = "";
    }
  } else {
    if (checkValidePlayer(name.value, avatar_player, 2)) {
      window.location = "game.html";
    }
  }
});
